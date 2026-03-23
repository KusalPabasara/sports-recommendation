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
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, StratifiedKFold
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


class TunedXGBoost:
    """
    XGBoost with GridSearchCV hyperparameter tuning.
    Tunes on the first sport label via cross-validated grid search,
    then applies best params to all 20 sports via MultiOutputClassifier.
    """

    def __init__(self, cv: int = 3, verbose: int = 0) -> None:
        self.cv = cv
        self.verbose = verbose
        self.best_params_ = {}
        self.model = None

    def fit(self, X: np.ndarray, y: np.ndarray) -> "TunedXGBoost":
        param_grid = {
            "n_estimators": [100, 200, 300],
            "max_depth": [3, 5, 7],
            "learning_rate": [0.01, 0.05, 0.1],
            "subsample": [0.7, 0.8, 1.0],
            "colsample_bytree": [0.7, 0.8, 1.0],
        }
        y_tune = y[:, 0] if y.ndim == 2 else y
        base = XGBClassifier(
            use_label_encoder=False,
            eval_metric="logloss",
            random_state=RANDOM_STATE,
            verbosity=0,
        )
        gs = GridSearchCV(
            base, param_grid,
            scoring="roc_auc",
            cv=StratifiedKFold(n_splits=self.cv, shuffle=True, random_state=RANDOM_STATE),
            n_jobs=-1,
            verbose=self.verbose,
            refit=False,
        )
        gs.fit(X, y_tune)
        self.best_params_ = gs.best_params_
        if self.verbose:
            print(f"  Best XGB params: {self.best_params_}")

        best_xgb = XGBClassifier(
            **self.best_params_,
            use_label_encoder=False,
            eval_metric="logloss",
            random_state=RANDOM_STATE,
            verbosity=0,
        )
        self.model = MultiOutputClassifier(best_xgb, n_jobs=-1)
        self.model.fit(X, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        proba_list = self.model.predict_proba(X)
        return np.column_stack([p[:, 1] for p in proba_list])


class TunedRandomForest:
    """
    Random Forest with GridSearchCV hyperparameter tuning.
    """

    def __init__(self, cv: int = 3, verbose: int = 0) -> None:
        self.cv = cv
        self.verbose = verbose
        self.best_params_ = {}
        self.model = None

    def fit(self, X: np.ndarray, y: np.ndarray) -> "TunedRandomForest":
        param_grid = {
            "n_estimators": [100, 200, 300],
            "max_depth": [5, 8, 12, None],
            "min_samples_leaf": [2, 5, 10],
            "max_features": ["sqrt", "log2", 0.5],
        }
        y_tune = y[:, 0] if y.ndim == 2 else y
        base = RandomForestClassifier(random_state=RANDOM_STATE)
        gs = GridSearchCV(
            base, param_grid,
            scoring="roc_auc",
            cv=StratifiedKFold(n_splits=self.cv, shuffle=True, random_state=RANDOM_STATE),
            n_jobs=-1,
            verbose=self.verbose,
            refit=False,
        )
        gs.fit(X, y_tune)
        self.best_params_ = gs.best_params_
        if self.verbose:
            print(f"  Best RF params: {self.best_params_}")

        best_rf = RandomForestClassifier(
            **self.best_params_,
            random_state=RANDOM_STATE,
            n_jobs=-1,
        )
        self.model = MultiOutputClassifier(best_rf, n_jobs=-1)
        self.model.fit(X, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        proba_list = self.model.predict_proba(X)
        return np.column_stack([p[:, 1] for p in proba_list])


class StackingEnsemble:
    """
    Stacking ensemble: XGBoost + Random Forest as base learners,
    Logistic Regression as meta-learner.
    Classical ML ensemble — no neural networks.
    """

    def __init__(self, cv: int = 3) -> None:
        self.cv = cv
        self.model = None

    def fit(self, X: np.ndarray, y: np.ndarray) -> "StackingEnsemble":
        xgb = XGBClassifier(
            n_estimators=200, max_depth=5, learning_rate=0.05,
            subsample=0.8, colsample_bytree=0.8,
            use_label_encoder=False, eval_metric="logloss",
            random_state=RANDOM_STATE, verbosity=0,
        )
        rf = RandomForestClassifier(
            n_estimators=200, max_depth=8,
            min_samples_leaf=5, random_state=RANDOM_STATE, n_jobs=-1,
        )
        stack = StackingClassifier(
            estimators=[("xgb", xgb), ("rf", rf)],
            final_estimator=LogisticRegression(max_iter=1000, random_state=RANDOM_STATE),
            cv=self.cv,
            stack_method="predict_proba",
            n_jobs=-1,
        )
        self.model = MultiOutputClassifier(stack, n_jobs=-1)
        self.model.fit(X, y)
        return self

    def predict_scores(self, X: np.ndarray) -> np.ndarray:
        proba_list = self.model.predict_proba(X)
        return np.column_stack([p[:, 1] for p in proba_list])
