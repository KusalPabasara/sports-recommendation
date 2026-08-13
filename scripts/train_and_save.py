"""
Train the exact models from the paper and serialize them for production deployment.

Trains:
  - StackingEnsemble for play task
  - StackingEnsemble for watch task
  - DiscoveryScorer fitted on training play labels
  - SportsPreprocessor (already fitted, re-saved for portability)

Outputs to app/models/:
  - stacking_play.pkl
  - stacking_watch.pkl
  - discovery_scorer.pkl
  - preprocessor.pkl
  - metadata.json
"""

import json
import gzip
import os
import pickle
import sys

# Ensure project root is importable
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, PROJECT_ROOT)

from src.data.preprocessor import SportsPreprocessor
from src.data.synthetic_generator import SPORTS, INTEREST_DIMS, STRENGTH_DIMS
from src.models.baselines import StackingEnsemble
from src.features.discovery_score import DiscoveryScorer

OUTPUT_DIR = os.path.join(PROJECT_ROOT, "app", "models")
DATA_PATH = os.path.join(PROJECT_ROOT, "data", "processed", "synthetic_dataset.csv")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 1. Preprocess data
    print("=" * 60)
    print("Step 1: Preprocessing data...")
    print("=" * 60)
    prep = SportsPreprocessor()
    splits = prep.fit_transform(DATA_PATH)

    X_train = splits["X_train"]
    X_test = splits["X_test"]
    y_play_train = splits["y_play_train"]
    y_watch_train = splits["y_watch_train"]
    feature_names = splits["feature_names"]
    sports = splits["sports"]

    print(f"  X_train: {X_train.shape}")
    print(f"  X_test:  {X_test.shape}")
    print(f"  Sports:  {len(sports)}")
    print(f"  Features: {len(feature_names)}")

    # 2. Train stacking ensemble for PLAY task
    print("\n" + "=" * 60)
    print("Step 2: Training StackingEnsemble (play task)...")
    print("=" * 60)
    # A compact production configuration preserves the paper's XGBoost + RF
    # stacking architecture while keeping serverless artifacts and cold starts
    # small. Full research experiments continue to use the class defaults.
    production_stack = {
        "cv": 3,
        "xgb_estimators": 40,
        "xgb_max_depth": 3,
        "rf_estimators": 60,
        "rf_max_depth": 6,
    }
    stack_play = StackingEnsemble(**production_stack)
    stack_play.fit(X_train, y_play_train)
    print("  Play model trained.")

    # 3. Train stacking ensemble for WATCH task
    print("\n" + "=" * 60)
    print("Step 3: Training StackingEnsemble (watch task)...")
    print("=" * 60)
    stack_watch = StackingEnsemble(**production_stack)
    stack_watch.fit(X_train, y_watch_train)
    print("  Watch model trained.")

    # 4. Fit discovery scorer
    print("\n" + "=" * 60)
    print("Step 4: Fitting DiscoveryScorer...")
    print("=" * 60)
    interest_cols = [f"interest_{d}" for d in INTEREST_DIMS]
    interest_indices = [feature_names.index(c) for c in interest_cols]
    discovery = DiscoveryScorer(alpha=0.4)
    discovery.fit(X_train, interest_indices, y_play_train)
    print(f"  Discovery scorer fitted. Sport profiles shape: {discovery.sport_profiles.shape}")

    # 5. Serialize everything
    print("\n" + "=" * 60)
    print("Step 5: Serializing models...")
    print("=" * 60)

    artifacts = {
        "stacking_play.pkl.gz": stack_play,
        "stacking_watch.pkl.gz": stack_watch,
        "discovery_scorer.pkl.gz": discovery,
        "preprocessor.pkl.gz": prep,
    }
    for name, obj in artifacts.items():
        path = os.path.join(OUTPUT_DIR, name)
        with gzip.open(path, "wb", compresslevel=9) as f:
            pickle.dump(obj, f)
        size_kb = os.path.getsize(path) / 1024
        print(f"  Saved {name} ({size_kb:.1f} KB)")

    # 6. Save metadata
    metadata = {
        "sports": sports,
        "feature_names": feature_names,
        "interest_dims": INTEREST_DIMS,
        "strength_dims": STRENGTH_DIMS,
        "interest_indices": interest_indices,
        "n_sports": len(sports),
        "n_features": len(feature_names),
        "alpha_discovery": 0.4,
        "version": "1.0.0",
    }
    meta_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(meta_path, "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"  Saved metadata.json")

    print("\n" + "=" * 60)
    print(f"All artifacts saved to {OUTPUT_DIR}/")
    print("=" * 60)


if __name__ == "__main__":
    main()
