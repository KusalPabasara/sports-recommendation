"""Model loading and inference logic for the Sports Recommendation API."""

import gzip
import json
import os
import pickle
from typing import Dict, List, Tuple

import numpy as np

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

# Display-friendly sport names
SPORT_DISPLAY_NAMES = {
    "football_soccer": "Football / Soccer",
    "cricket": "Cricket",
    "basketball": "Basketball",
    "tennis": "Tennis",
    "badminton": "Badminton",
    "table_tennis": "Table Tennis",
    "volleyball": "Volleyball",
    "swimming": "Swimming",
    "athletics_track": "Athletics / Track",
    "cycling": "Cycling",
    "martial_arts": "Martial Arts",
    "boxing": "Boxing",
    "gymnastics": "Gymnastics",
    "archery": "Archery",
    "rock_climbing": "Rock Climbing",
    "rugby": "Rugby",
    "weightlifting": "Weightlifting",
    "esports": "Esports",
    "skateboarding": "Skateboarding",
    "rowing": "Rowing",
}

# Feature group importance from SHAP analysis (paper Table V)
FEATURE_IMPORTANCE = {
    "interests": {"percentage": 35.4, "label": "Personal Interests"},
    "strengths": {"percentage": 30.5, "label": "Self-Rated Strengths"},
    "physical": {"percentage": 26.6, "label": "Physical Metrics"},
    "demographics": {"percentage": 7.5, "label": "Demographics"},
}


class ModelServer:
    """Loads serialized models and runs inference."""

    def __init__(self):
        self.stack_play = None
        self.stack_watch = None
        self.discovery = None
        self.preprocessor = None
        self.metadata = None
        self._loaded = False

    def load(self):
        """Load all serialized models from disk."""
        self.stack_play = self._load_pickle("stacking_play")
        self.stack_watch = self._load_pickle("stacking_watch")
        self.discovery = self._load_pickle("discovery_scorer")
        self.preprocessor = self._load_pickle("preprocessor")
        with open(os.path.join(MODELS_DIR, "metadata.json"), "r") as f:
            self.metadata = json.load(f)
        self._loaded = True

    @staticmethod
    def _load_pickle(name: str):
        """Load a compressed production artifact, with local .pkl fallback."""
        compressed_path = os.path.join(MODELS_DIR, f"{name}.pkl.gz")
        if os.path.exists(compressed_path):
            with gzip.open(compressed_path, "rb") as f:
                return pickle.load(f)

        with open(os.path.join(MODELS_DIR, f"{name}.pkl"), "rb") as f:
            return pickle.load(f)

    def _build_feature_vector(self, features: dict) -> np.ndarray:
        """
        Convert raw user features dict into the model's expected feature vector.

        The preprocessor expects columns in this order:
          categorical: gender, region
          continuous: age, height_cm, weight_kg, bmi, sprint_100m_s, jump_cm
          ordinal: interest_* (12), strength_* (8), facility_access
        """
        feature_names = self.metadata["feature_names"]
        interest_dims = self.metadata["interest_dims"]
        strength_dims = self.metadata["strength_dims"]

        # Compute BMI
        height_m = features["height_cm"] / 100.0
        bmi = features["weight_kg"] / (height_m ** 2) if height_m > 0 else 22.0

        # Build raw dict matching feature_names order
        raw = {}
        raw["gender"] = features["gender"]
        raw["region"] = features["region"]
        raw["age"] = features["age"]
        raw["height_cm"] = features["height_cm"]
        raw["weight_kg"] = features["weight_kg"]
        raw["bmi"] = bmi
        raw["sprint_100m_s"] = features["sprint_100m_s"]
        raw["jump_cm"] = features["jump_cm"]

        for dim in interest_dims:
            raw[f"interest_{dim}"] = features[f"interest_{dim}"]
        for dim in strength_dims:
            raw[f"strength_{dim}"] = features[f"strength_{dim}"]
        raw["facility_access"] = features["facility_access"]

        # Encode categoricals using fitted label encoders
        import pandas as pd
        df = pd.DataFrame([raw])

        # Use preprocessor's transform method
        X = self.preprocessor.transform(df)
        return X

    def predict(
        self,
        features: dict,
        tried_sports: List[str],
        top_k: int = 5,
    ) -> Dict:
        """
        Run full prediction pipeline.

        Returns dict with play_recs, watch_recs, discovery_recs.
        """
        assert self._loaded, "Call load() first."

        sports = self.metadata["sports"]
        interest_indices = self.metadata["interest_indices"]
        n_sports = len(sports)

        # Build feature vector (1, 29)
        X = self._build_feature_vector(features)

        # Play predictions
        play_scores = self.stack_play.predict_scores(X)  # (1, 20)

        # Watch predictions
        watch_scores = self.stack_watch.predict_scores(X)  # (1, 20)

        # Discovery scores
        tried_mask = np.zeros((1, n_sports))
        for s in tried_sports:
            if s in sports:
                tried_mask[0, sports.index(s)] = 1
        disc_scores = self.discovery.score(X, interest_indices, tried_mask=tried_mask)

        # Blended discovery scores
        blended = self.discovery.blend(
            play_scores, X, interest_indices, tried_mask=tried_mask
        )
        # Zero out tried sports entirely so they never appear in discovery
        blended = blended * (1 - tried_mask)

        # Rank and format
        play_recs = self._rank(play_scores[0], sports, top_k, is_discovery=False)
        watch_recs = self._rank(watch_scores[0], sports, top_k, is_discovery=False)
        disc_recs = self._rank(blended[0], sports, top_k, is_discovery=True)

        return {
            "play_recommendations": play_recs,
            "watch_recommendations": watch_recs,
            "discovery_recommendations": disc_recs,
            "feature_importance": FEATURE_IMPORTANCE,
        }

    def _rank(
        self,
        scores: np.ndarray,
        sports: List[str],
        top_k: int,
        is_discovery: bool,
    ) -> List[Dict]:
        """Rank sports by score and return top-K."""
        ranked_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        for rank, idx in enumerate(ranked_indices, 1):
            sport_id = sports[idx]
            results.append({
                "sport_id": sport_id,
                "sport_name": SPORT_DISPLAY_NAMES.get(sport_id, sport_id),
                "score": round(float(scores[idx]), 4),
                "rank": rank,
                "is_discovery": is_discovery,
            })
        return results

    def get_sports(self) -> List[Dict]:
        """Return list of all sports with display names."""
        return [
            {"sport_id": s, "display_name": SPORT_DISPLAY_NAMES.get(s, s)}
            for s in self.metadata["sports"]
        ]


# Singleton
model_server = ModelServer()
