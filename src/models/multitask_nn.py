"""
Multi-task neural network for sports recommendation.

Architecture:
  Shared backbone (FC layers) → three task-specific heads:
    - Head 1: Play recommendation  (sigmoid, multi-label BCE)
    - Head 2: Watch recommendation (sigmoid, multi-label BCE)
    - Head 3: Pro potential        (sigmoid, multi-label BCE on binarised ordinal)

Loss:
  L_total = λ1·BCE_play + λ2·BCE_watch + λ3·BCE_pro + λ_reg·||θ||²

Usage:
    from src.models.multitask_nn import MultiTaskSportsNet, Trainer
    model = MultiTaskSportsNet(input_dim=34, n_sports=20)
    trainer = Trainer(model)
    trainer.fit(X_train, y_play_train, y_watch_train, y_pro_train)
    scores_play = trainer.predict_scores(X_test, task='play')
"""

from __future__ import annotations

import os
from typing import Dict, Tuple

import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset


DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
RANDOM_STATE = 42


class MultiTaskSportsNet(nn.Module):
    """
    Shared-representation multi-task network.

    Parameters
    ----------
    input_dim    : number of input features
    n_sports     : number of sports (output size per head)
    hidden_dims  : sizes of shared hidden layers
    dropout      : dropout probability applied in shared layers
    """

    def __init__(
        self,
        input_dim: int,
        n_sports: int,
        hidden_dims: Tuple[int, ...] = (256, 128, 64),
        dropout: float = 0.3,
    ) -> None:
        super().__init__()
        self.input_dim = input_dim
        self.n_sports = n_sports

        # Shared backbone
        layers = []
        in_dim = input_dim
        for h in hidden_dims:
            layers += [nn.Linear(in_dim, h), nn.BatchNorm1d(h), nn.ReLU(), nn.Dropout(dropout)]
            in_dim = h
        self.backbone = nn.Sequential(*layers)

        # Task-specific heads
        self.head_play  = nn.Linear(in_dim, n_sports)
        self.head_watch = nn.Linear(in_dim, n_sports)
        self.head_pro   = nn.Linear(in_dim, n_sports)

    def forward(self, x: torch.Tensor) -> Dict[str, torch.Tensor]:
        shared = self.backbone(x)
        return {
            "play":  torch.sigmoid(self.head_play(shared)),
            "watch": torch.sigmoid(self.head_watch(shared)),
            "pro":   torch.sigmoid(self.head_pro(shared)),
        }


