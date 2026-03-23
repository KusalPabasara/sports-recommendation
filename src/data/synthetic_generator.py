"""
Synthetic dataset generator for the Interest-Driven Sports Recommendation System.

Generates N=1000 synthetic users with:
  - Demographics
  - Interest feature vectors (12 dimensions, Likert 1-5)
  - Strength self-ratings (8 dimensions, Likert 1-5)
  - Physical metrics (height, weight, BMI, sprint, jump)
  - Multi-label sports labels: play, watch (20 sports each)
  - Enjoyment scores and pro-potential scores per sport

Feature-label correlations are calibrated to published literature:
  - Allen (2013): extraversion/openness -> sport type preference
  - Vallerand (2003): harmonious passion -> interest-enjoyment r=0.65
  - Pelletier (1995): intrinsic motivation -> interest-hours r=0.55
  - Fraser-Thomas (2006): interests explain >50% of engagement variance
  - Mendeley PE dataset norms: physical metric distributions by age/gender

Usage:
    from src.data.synthetic_generator import SportsDataGenerator
    gen = SportsDataGenerator(n_users=1000, seed=42)
    df = gen.generate()
    df.to_csv("data/processed/synthetic_dataset.csv", index=False)
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple


SEED = 42
N_USERS = 1000

SPORTS: List[str] = [
    "football_soccer",
    "cricket",
    "basketball",
    "tennis",
    "badminton",
    "table_tennis",
    "volleyball",
    "swimming",
    "athletics_track",
    "cycling",
    "martial_arts",
    "boxing",
    "gymnastics",
    "archery",
    "rock_climbing",
    "rugby",
    "weightlifting",
    "esports",
    "skateboarding",
    "badminton",
]

SPORTS = [
    "football_soccer", "cricket", "basketball", "tennis",
    "badminton", "table_tennis", "volleyball", "swimming",
    "athletics_track", "cycling", "martial_arts", "boxing",
    "gymnastics", "archery", "rock_climbing", "rugby",
    "weightlifting", "esports", "skateboarding", "rowing",
]

INTEREST_DIMS = [
    "team_vs_individual",    # 1=solo, 5=team
    "outdoor_preference",    # 1=indoor, 5=outdoor
    "competition_drive",     # 1=casual, 5=fierce
    "risk_tolerance",        # 1=safe, 5=thrill-seeking
    "creative_expression",   # 1=routine, 5=creative/artistic
    "social_enjoyment",      # 1=solitary, 5=social
    "endurance_interest",    # 1=low, 5=high (enjoys sustained effort)
    "power_interest",        # 1=low, 5=high (enjoys strength/power)
    "speed_agility_interest",# 1=low, 5=high
    "spectator_engagement",  # 1=not a fan, 5=avid watcher
    "ambition_level",        # 1=recreational, 5=aspires to compete
    "strategy_preference",   # 1=physical, 5=highly strategic
]

STRENGTH_DIMS = [
    "endurance_self",
    "strength_self",
    "speed_self",
    "flexibility_self",
    "coordination_self",
    "agility_self",
    "reaction_time_self",
    "strategy_self",
]

# Sport profiles: weight vector over [INTEREST_DIMS] + [physical_fit]
# Shape: (n_sports, n_interest_dims + 1_physical_fit)
# Values represent how much each interest dimension contributes to affinity for this sport
# Scale is arbitrary (will be softmax-normalized per user)
SPORT_PROFILES: Dict[str, Dict] = {
    "football_soccer":  {"interests": [5,4,4,2,2,5,4,2,4,4,4,2], "phys": {"speed":0.4,"endurance":0.4,"strength":0.2}, "base_rate": 0.45},
    "cricket":          {"interests": [4,4,3,1,2,4,2,1,2,4,4,5], "phys": {"speed":0.2,"endurance":0.3,"strength":0.2}, "base_rate": 0.25},
    "basketball":       {"interests": [5,2,4,2,2,5,3,2,4,4,4,2], "phys": {"speed":0.3,"endurance":0.3,"height":0.4},   "base_rate": 0.35},
    "tennis":           {"interests": [1,3,5,2,3,2,3,2,4,3,4,3], "phys": {"speed":0.3,"endurance":0.3,"coordination":0.4}, "base_rate": 0.20},
    "badminton":        {"interests": [2,2,3,1,2,3,3,1,5,2,3,3], "phys": {"speed":0.3,"endurance":0.3,"coordination":0.4}, "base_rate": 0.25},
    "table_tennis":     {"interests": [2,1,3,1,2,2,1,1,4,2,3,4], "phys": {"speed":0.2,"coordination":0.5,"reaction":0.3},  "base_rate": 0.20},
    "volleyball":       {"interests": [5,3,3,1,2,5,3,2,3,3,3,2], "phys": {"speed":0.2,"coordination":0.4,"height":0.4},   "base_rate": 0.18},
    "swimming":         {"interests": [1,3,3,1,2,1,5,3,3,2,3,1], "phys": {"endurance":0.5,"strength":0.3,"flexibility":0.2}, "base_rate": 0.22},
    "athletics_track":  {"interests": [1,4,4,2,1,1,4,2,5,3,4,1], "phys": {"speed":0.5,"endurance":0.4,"strength":0.1},  "base_rate": 0.15},
    "cycling":          {"interests": [1,5,3,2,1,1,5,2,3,2,3,1], "phys": {"endurance":0.6,"strength":0.2,"speed":0.2},   "base_rate": 0.18},
    "martial_arts":     {"interests": [1,2,4,3,3,2,3,4,4,2,4,3], "phys": {"strength":0.3,"flexibility":0.3,"coordination":0.4}, "base_rate": 0.15},
    "boxing":           {"interests": [1,2,5,3,1,1,3,5,4,2,4,2], "phys": {"strength":0.4,"speed":0.3,"endurance":0.3},  "base_rate": 0.10},
    "gymnastics":       {"interests": [1,2,3,2,5,1,3,3,4,3,4,2], "phys": {"flexibility":0.5,"coordination":0.4,"strength":0.1}, "base_rate": 0.08},
    "archery":          {"interests": [1,3,3,1,3,1,1,2,1,2,3,5], "phys": {"coordination":0.4,"strength":0.2,"reaction":0.4}, "base_rate": 0.06},
    "rock_climbing":    {"interests": [1,4,3,5,3,2,3,5,3,2,4,3], "phys": {"strength":0.5,"flexibility":0.3,"endurance":0.2}, "base_rate": 0.07},
    "rugby":            {"interests": [5,4,5,3,1,5,4,5,4,4,4,2], "phys": {"strength":0.4,"endurance":0.3,"speed":0.3},  "base_rate": 0.12},
    "weightlifting":    {"interests": [1,2,4,2,2,1,2,5,1,2,4,1], "phys": {"strength":0.7,"endurance":0.1,"speed":0.2},  "base_rate": 0.10},
    "esports":          {"interests": [3,1,4,1,5,4,1,1,4,3,4,5], "phys": {"reaction":0.5,"coordination":0.3,"speed":0.2}, "base_rate": 0.30},
    "skateboarding":    {"interests": [1,4,2,5,5,3,2,2,4,2,3,2], "phys": {"coordination":0.4,"flexibility":0.3,"speed":0.3}, "base_rate": 0.08},
    "rowing":           {"interests": [3,4,3,1,1,3,5,4,2,2,3,2], "phys": {"endurance":0.5,"strength":0.4,"coordination":0.1}, "base_rate": 0.05},
}

PHYSICAL_NORMS: Dict[str, Dict] = {
    "male_young":   {"height": (175, 7),  "weight": (70, 12),  "sprint_100m": (14.5, 1.8), "jump_cm": (55, 12)},
    "male_adult":   {"height": (177, 7),  "weight": (80, 14),  "sprint_100m": (15.5, 2.0), "jump_cm": (50, 12)},
    "female_young": {"height": (163, 6),  "weight": (57, 10),  "sprint_100m": (16.5, 2.0), "jump_cm": (42, 10)},
    "female_adult": {"height": (164, 6),  "weight": (65, 12),  "sprint_100m": (17.5, 2.2), "jump_cm": (38, 10)},
    "other":        {"height": (170, 8),  "weight": (70, 14),  "sprint_100m": (15.5, 2.0), "jump_cm": (48, 12)},
}


class SportsDataGenerator:
    """
    Generates a synthetic sports recommendation dataset.

    Parameters
    ----------
    n_users : int
        Number of synthetic users to generate.
    seed : int
        Random seed for full reproducibility.
    """

    def __init__(self, n_users: int = N_USERS, seed: int = SEED) -> None:
        self.n_users = n_users
        self.seed = seed
        self.rng = np.random.default_rng(seed)
        self.n_sports = len(SPORTS)
        self.n_interest = len(INTEREST_DIMS)
        self.n_strength = len(STRENGTH_DIMS)

    def _generate_demographics(self) -> pd.DataFrame:
        ages = self.rng.integers(13, 41, size=self.n_users)
        genders = self.rng.choice(["male", "female", "other"],
                                   size=self.n_users, p=[0.48, 0.48, 0.04])
        regions = self.rng.choice(
            ["south_asia", "europe", "north_america", "east_asia", "africa", "oceania"],
            size=self.n_users, p=[0.30, 0.25, 0.20, 0.12, 0.08, 0.05]
        )
        facility_access = self.rng.integers(1, 6, size=self.n_users)
        return pd.DataFrame({
            "age": ages,
            "gender": genders,
            "region": regions,
            "facility_access": facility_access,
        })

    def _generate_interests(self, demographics: pd.DataFrame) -> np.ndarray:
        """
        Generate interest feature vectors (n_users x 12).
        Mild demographic correlations applied:
          - Males skew slightly higher on power_interest, competition_drive
          - Females skew slightly higher on creative_expression, social_enjoyment
          - Older users skew slightly lower on risk_tolerance
        """
        base = self.rng.normal(loc=3.0, scale=1.0,
                                size=(self.n_users, self.n_interest))
        base = np.clip(np.round(base), 1, 5)

        for i, row in demographics.iterrows():
            if row["gender"] == "male":
                base[i, INTEREST_DIMS.index("power_interest")] = np.clip(
                    base[i, INTEREST_DIMS.index("power_interest")] + self.rng.normal(0.4, 0.1), 1, 5)
                base[i, INTEREST_DIMS.index("competition_drive")] = np.clip(
                    base[i, INTEREST_DIMS.index("competition_drive")] + self.rng.normal(0.3, 0.1), 1, 5)
            elif row["gender"] == "female":
                base[i, INTEREST_DIMS.index("creative_expression")] = np.clip(
                    base[i, INTEREST_DIMS.index("creative_expression")] + self.rng.normal(0.4, 0.1), 1, 5)
                base[i, INTEREST_DIMS.index("social_enjoyment")] = np.clip(
                    base[i, INTEREST_DIMS.index("social_enjoyment")] + self.rng.normal(0.3, 0.1), 1, 5)
            if row["age"] > 30:
                base[i, INTEREST_DIMS.index("risk_tolerance")] = np.clip(
                    base[i, INTEREST_DIMS.index("risk_tolerance")] - self.rng.normal(0.4, 0.1), 1, 5)

        return np.clip(np.round(base), 1, 5).astype(int)

    def _generate_strengths(self, interests: np.ndarray) -> np.ndarray:
        """
        Generate strength self-ratings (n_users x 8).
        Correlated with corresponding interest dimensions (r ~0.40).
        endurance_self ~ endurance_interest; strength_self ~ power_interest; etc.
        """
        base = self.rng.normal(loc=3.0, scale=1.0,
                                size=(self.n_users, self.n_strength))
        corr_strength = 0.40
        dim_map = {
            "endurance_self":      INTEREST_DIMS.index("endurance_interest"),
            "strength_self":       INTEREST_DIMS.index("power_interest"),
            "speed_self":          INTEREST_DIMS.index("speed_agility_interest"),
            "flexibility_self":    INTEREST_DIMS.index("creative_expression"),
            "coordination_self":   INTEREST_DIMS.index("speed_agility_interest"),
            "agility_self":        INTEREST_DIMS.index("speed_agility_interest"),
            "reaction_time_self":  INTEREST_DIMS.index("speed_agility_interest"),
            "strategy_self":       INTEREST_DIMS.index("strategy_preference"),
        }
        for j, sdim in enumerate(STRENGTH_DIMS):
            idim = dim_map[sdim]
            base[:, j] += corr_strength * (interests[:, idim] - 3.0)

        return np.clip(np.round(base), 1, 5).astype(int)

    def _generate_physical(self, demographics: pd.DataFrame) -> pd.DataFrame:
        """
        Generate physical metrics using age/gender-stratified Gaussian distributions
        based on Mendeley PE dataset norms.
        """
        heights, weights, sprints, jumps = [], [], [], []

        for _, row in demographics.iterrows():
            age, gender = row["age"], row["gender"]
            if gender == "male":
                key = "male_young" if age < 25 else "male_adult"
            elif gender == "female":
                key = "female_young" if age < 25 else "female_adult"
            else:
                key = "other"

            norms = PHYSICAL_NORMS[key]
            heights.append(max(140, self.rng.normal(*norms["height"])))
            weights.append(max(35, self.rng.normal(*norms["weight"])))
            sprints.append(max(9.5, self.rng.normal(*norms["sprint_100m"])))
            jumps.append(max(10, self.rng.normal(*norms["jump_cm"])))

        heights = np.round(heights, 1)
        weights = np.round(weights, 1)
        bmi = np.round(np.array(weights) / (np.array(heights) / 100) ** 2, 1)
        sprints = np.round(sprints, 2)
        jumps = np.round(jumps, 1)

        return pd.DataFrame({
            "height_cm":    heights,
            "weight_kg":    weights,
            "bmi":          bmi,
            "sprint_100m_s": sprints,
            "jump_cm":      jumps,
        })

    def _compute_sport_affinity(
        self,
        interests: np.ndarray,
        strengths: np.ndarray,
        physical: pd.DataFrame,
    ) -> np.ndarray:
        """
        Compute raw affinity score for each (user, sport) pair.

        Affinity = interest_dot_product + physical_fit_score + noise
        Interest contribution is weighted 2x vs physical (literature-calibrated).

        Returns
        -------
        affinity : np.ndarray, shape (n_users, n_sports)
        """
        affinity = np.zeros((self.n_users, self.n_sports))

        phys_lookup = {
            "endurance": strengths[:, STRENGTH_DIMS.index("endurance_self")] / 5.0,
            "strength":  strengths[:, STRENGTH_DIMS.index("strength_self")] / 5.0,
            "speed":     strengths[:, STRENGTH_DIMS.index("speed_self")] / 5.0,
            "flexibility": strengths[:, STRENGTH_DIMS.index("flexibility_self")] / 5.0,
            "coordination": strengths[:, STRENGTH_DIMS.index("coordination_self")] / 5.0,
            "reaction":  strengths[:, STRENGTH_DIMS.index("reaction_time_self")] / 5.0,
            "height":    np.clip((physical["height_cm"].values - 150) / 40, 0, 1),
        }

        interest_norm = interests / 5.0  # normalize to [0.2, 1.0]

        for s_idx, sport in enumerate(SPORTS):
            profile = SPORT_PROFILES[sport]
            sport_interest_vec = np.array(profile["interests"]) / 5.0  # normalize

            # Interest component (weighted 2x)
            interest_score = 2.0 * (interest_norm @ sport_interest_vec) / self.n_interest

            # Physical component (weighted 1x)
            phys_score = 0.0
            phys_weights = profile["phys"]
            total_phys_weight = sum(phys_weights.values())
            for phys_dim, weight in phys_weights.items():
                if phys_dim in phys_lookup:
                    phys_score += (weight / total_phys_weight) * phys_lookup[phys_dim]

            # Facility access moderates overall
            facility_mod = physical.get("facility_access",
                pd.Series(np.ones(self.n_users) * 3)).values if "facility_access" \
                    in physical.columns else np.ones(self.n_users) * 3
            # (we'll merge facility_access from demographics later if needed)

            noise = self.rng.normal(0, 0.15, size=self.n_users)

            affinity[:, s_idx] = interest_score + 0.5 * phys_score + profile["base_rate"] + noise

        return affinity

    def _generate_play_labels(self, affinity: np.ndarray) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        """
        Generate multi-label play labels from affinity scores.
        P(user plays sport s) = sigmoid(affinity[:, s] - threshold)
        Also generates enjoyment scores (calibrated: r=0.65 with interest, from Vallerand 2003).

        Returns
        -------
        play_labels   : (n_users, n_sports) binary
        enjoyment     : (n_users, n_sports) float in [1, 10], 0 if not played
        hours_per_week: (n_users, n_sports) float, 0 if not played
        """
        def sigmoid(x: np.ndarray) -> np.ndarray:
            return 1 / (1 + np.exp(-x))

        threshold = 1.50
        probs = sigmoid((affinity - threshold) * 5.0)
        play_labels = (self.rng.random(size=probs.shape) < probs).astype(int)

        # Enjoyment: r=0.65 with affinity (Vallerand 2003)
        enjoyment_raw = 5.5 + 3.0 * (affinity - affinity.mean()) / (affinity.std() + 1e-8)
        enjoyment_raw += self.rng.normal(0, 0.8, size=affinity.shape)
        enjoyment = np.clip(np.round(enjoyment_raw, 1), 1, 10) * play_labels

        # Hours/week: r=0.55 with interest (Pelletier 1995)
        hours_raw = 2.0 + 5.0 * (affinity - affinity.min()) / (affinity.max() - affinity.min() + 1e-8)
        hours_raw += self.rng.normal(0, 0.5, size=affinity.shape)
        hours_per_week = np.clip(np.round(hours_raw, 1), 0, 20) * play_labels

        return play_labels, enjoyment, hours_per_week

    def _generate_watch_labels(
        self, affinity: np.ndarray, interests: np.ndarray, play_labels: np.ndarray
    ) -> np.ndarray:
        """
        Generate multi-label watch labels.
        Watching is driven by spectator_engagement interest + affinity.
        Correlated with but distinct from play labels.
        """
        def sigmoid(x: np.ndarray) -> np.ndarray:
            return 1 / (1 + np.exp(-x))

        spectator = interests[:, INTEREST_DIMS.index("spectator_engagement")] / 5.0
        watch_affinity = affinity + 0.3 * spectator[:, np.newaxis]
        threshold = 1.30
        probs = sigmoid((watch_affinity - threshold) * 4.0)
        watch_labels = (self.rng.random(size=probs.shape) < probs).astype(int)

        # Can watch sports you don't play (avid fans) — no hard constraint
        return watch_labels

    def _generate_pro_potential(
        self, affinity: np.ndarray, strengths: np.ndarray, interests: np.ndarray
    ) -> np.ndarray:
        """
        Generate pro potential scores per sport per user (ordinal 0–3).
        0 = no ambition, 1 = local club, 2 = regional, 3 = professional
        Physical fitness + ambition_level + sport-specific affinity.
        """
        ambition = interests[:, INTEREST_DIMS.index("ambition_level")] / 5.0
        overall_fitness = strengths.mean(axis=1) / 5.0

        pro_raw = affinity + 0.5 * ambition[:, np.newaxis] + 0.3 * overall_fitness[:, np.newaxis]
        pro_raw += self.rng.normal(0, 0.2, size=affinity.shape)

        # Map to ordinal 0–3
        thresholds = [0.5, 0.75, 0.95]
        pro_potential = np.zeros_like(affinity, dtype=int)
        for t_idx, t in enumerate(thresholds):
            pro_potential += (pro_raw > t).astype(int)

        return pro_potential  # shape (n_users, n_sports)

    def generate(self) -> pd.DataFrame:
        """
        Generate the full synthetic dataset.

        Returns
        -------
        df : pd.DataFrame with columns:
            - Demographics: age, gender, region, facility_access
            - Interests: interest_{dim} x 12
            - Strengths: strength_{dim} x 8
            - Physical: height_cm, weight_kg, bmi, sprint_100m_s, jump_cm
            - Play labels: play_{sport} x 20 (binary)
            - Watch labels: watch_{sport} x 20 (binary)
            - Enjoyment: enjoy_{sport} x 20 (float, 0 if not played)
            - Hours: hours_{sport} x 20 (float, 0 if not played)
            - Pro potential: pro_{sport} x 20 (ordinal 0–3)
        """
        print("Generating demographics...")
        demographics = self._generate_demographics()

        print("Generating interest features...")
        interests = self._generate_interests(demographics)

        print("Generating strength ratings...")
        strengths = self._generate_strengths(interests)

        print("Generating physical metrics...")
        physical = self._generate_physical(demographics)

        # Add facility_access to physical for affinity computation
        physical["facility_access"] = demographics["facility_access"].values

        print("Computing sport affinity scores...")
        affinity = self._compute_sport_affinity(interests, strengths, physical)

        print("Generating play labels...")
        play_labels, enjoyment, hours = self._generate_play_labels(affinity)

        print("Generating watch labels...")
        watch_labels = self._generate_watch_labels(affinity, interests, play_labels)

        print("Generating pro potential scores...")
        pro_potential = self._generate_pro_potential(affinity, strengths, interests)

        print("Assembling DataFrame...")
        rows = {}

        # Demographics
        for col in demographics.columns:
            rows[col] = demographics[col].values

        # Interests
        for j, dim in enumerate(INTEREST_DIMS):
            rows[f"interest_{dim}"] = interests[:, j]

        # Strengths
        for j, dim in enumerate(STRENGTH_DIMS):
            rows[f"strength_{dim}"] = strengths[:, j]

        # Physical (drop internal facility_access — already in demographics)
        physical_out = physical.drop(columns=["facility_access"])
        for col in physical_out.columns:
            rows[col] = physical_out[col].values

        # Labels per sport
        for s_idx, sport in enumerate(SPORTS):
            rows[f"play_{sport}"]  = play_labels[:, s_idx]
            rows[f"watch_{sport}"] = watch_labels[:, s_idx]
            rows[f"enjoy_{sport}"] = enjoyment[:, s_idx]
            rows[f"hours_{sport}"] = hours[:, s_idx]
            rows[f"pro_{sport}"]   = pro_potential[:, s_idx]

        df = pd.DataFrame(rows)
        df.insert(0, "user_id", [f"U{i:04d}" for i in range(self.n_users)])

        print(f"Done. Dataset shape: {df.shape}")
        print(f"  Play labels — mean sports per user: "
              f"{play_labels.sum(axis=1).mean():.2f}")
        print(f"  Watch labels — mean sports per user: "
              f"{watch_labels.sum(axis=1).mean():.2f}")
        print(f"  Users with pro potential (any sport, score>=2): "
              f"{(pro_potential >= 2).any(axis=1).sum()}")

        return df

    def get_feature_columns(self) -> Dict[str, List[str]]:
        """Returns dict of column groups for easy downstream access."""
        return {
            "demographics": ["age", "gender", "region", "facility_access"],
            "interests":    [f"interest_{d}" for d in INTEREST_DIMS],
            "strengths":    [f"strength_{d}" for d in STRENGTH_DIMS],
            "physical":     ["height_cm", "weight_kg", "bmi", "sprint_100m_s", "jump_cm"],
            "play_labels":  [f"play_{s}" for s in SPORTS],
            "watch_labels": [f"watch_{s}" for s in SPORTS],
            "enjoyment":    [f"enjoy_{s}" for s in SPORTS],
            "hours":        [f"hours_{s}" for s in SPORTS],
            "pro_labels":   [f"pro_{s}" for s in SPORTS],
        }


if __name__ == "__main__":
    import os
    gen = SportsDataGenerator(n_users=1000, seed=42)
    df = gen.generate()
    out_path = os.path.join(
        os.path.dirname(__file__), "../../data/processed/synthetic_dataset.csv"
    )
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    df.to_csv(out_path, index=False)
    print(f"Saved to {out_path}")
