"""
Recommendation evaluation metrics.

Metrics:
  - precision_at_k     : fraction of top-K recommendations that are relevant
  - recall_at_k        : fraction of relevant items retrieved in top-K
  - f1_at_k            : harmonic mean of precision and recall at K
  - ndcg_at_k          : normalised discounted cumulative gain at K
  - map_at_k           : mean average precision at K
  - discovery_rate     : fraction of recommended items the user has never tried
"""

import numpy as np
from typing import List


def precision_at_k(y_true: np.ndarray, scores: np.ndarray, k: int = 5) -> float:
    """
    Mean Precision@K across all users.

    Parameters
    ----------
    y_true  : (n_users, n_sports) binary relevance matrix
    scores  : (n_users, n_sports) predicted score matrix (higher = more recommended)
    k       : cutoff rank
    """
    n_users = y_true.shape[0]
    precisions = []
    for i in range(n_users):
        top_k_idx = np.argsort(scores[i])[::-1][:k]
        hits = y_true[i, top_k_idx].sum()
        precisions.append(hits / k)
    return float(np.mean(precisions))


def recall_at_k(y_true: np.ndarray, scores: np.ndarray, k: int = 5) -> float:
    """Mean Recall@K across all users."""
    n_users = y_true.shape[0]
    recalls = []
    for i in range(n_users):
        n_relevant = y_true[i].sum()
        if n_relevant == 0:
            continue
        top_k_idx = np.argsort(scores[i])[::-1][:k]
        hits = y_true[i, top_k_idx].sum()
        recalls.append(hits / n_relevant)
    return float(np.mean(recalls)) if recalls else 0.0


def f1_at_k(y_true: np.ndarray, scores: np.ndarray, k: int = 5) -> float:
    """Harmonic mean of Precision@K and Recall@K."""
    p = precision_at_k(y_true, scores, k)
    r = recall_at_k(y_true, scores, k)
    return 2 * p * r / (p + r + 1e-8)


def ndcg_at_k(y_true: np.ndarray, scores: np.ndarray, k: int = 5) -> float:
    """
    Mean NDCG@K across all users.
    Assumes binary relevance (0/1).
    """
    n_users = y_true.shape[0]
    ndcgs = []
    for i in range(n_users):
        top_k_idx = np.argsort(scores[i])[::-1][:k]
        relevance = y_true[i, top_k_idx]

        # DCG
        positions = np.arange(1, k + 1)
        dcg = (relevance / np.log2(positions + 1)).sum()

        # Ideal DCG
        ideal_relevance = np.sort(y_true[i])[::-1][:k]
        idcg = (ideal_relevance / np.log2(positions + 1)).sum()

        ndcgs.append(dcg / idcg if idcg > 0 else 0.0)
    return float(np.mean(ndcgs))


def map_at_k(y_true: np.ndarray, scores: np.ndarray, k: int = 5) -> float:
    """Mean Average Precision@K across all users."""
    n_users = y_true.shape[0]
    aps = []
    for i in range(n_users):
        top_k_idx = np.argsort(scores[i])[::-1][:k]
        relevance = y_true[i, top_k_idx]
        if relevance.sum() == 0:
            continue
        precision_at_positions = np.cumsum(relevance) / (np.arange(len(relevance)) + 1)
        ap = (precision_at_positions * relevance).sum() / relevance.sum()
        aps.append(ap)
    return float(np.mean(aps)) if aps else 0.0


def discovery_rate(
    scores: np.ndarray,
    tried_mask: np.ndarray,
    k: int = 5,
) -> float:
    """
    Fraction of top-K recommendations that are sports the user has never tried.

    Parameters
    ----------
    scores      : (n_users, n_sports) predicted scores
    tried_mask  : (n_users, n_sports) binary — 1 if user has tried this sport
    k           : cutoff rank
    """
    n_users = scores.shape[0]
    rates = []
    for i in range(n_users):
        top_k_idx = np.argsort(scores[i])[::-1][:k]
        novel = (tried_mask[i, top_k_idx] == 0).sum()
        rates.append(novel / k)
    return float(np.mean(rates))


def evaluate_all(
    y_true: np.ndarray,
    scores: np.ndarray,
    tried_mask: np.ndarray = None,
    ks: List[int] = [5, 10],
    label: str = "",
) -> dict:
    """
    Compute all metrics for a given prediction task.

    Parameters
    ----------
    y_true      : (n_users, n_sports) binary relevance
    scores      : (n_users, n_sports) predicted scores
    tried_mask  : (n_users, n_sports) binary tried mask (optional)
    ks          : list of K values to evaluate
    label       : task name for display (e.g. 'play', 'watch')

    Returns
    -------
    dict of metric_name -> value
    """
    results = {}
    for k in ks:
        results[f"precision@{k}"] = precision_at_k(y_true, scores, k)
        results[f"recall@{k}"]    = recall_at_k(y_true, scores, k)
        results[f"f1@{k}"]        = f1_at_k(y_true, scores, k)
        results[f"ndcg@{k}"]      = ndcg_at_k(y_true, scores, k)
        results[f"map@{k}"]       = map_at_k(y_true, scores, k)
        if tried_mask is not None:
            results[f"discovery_rate@{k}"] = discovery_rate(scores, tried_mask, k)

    if label:
        print(f"\n{'='*50}")
        print(f"  {label.upper()} METRICS")
        print(f"{'='*50}")
        for name, val in results.items():
            print(f"  {name:25s}: {val:.4f}")

    return results