class Trainer:
    """
    Training loop for MultiTaskSportsNet.

    Parameters
    ----------
    model        : MultiTaskSportsNet instance
    lambda_play  : loss weight for play task
    lambda_watch : loss weight for watch task
    lambda_pro   : loss weight for pro task
    lr           : learning rate
    weight_decay : L2 regularisation (maps to lambda_reg)
    """

    def __init__(
        self,
        model: MultiTaskSportsNet,
        lambda_play: float = 1.0,
        lambda_watch: float = 0.8,
        lambda_pro: float = 0.5,
        lr: float = 1e-3,
        weight_decay: float = 1e-4,
    ) -> None:
        self.model = model.to(DEVICE)
        self.lambdas = {"play": lambda_play, "watch": lambda_watch, "pro": lambda_pro}
        self.optimizer = torch.optim.Adam(model.parameters(), lr=lr, weight_decay=weight_decay)
        self.scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer, patience=5, factor=0.5
        )
        self.criterion = nn.BCELoss()
        self.history: Dict[str, list] = {"train_loss": [], "val_loss": []}

    def fit(
        self,
        X_train: np.ndarray,
        y_play: np.ndarray,
        y_watch: np.ndarray,
        y_pro: np.ndarray,
        epochs: int = 100,
        batch_size: int = 64,
        val_split: float = 0.1,
        verbose: bool = True,
    ) -> "Trainer":
        torch.manual_seed(RANDOM_STATE)

        # Binarise pro labels (score >= 2 → 1)
        y_pro_bin = (y_pro >= 2).astype(np.float32)

        # Validation split
        n = X_train.shape[0]
        n_val = int(n * val_split)
        idx = np.random.default_rng(RANDOM_STATE).permutation(n)
        val_idx, trn_idx = idx[:n_val], idx[n_val:]

        def to_tensor(arr: np.ndarray) -> torch.Tensor:
            return torch.tensor(arr, dtype=torch.float32)

        trn_ds = TensorDataset(
            to_tensor(X_train[trn_idx]),
            to_tensor(y_play[trn_idx]),
            to_tensor(y_watch[trn_idx]),
            to_tensor(y_pro_bin[trn_idx]),
        )
        val_ds = TensorDataset(
            to_tensor(X_train[val_idx]),
            to_tensor(y_play[val_idx]),
            to_tensor(y_watch[val_idx]),
            to_tensor(y_pro_bin[val_idx]),
        )

        trn_loader = DataLoader(trn_ds, batch_size=batch_size, shuffle=True)
        val_loader = DataLoader(val_ds, batch_size=batch_size)

        best_val_loss = float("inf")
        best_state = None

        for epoch in range(1, epochs + 1):
            self.model.train()
            trn_loss = 0.0
            for xb, yp, yw, ypr in trn_loader:
                xb, yp, yw, ypr = xb.to(DEVICE), yp.to(DEVICE), yw.to(DEVICE), ypr.to(DEVICE)
                self.optimizer.zero_grad()
                out = self.model(xb)
                loss = (
                    self.lambdas["play"]  * self.criterion(out["play"],  yp)
                    + self.lambdas["watch"] * self.criterion(out["watch"], yw)
                    + self.lambdas["pro"]   * self.criterion(out["pro"],   ypr)
                )
                loss.backward()
                self.optimizer.step()
                trn_loss += loss.item() * xb.size(0)

            trn_loss /= len(trn_ds)

            self.model.eval()
            val_loss = 0.0
            with torch.no_grad():
                for xb, yp, yw, ypr in val_loader:
                    xb, yp, yw, ypr = xb.to(DEVICE), yp.to(DEVICE), yw.to(DEVICE), ypr.to(DEVICE)
                    out = self.model(xb)
                    loss = (
                        self.lambdas["play"]  * self.criterion(out["play"],  yp)
                        + self.lambdas["watch"] * self.criterion(out["watch"], yw)
                        + self.lambdas["pro"]   * self.criterion(out["pro"],   ypr)
                    )
                    val_loss += loss.item() * xb.size(0)
            val_loss /= len(val_ds)

            self.history["train_loss"].append(trn_loss)
            self.history["val_loss"].append(val_loss)
            self.scheduler.step(val_loss)

            if val_loss < best_val_loss:
                best_val_loss = val_loss
                best_state = {k: v.cpu().clone() for k, v in self.model.state_dict().items()}

            if verbose and epoch % 10 == 0:
                print(f"Epoch {epoch:3d}/{epochs}  train={trn_loss:.4f}  val={val_loss:.4f}")

        if best_state is not None:
            self.model.load_state_dict(best_state)
        return self

    def predict_scores(self, X: np.ndarray, task: str = "play") -> np.ndarray:
        """
        Returns predicted probability scores for a given task.

        Parameters
        ----------
        X    : (n_users, n_features) input features
        task : one of 'play', 'watch', 'pro'
        """
        self.model.eval()
        with torch.no_grad():
            tensor = torch.tensor(X, dtype=torch.float32).to(DEVICE)
            out = self.model(tensor)
        return out[task].cpu().numpy()

    def save(self, path: str = "experiments/multitask_nn.pt") -> None:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        torch.save(self.model.state_dict(), path)
        print(f"Model saved to {path}")

    def load(self, path: str = "experiments/multitask_nn.pt") -> None:
        self.model.load_state_dict(torch.load(path, map_location=DEVICE))
        print(f"Model loaded from {path}")
