# Interest-Driven Personalized Sports Recommendation System

> A multi-task machine learning framework that recommends sports to general users based primarily on personal interests, with secondary factors of physical strengths and abilities — across three engagement levels: **playing**, **watching**, and **professional potential**.

---

## Key Novelty

| Dimension | Existing Work | This Work |
|-----------|--------------|-----------|
| Primary signal | Physical traits (AI Sport Scout) | **Personal interests (Likert-scaled)** |
| Output levels | Single (play or pro) | **Play + Watch + Pro (multi-task)** |
| Target users | Elite athletes | **General users, students, novices** |
| Sport discovery | None | **Discovery score for unseen sports** |
| Label space | 1–5 sports | **20+ sports, multi-label** |

---

## Project Structure

```
ML research/
├── data/
│   ├── processed/
│   │   └── synthetic_dataset.csv     # Generated dataset (1000 users, 130 cols)
│   └── external/                     # Public dataset augmentations
├── notebooks/
│   ├── 01_synthetic_data_generation.ipynb   # Generate & validate dataset
│   ├── 03_experiments.ipynb                 # All models, ablation, results tables
│   └── 04_shap_analysis.ipynb              # SHAP feature attribution
├── src/
│   ├── data/
│   │   ├── synthetic_generator.py    # Literature-calibrated data generator
│   │   └── preprocessor.py          # Encoding, scaling, train/test split
│   ├── models/
│   │   ├── baselines.py             # Random, Popularity, Physical-only, Interest-only, XGBoost, RF
│   │   └── multitask_nn.py          # Multi-task neural network (play/watch/pro heads)
│   ├── features/
│   │   └── discovery_score.py       # Cosine-similarity discovery scorer
│   └── evaluation/
│       └── metrics.py               # Precision@K, Recall@K, NDCG, MAP, Discovery Rate
├── literature/
│   ├── literature_review.md         # 24 papers annotated across 6 topic areas
│   └── related_work_outline.md      # Section 2 draft for paper
├── paper/
│   └── references.bib               # BibTeX entries (24 references)
├── experiments/                     # Saved models and preprocessor
├── results/                         # Output plots and tables
├── plan.md                          # Full research plan with timeline
├── claude.md                        # Project context for AI-assisted sessions
└── requirements.txt
```

---

## Setup

```bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## Quick Start

### 1. Generate the Synthetic Dataset
```bash
python -m src.data.synthetic_generator
# → data/processed/synthetic_dataset.csv (1000 rows × 130 cols)
```

### 2. Preprocess & Split
```bash
python -m src.data.preprocessor
# → experiments/preprocessor.pkl
# → X_train (800×29), X_test (200×29)
```

### 3. Run All Experiments
```bash
# Open and run sequentially:
jupyter notebook notebooks/03_experiments.ipynb
# → results/play_results.csv
# → results/ablation_results.csv
# → results/model_comparison_play.png
```

### 4. SHAP Analysis
```bash
jupyter notebook notebooks/04_shap_analysis.ipynb
# → results/shap_group_pie.png
# → results/shap_top_features_*.png
```

---

## Dataset Schema

### Features (29 total)

| Group | Dimensions | Encoding |
|-------|-----------|---------|
| **Demographics** | age, gender, region, facility_access | Categorical/ordinal |
| **Interests** (primary) | 12 Likert dimensions (team/solo, outdoor/indoor, competition, risk, creativity, social, endurance, power, speed, spectator, ambition, strategy) | Likert 1–5 |
| **Strengths** | 8 self-rated dimensions (endurance, strength, speed, flexibility, coordination, agility, reaction, strategy) | Likert 1–5 |
| **Physical** | height_cm, weight_kg, bmi, sprint_100m_s, jump_cm | Continuous |

### Labels (per sport × 20 sports)

| Label | Type | Description |
|-------|------|-------------|
| `play_{sport}` | Binary | Does user play this sport? |
| `watch_{sport}` | Binary | Does user watch this sport? |
| `pro_{sport}` | Ordinal 0–3 | Professional potential (0=none, 3=professional) |
| `enjoy_{sport}` | Float 1–10 | Enjoyment score (0 if not played) |
| `hours_{sport}` | Float | Hours/week (0 if not played) |

### Sports Taxonomy (20)
`football_soccer`, `cricket`, `basketball`, `tennis`, `badminton`, `table_tennis`, `volleyball`, `swimming`, `athletics_track`, `cycling`, `martial_arts`, `boxing`, `gymnastics`, `archery`, `rock_climbing`, `rugby`, `weightlifting`, `esports`, `skateboarding`, `rowing`

---

## Model Architecture

### Multi-Task Neural Network
```
Input (29 features)
      │
 [FC 256] → BN → ReLU → Dropout(0.3)
      │
 [FC 128] → BN → ReLU → Dropout(0.3)
      │
 [FC  64] → BN → ReLU → Dropout(0.3)
      │
  ┌───┴───┬───────┐
  ▼       ▼       ▼
