# Related Work Section — Draft Outline
## Paper: Interest-Driven Personalized Sports Recommendation System

**Target length**: 1–1.5 pages  
**Citations to include**: ~15 of the 24 reviewed papers  
**Writing date**: August 22–25, 2026

---

## Proposed Section Structure

```
2. Related Work
   2.1 Sports Talent Identification and Athlete Performance Prediction
   2.2 Recommendation Systems and Personalized Activity Suggestions
   2.3 Psychological Factors in Sports Participation
   2.4 Student and Youth Sports Engagement
   2.5 Multi-Task Learning in Recommendation
   [Transition paragraph: The Research Gap]
```

---

## 2.1 Sports Talent Identification and Athlete Performance Prediction

**Core argument**: Existing ML in sports is physical-first and elite-focused.

**Draft text**:
> Machine learning has been widely applied to predict athlete performance and identify sporting talent. Ensemble methods such as Random Forests and XGBoost have demonstrated strong predictive accuracy on physiological and biomechanical data [P01 — Nature 2025; P05 — Bunker 2019]. Systematic reviews of talent identification confirm that morphological and physiological variables dominate current models, with psychological factors receiving far less attention [P03 — Ramos 2022]. Commercial systems such as AI Sport Scout [P02] operationalize this approach by matching users to sports through battery fitness tests. While effective for elite scouting, these systems presuppose access to specialized testing infrastructure and are not applicable to general or novice users. Critically, none incorporate interest or motivation features.

**Key citations**: P01, P02, P03, P05  
**Gap to highlight**: Physical-only models have a theoretical ceiling (~60% explained variance [P20]); interests account for the remaining variance.

---

## 2.2 Recommendation Systems and Personalized Activity Suggestions

**Core argument**: Recommender system literature offers useful methods but hasn't been fully applied to sports with interest-first, multi-level, discovery-aware framing.

**Draft text**:
> Recommendation systems broadly fall into content-based, collaborative filtering, and hybrid approaches [P08 — Burke 2002]. Collaborative filtering leverages user-item interaction history [P06 — Scitepress 2017] but suffers from a cold-start problem that makes it unsuitable for novice users with no prior sports history. Deep learning-based recommenders, including neural collaborative filtering and multi-task architectures [P09 — Zhang 2019], improve expressiveness but rarely incorporate non-behavioral features such as interests or physical characteristics. Closest to our work, personalized physical activity recommendation systems have shown that tailored suggestions increase adherence by up to 23% over generic advice [P10 — Opast 2023]; however, these systems use physical metrics as the primary signal and do not model watching or professional potential, nor do they guide users toward unfamiliar sports.

**Key citations**: P06, P08, P09, P10  
**Gap to highlight**: No existing recommender system for sports is interest-first, multi-level, and discovery-aware simultaneously.

---

## 2.3 Psychological Factors in Sports Participation

**Core argument**: Psychology research validates why interests should be the primary signal — sustained engagement is interest-driven, not ability-driven.

**Draft text**:
> Sports psychology provides compelling theoretical grounding for an interest-first approach. Vallerand et al.'s dualistic model of passion [P11] shows that harmonious passion — intrinsically motivated, aligned with personal identity — predicts sustained engagement and wellbeing, while obsessive passion leads to burnout. Self-determination theory [P12 — Pelletier 1995] further establishes that intrinsic motivation, driven by interest and enjoyment rather than external rewards, is the strongest longitudinal predictor of sport continuation. Longitudinal youth studies confirm that interest and enjoyment outperform physical talent in predicting sport persistence, with mismatch between assigned sports and personal interest being a primary driver of dropout [P13 — Fraser-Thomas 2006]. Personality research additionally links trait dimensions such as openness and extraversion to sport type preference [P14 — Allen 2013], suggesting that interest-adjacent psychological features carry predictive signal. Despite this evidence, ML systems in sport have not operationalized interest features as first-class inputs.

