"""
Baseline recommendation models.

Models:
  1. RandomBaseline     — randomly scores sports
  2. PopularityBaseline — scores by global play/watch frequency
  3. PhysicalOnlyModel  — XGBoost trained on physical features only
  4. InterestOnlyModel  — XGBoost trained on interest features only
  5. FullXGBoost        — XGBoost trained on all features (no discovery)
  6. FullRandomForest   — RF trained on all features

All expose a common interface:
    model.fit(X_train, y_train)
    scores = model.predict_scores(X_test)  -> (n_users, n_sports) float
"""

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from xgboost import XGBClassifier


RANDOM_STATE = 42


class RandomBaseline:
    """Assigns uniformly random scores — lower bound baseline."""

    def __init__(self, seed: int = RANDOM_STATE) -> None:
        self.seed = seed
        self._rng = np.random.default_rng(seed)
        self.n_sports: int = 0

    def fit(self, X: np.ndarray, y: np.ndarray) -> "RandomBaseline":
        self.n_sports = y.shape[1]
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        return self._rng.random(size=(X.shape[0], self.n_sports))


class PopularityBaseline:
    """
    Scores every user identically by global sport popularity (play/watch rate).
    Represents the recommendation you'd make knowing nothing about the user.
    """

    def __init__(self) -> None:
        self.sport_rates: np.ndarray = np.array([])

    def fit(self, X: np.ndarray, y: np.ndarray) -> "PopularityBaseline":
        self.sport_rates = y.mean(axis=0)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        return np.tile(self.sport_rates, (X.shape[0], 1))


class PhysicalOnlyModel:
    """
    XGBoost multi-label classifier trained on physical features only.
    Represents the standard AI Sport Scout style — no interests.

    physical_indices: column indices of physical features in X.
    """

    def __init__(self, physical_indices: list) -> None:
        self.physical_indices = physical_indices
        self.model = MultiOutputClassifier(
            XGBClassifier(
                n_estimators=100,
                max_depth=4,
                learning_rate=0.1,
                use_label_encoder=False,
                eval_metric="logloss",
                random_state=RANDOM_STATE,
                verbosity=0,
            ),
            n_jobs=-1,
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> "PhysicalOnlyModel":
        X_phys = X[:, self.physical_indices]
        self.model.fit(X_phys, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        X_phys = X[:, self.physical_indices]
        proba_list = self.model.predict_proba(X_phys)
        return np.column_stack([p[:, 1] for p in proba_list])


class InterestOnlyModel:
    """
    XGBoost multi-label classifier trained on interest features only.
    Ablation: what happens if we use interests but ignore physical?
    """

    def __init__(self, interest_indices: list) -> None:
        self.interest_indices = interest_indices
        self.model = MultiOutputClassifier(
            XGBClassifier(
                n_estimators=100,
                max_depth=4,
                learning_rate=0.1,
                use_label_encoder=False,
                eval_metric="logloss",
                random_state=RANDOM_STATE,
                verbosity=0,
            ),
            n_jobs=-1,
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> "InterestOnlyModel":
        X_int = X[:, self.interest_indices]
        self.model.fit(X_int, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        X_int = X[:, self.interest_indices]
        proba_list = self.model.predict_proba(X_int)
        return np.column_stack([p[:, 1] for p in proba_list])


class FullXGBoost:
    """
    XGBoost multi-label classifier trained on all features.
    Main tree-based baseline.
    """

    def __init__(self, n_estimators: int = 200, max_depth: int = 5) -> None:
        self.model = MultiOutputClassifier(
            XGBClassifier(
                n_estimators=n_estimators,
                max_depth=max_depth,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                use_label_encoder=False,
                eval_metric="logloss",
                random_state=RANDOM_STATE,
                verbosity=0,
            ),
            n_jobs=-1,
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> "FullXGBoost":
        self.model.fit(X, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        proba_list = self.model.predict_proba(X)
        return np.column_stack([p[:, 1] for p in proba_list])


class FullRandomForest:
    """
    Random Forest multi-label classifier trained on all features.
    Interpretable baseline; used for initial SHAP analysis.
    """

    def __init__(self, n_estimators: int = 200) -> None:
        self.model = MultiOutputClassifier(
            RandomForestClassifier(
                n_estimators=n_estimators,
                max_depth=8,
                min_samples_leaf=5,
                random_state=RANDOM_STATE,
                n_jobs=-1,
            ),
            n_jobs=-1,
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> "FullRandomForest":
        self.model.fit(X, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        proba_list = self.model.predict_proba(X)
        return np.column_stack([p[:, 1] for p in proba_list])