[Play]  [Watch]  [Pro]
(×20)   (×20)   (×20)
sigmoid sigmoid sigmoid

Loss: L = λ1·BCE_play + λ2·BCE_watch + λ3·BCE_pro + λ_reg·||θ||²
         λ1=1.0       λ2=0.8        λ3=0.5
```

### Discovery Score
```
Sport profiles = mean(interest_vectors of users who play each sport)
Discovery(user, sport) = cosine_similarity(user_interest, sport_profile)
                       × (1 - tried_mask)  ← zero out known sports

Final score = α·discovery + (1-α)·model_score   [α=0.4]
```

---

## Literature Calibration (Synthetic Data)

| Correlation | Literature Source | Target | Status |
|-------------|-----------------|--------|--------|
| Interest → Enjoyment | Vallerand (2003) | r ≥ 0.60 | Verified in notebook 01 |
| Interest → Hours/week | Pelletier (1995) | r ≥ 0.50 | Verified in notebook 01 |
| Interest feature AUC > Physical | Fraser-Thomas (2006) | Interests dominate | Verified in notebook 03 |
| Extraversion → team sports | Allen (2013) | Positive correlation | Verified in notebook 01 |

---

## Baselines

| ID | Model | Features |
|----|-------|---------|
| B1 | Random | — |
| B2 | Popularity | Global sport rates |
| B3 | Physical-only XGBoost | height, weight, BMI, sprint, jump |
| B4 | Interest-only XGBoost | 12 interest Likert features |
| B5 | Full XGBoost | All 29 features |
| B6 | Full Random Forest | All 29 features |
| **M1** | **Multi-task NN** | **All 29 features** |
| **M2** | **Multi-task NN + Discovery** | **All features + cosine discovery** |

---

## Evaluation Metrics

- **Precision@K**, **Recall@K**, **F1@K** — recommendation accuracy
- **NDCG@K** — ranking quality (primary metric)
- **MAP@K** — mean average precision
- **Discovery Rate@K** — fraction of top-K that are novel sports (new metric)

K ∈ {5, 10}

---

## Synthetic Data Disclaimer

This project uses synthetically generated data calibrated to published sports psychology literature. No real human participants were involved. Results represent a feasibility study of the proposed framework. A primary survey study (N=500–1000) is planned as future work.

---

## Paper Target

- **arXiv preprint**: May 2026
- **Conference**: NeurIPS/ICML Workshop or IEEE BigData 2026
- **Journal backup**: MDPI Applied Sciences

---

## Citation

If you use this code or framework, please cite:

```bibtex
@misc{kusal2026sports,
  title   = {Interest-Driven Personalized Sports Recommendation: A Multi-Task Learning Approach},
  author  = {Kusal},
  year    = {2026},
  url     = {https://github.com/[username]/sports-recommendation}
}
```

---

*Last updated: March 23, 2026*
