"""
Discovery Score Module.

Computes a "discovery score" for each (user, sport) pair, representing
how well an unseen sport aligns with a user's latent interest profile.

Algorithm:
  1. Build a sport profile vector by averaging interest features of all
     users who play that sport (content representation of the sport).
  2. For each user, compute cosine similarity between their interest vector
     and each sport's profile vector.
  3. Mask out sports the user has already tried (play_labels or tried_mask).
  4. Rank remaining sports by similarity → discovery score.

Usage:
    from src.features.discovery_score import DiscoveryScorer
    scorer = DiscoveryScorer()
    scorer.fit(X_train, interest_indices, y_play_train)
    discovery_scores = scorer.score(X_test, interest_indices, tried_mask=y_play_test)
"""

from __future__ import annotations

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class DiscoveryScorer:
    """
    Computes novel-sport affinity scores for users.

    Parameters
    ----------
    alpha : float
        Weight blending discovery score with model-predicted score.
        final_score = alpha * discovery_score + (1 - alpha) * model_score
    """

    def __init__(self, alpha: float = 0.5) -> None:
        self.alpha = alpha
        self.sport_profiles: np.ndarray = np.array([])  # (n_sports, n_interest_dims)
        self._fitted = False

    def fit(
        self,
        X: np.ndarray,
        interest_indices: list,
        y_play: np.ndarray,
    ) -> "DiscoveryScorer":
        """
        Build sport profile vectors from training data.

        For each sport s:
          profile(s) = mean of interest vectors of users where y_play[:, s] == 1
          (falls back to overall mean if sport has no players)

        Parameters
        ----------
        X                : (n_users, n_features) full feature matrix (already preprocessed)
        interest_indices : column indices of interest features in X
        y_play           : (n_users, n_sports) binary play labels
        """
        X_interest = X[:, interest_indices]  # (n_users, n_interest_dims)
        n_sports = y_play.shape[1]
        fallback = X_interest.mean(axis=0)

        profiles = []
        for s in range(n_sports):
            player_mask = y_play[:, s] == 1
            if player_mask.sum() >= 3:
                profiles.append(X_interest[player_mask].mean(axis=0))
            else:
                profiles.append(fallback)

        self.sport_profiles = np.vstack(profiles)  # (n_sports, n_interest_dims)
        self._fitted = True
        return self

    def score(
        self,
        X: np.ndarray,
        interest_indices: list,
        tried_mask: np.ndarray = None,
    ) -> np.ndarray:
        """
        Compute discovery scores for all (user, sport) pairs.

        Parameters
        ----------
        X                : (n_users, n_features) full feature matrix
        interest_indices : column indices of interest features in X
        tried_mask       : (n_users, n_sports) binary — 1 if user has tried sport
                           (tried sports are zeroed out in the discovery score)

        Returns
        -------
        discovery_scores : (n_users, n_sports) float, 0 for tried sports
        """
        assert self._fitted, "Call fit() before score()."
        X_interest = X[:, interest_indices]  # (n_users, n_interest_dims)

        # Cosine similarity: (n_users, n_sports)
        sim = cosine_similarity(X_interest, self.sport_profiles)

        # Normalize to [0, 1]
        sim_min = sim.min(axis=1, keepdims=True)
        sim_max = sim.max(axis=1, keepdims=True)
        scores = (sim - sim_min) / (sim_max - sim_min + 1e-8)

        # Zero out sports the user has already tried
        if tried_mask is not None:
            scores = scores * (1 - tried_mask)

        return scores

    def blend(
        self,
        model_scores: np.ndarray,
        X: np.ndarray,
        interest_indices: list,
        tried_mask: np.ndarray = None,
    ) -> np.ndarray:
        """
        Blend discovery scores with a model's predicted scores.

        final_score = alpha * discovery_score + (1 - alpha) * model_score

        Parameters
        ----------
        model_scores     : (n_users, n_sports) scores from a trained model
        X                : (n_users, n_features) full feature matrix
        interest_indices : interest column indices
        tried_mask       : (n_users, n_sports) binary tried mask

        Returns
        -------
        blended_scores : (n_users, n_sports)
        """
        disc = self.score(X, interest_indices, tried_mask=tried_mask)

        # Normalize model scores to [0,1] per user
        ms_min = model_scores.min(axis=1, keepdims=True)
        ms_max = model_scores.max(axis=1, keepdims=True)
        norm_model = (model_scores - ms_min) / (ms_max - ms_min + 1e-8)

        return self.alpha * disc + (1 - self.alpha) * norm_model

    def top_k_discoveries(
        self,
        X: np.ndarray,
        interest_indices: list,
        tried_mask: np.ndarray,
        sport_names: list,
        k: int = 5,
    ) -> list:
        """
        Return top-K discovery sport names for each user.

        Returns
        -------
        list of lists: outer = users, inner = top-K sport name strings
        """
        scores = self.score(X, interest_indices, tried_mask=tried_mask)
        top_k = []
        for i in range(scores.shape[0]):
            ranked = np.argsort(scores[i])[::-1][:k]
            top_k.append([sport_names[j] for j in ranked if scores[i, j] > 0])
        return top_k