**Key citations**: P11, P12, P13, P14  
**Gap to highlight**: Psychological literature establishes interests as primary — ML systems haven't adopted this.

---

## 2.4 Student and Youth Sports Engagement

**Core argument**: The most directly related ML work exists but is severely limited in scope.

**Draft text**:
> At the intersection of ML and youth sports, prediction of student sport preferences has been explored using decision trees and Naive Bayes classifiers on small survey samples [P15 — IARCI 2023], achieving approximately 78% accuracy in classifying a single preferred sport from a set of three to five options. However, this approach does not generalize to multi-label recommendation across a broad sports taxonomy, does not model watching or professional potential, and introduces no discovery mechanism. Participation studies at scale [P16 — Kokolakakis 2016] highlight access barriers and demographic confounders but do not construct predictive models. Qualitative evidence from physical education settings suggests that interest alignment improves participation by ~40% compared to teacher-assigned sports [P17 — Holt 2008], motivating an automated, scalable approach.

**Key citations**: P15, P16, P17  
**Gap to highlight**: Prior student-focused ML work is too narrow (single sport, small label space, no discovery, no multi-level output).

---

## 2.5 Multi-Task Learning in Recommendation

**Core argument**: Multi-task learning is the right architecture choice; we adapt it to the play/watch/pro structure.

**Draft text**:
> Multi-task learning (MTL), which trains a shared representation across related prediction objectives, has been shown to improve generalization, especially under limited data conditions [P22 — Caruana 1997]. In recommendation, MTL is particularly effective when tasks share latent user preferences [P23 — Ma et al. KDD 2018], as demonstrated by Google's Multi-gate Mixture-of-Experts (MMoE) framework for app recommendations. We adapt this paradigm to the sports domain, where playing preference, watching preference, and professional potential share a common latent interest structure but diverge in their specific feature correlates. SHAP-based feature attribution [P24 — Lundberg 2017] is used to verify that interest features dominate predictions across all three tasks.

**Key citations**: P22, P23, P24  
**Gap to highlight**: MTL has not been applied to multi-level sports recommendation.

---

## Transition Paragraph: The Research Gap

**Draft text**:
> In summary, while machine learning has been applied to athlete performance prediction, activity recommendation, and sports psychology modeling independently, no unified system (1) places personal interests as the dominant input signal, (2) simultaneously predicts sports preferences across playing, watching, and professional potential, (3) is designed for general and novice users rather than elite athletes, or (4) incorporates a discovery mechanism to surface unfamiliar sports aligned with latent interests. Table 1 summarizes these gaps relative to our contributions.

---

## Table 1 — Comparison with Related Work (for paper)

| Work | Interest-First | Multi-Level Output | Novice Users | Discovery | Multi-Label |
|------|:--------------:|:------------------:|:------------:|:---------:|:-----------:|
| AI Sport Scout [P02] | ✗ | ✗ | ✗ | ✗ | ✗ |
| Ramos et al. [P03] | ✗ | ✗ (elite) | ✗ | ✗ | ✗ |
| Opast recs [P10] | ✗ | ✗ | ✓ | ✗ | ✓ partial |
| IARCI student [P15] | ✓ partial | ✗ | ✓ | ✗ | ✗ |
| Ma et al. MTL [P23] | ✗ | ✓ partial | ✗ | ✗ | ✓ |
| **Ours** | **✓ primary** | **✓ play/watch/pro** | **✓** | **✓** | **✓** |

---

## Writing Checklist (for August 2026)
- [ ] Each subsection cites at least 3 papers
- [ ] Each subsection ends with a gap sentence pointing to our work
- [ ] Table 1 is included with 6+ comparison rows
- [ ] Transition paragraph cleanly leads into Section 3 (Methodology)
- [ ] Total length: 1–1.5 pages (double-column IEEE format ≈ 500–750 words)
- [ ] All citations in `references.bib` are verified for accuracy

---

*Created: March 23, 2026 | Write by: August 25, 2026*
