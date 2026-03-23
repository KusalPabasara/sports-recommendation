"""
Preprocessing pipeline for the sports recommendation dataset.

Steps:
  1. Load raw CSV
  2. Encode categorical demographics (gender, region)
  3. Normalize continuous physical features (StandardScaler)
  4. Keep Likert features as ordinal integers (already 1–5)
  5. Build feature matrix X and label matrices y_play, y_watch, y_pro
  6. Train/test split (80/20, stratified on number of sports played)
  7. Persist scaler and encoder for inference

Usage:
    from src.data.preprocessor import SportsPreprocessor
    prep = SportsPreprocessor()
    splits = prep.fit_transform("data/processed/synthetic_dataset.csv")
"""

import os
import pickle
from typing import Dict, Tuple

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

from src.data.synthetic_generator import SPORTS, INTEREST_DIMS, STRENGTH_DIMS


RANDOM_STATE = 42

CATEGORICAL_COLS = ["gender", "region"]
ORDINAL_COLS = (
    [f"interest_{d}" for d in INTEREST_DIMS]
    + [f"strength_{d}" for d in STRENGTH_DIMS]
    + ["facility_access"]
)
CONTINUOUS_COLS = ["age", "height_cm", "weight_kg", "bmi", "sprint_100m_s", "jump_cm"]


class SportsPreprocessor:
    """
    Fits and applies the full preprocessing pipeline.

    Attributes
    ----------
    scaler : StandardScaler
        Fitted on continuous features from training set only.
    label_encoders : dict
        One LabelEncoder per categorical column.
    feature_names : list[str]
        Ordered list of feature columns in X.
    """

    def __init__(self) -> None:
        self.scaler = StandardScaler()
        self.label_encoders: Dict[str, LabelEncoder] = {}
        self.feature_names: list = []
        self._fitted = False

    def fit_transform(
        self, csv_path: str, test_size: float = 0.20
    ) -> Dict[str, np.ndarray]:
        """
        Load data, preprocess, and return train/test splits.

        Parameters
        ----------
        csv_path : str
            Path to synthetic_dataset.csv
        test_size : float
            Fraction for test set.

        Returns
        -------
        dict with keys:
            X_train, X_test              : feature matrices
            y_play_train, y_play_test    : (n, n_sports) binary play labels
            y_watch_train, y_watch_test  : (n, n_sports) binary watch labels
            y_pro_train, y_pro_test      : (n, n_sports) ordinal 0–3 pro labels
            feature_names                : list of feature column names
            sports                       : list of sport names
        """
        df = pd.read_csv(csv_path)
        X, y_play, y_watch, y_pro = self._extract_matrices(df)

        # Stratify on number of sports played (binned 0–2 / 3–5 / 6+)
        play_counts = y_play.sum(axis=1)
        strat_bins = pd.cut(play_counts, bins=[-1, 2, 5, 100],
                            labels=["low", "mid", "high"])

        (X_train, X_test,
         yp_train, yp_test,
         yw_train, yw_test,
         ypr_train, ypr_test) = train_test_split(
            X, y_play, y_watch, y_pro,
            test_size=test_size,
            random_state=RANDOM_STATE,
            stratify=strat_bins,
        )

        # Fit scaler on training continuous features only
        cont_idx = [self.feature_names.index(c) for c in CONTINUOUS_COLS if c in self.feature_names]
        X_train[:, cont_idx] = self.scaler.fit_transform(X_train[:, cont_idx])
        X_test[:, cont_idx]  = self.scaler.transform(X_test[:, cont_idx])
        self._fitted = True

        return {
            "X_train": X_train,
            "X_test":  X_test,
            "y_play_train":  yp_train,
            "y_play_test":   yp_test,
            "y_watch_train": yw_train,
            "y_watch_test":  yw_test,
            "y_pro_train":   ypr_train,
            "y_pro_test":    ypr_test,
            "feature_names": self.feature_names,
            "sports":        SPORTS,
        }

    def _extract_matrices(
        self, df: pd.DataFrame
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        """Encode categoricals, build feature matrix and label matrices."""
        df = df.copy()

        # Encode categoricals
        for col in CATEGORICAL_COLS:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le

        # Feature columns
        feature_cols = CATEGORICAL_COLS + CONTINUOUS_COLS + ORDINAL_COLS
        feature_cols = [c for c in feature_cols if c in df.columns]
        self.feature_names = feature_cols

        X = df[feature_cols].values.astype(np.float32)

        # Label matrices
        play_cols  = [f"play_{s}"  for s in SPORTS]
        watch_cols = [f"watch_{s}" for s in SPORTS]
        pro_cols   = [f"pro_{s}"   for s in SPORTS]

        y_play  = df[play_cols].values.astype(np.float32)
        y_watch = df[watch_cols].values.astype(np.float32)
        y_pro   = df[pro_cols].values.astype(np.float32)

        return X, y_play, y_watch, y_pro

    def transform(self, df: pd.DataFrame) -> np.ndarray:
        """Transform new data using fitted encoders and scaler (inference)."""
        assert self._fitted, "Call fit_transform first."
        df = df.copy()
        for col, le in self.label_encoders.items():
            if col in df.columns:
                df[col] = le.transform(df[col].astype(str))
        feature_cols = [c for c in self.feature_names if c in df.columns]
        X = df[feature_cols].values.astype(np.float32)
        cont_idx = [self.feature_names.index(c) for c in CONTINUOUS_COLS if c in self.feature_names]
        X[:, cont_idx] = self.scaler.transform(X[:, cont_idx])
        return X

    def save(self, path: str = "experiments/preprocessor.pkl") -> None:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            pickle.dump(self, f)
        print(f"Preprocessor saved to {path}")

    @staticmethod
    def load(path: str = "experiments/preprocessor.pkl") -> "SportsPreprocessor":
        with open(path, "rb") as f:
            return pickle.load(f)


if __name__ == "__main__":
    import sys, os
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
    from src.data.synthetic_generator import SPORTS, INTEREST_DIMS, STRENGTH_DIMS  # noqa: F811
    prep = SportsPreprocessor()
    splits = prep.fit_transform("data/processed/synthetic_dataset.csv")
    print(f"X_train: {splits['X_train'].shape}")
    print(f"X_test:  {splits['X_test'].shape}")
    print(f"y_play_train: {splits['y_play_train'].shape}")
    print(f"Avg sports played (train): {splits['y_play_train'].sum(axis=1).mean():.2f}")
    prep.save()
