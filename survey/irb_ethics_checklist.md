# IRB / Ethics Application Checklist
## Study: Understanding Personal Interests and Sports Preferences

**Applicant**: Kusal  
**Institution**: [Your Institution]  
**Submission Target**: [Institution Ethics Committee / IRB]  
**Application Type**: Expedited Review (low-risk survey study)  
**Date Prepared**: March 23, 2026

---

## 1. Application Readiness Checklist

### Required Documents
- [ ] Research protocol summary (2–3 pages)
- [ ] Survey instrument (complete question bank) → `survey/survey_instrument.md`
- [ ] Participant Information Sheet → `survey/consent_form.md` (Part A)
- [ ] Adult consent form → `survey/consent_form.md` (Part B)
- [ ] Minor assent form → `survey/consent_form.md` (Part B)
- [ ] Parental/guardian consent form → `survey/consent_form.md` (Part B)
- [ ] Data management plan → see Section 4 below
- [ ] Researcher CV / supervisor endorsement letter
- [ ] Completed IRB application form (institution-specific)

### Pre-Submission Actions
- [ ] Get supervisor/professor to review survey and consent forms
- [ ] Pilot test survey with 5–10 volunteers (check clarity, timing)
- [ ] Identify specific schools/organizations that will distribute survey
- [ ] Confirm data storage location and access controls

---

## 2. Study Risk Classification

| Criterion | Assessment | Justification |
|-----------|-----------|---------------|
| Physical risk | **None** | Online survey only, no physical activities |
| Psychological risk | **Minimal** | Questions about interests/sports, no sensitive personal topics |
| Privacy risk | **Low** | Anonymous; no names, emails, or identifiers collected |
| Minor participants | **Present** | Ages 13–17 included → requires parental consent → expedited review |
| Vulnerable populations | **Partial** | Minors are a protected class; otherwise general population |
| Deception | **None** | Full study purpose disclosed upfront |
| Coercion | **None** | Voluntary participation; no incentives that could be coercive |

**Expected Review Category**: **Expedited** (Category 7 — survey research with no more than minimal risk)  
If the institution requires full review for minor participants, allow 4–6 weeks extra.

---

## 3. Research Protocol Summary (Draft)

### 3.1 Background & Purpose
This study aims to collect a custom dataset to train a machine learning model that recommends sports to individuals based primarily on personal interests, with secondary factors of physical strengths and abilities. No suitable public dataset combining all required features exists; primary data collection is necessary.

### 3.2 Study Design
- **Type**: Cross-sectional online survey
- **Duration**: Single session, 12–15 minutes
- **Population**: General public, school students aged 13+, adults aged 18–40
- **Recruitment**: Schools (with administrative approval), universities, online communities
- **Sample Size**: 500–1000 participants
- **Compensation**: None (voluntary)

### 3.3 Data Collection
- Platform: Google Forms or SurveyMonkey (data stored on institution-approved cloud)
- No IP addresses, cookies, or metadata collected
- Survey automatically closes at N=1000 responses
- Minor participant data only collected after parental consent code verified

### 3.4 Data Analysis
- Data used exclusively for training/evaluating ML recommendation models
- Statistical analysis: descriptive statistics, model performance metrics
- No individual-level results reported in publications

### 3.5 Dissemination
- Findings published in academic paper(s); no individual data disclosed
- Anonymized, aggregated dataset may be released on Mendeley/GitHub under CC BY 4.0

---

## 4. Data Management Plan

| Item | Detail |
|------|--------|
| **Data collected** | Interest ratings, strength ratings, optional physical stats, sports preferences |
| **Identifiers collected** | None — fully anonymous |
| **Storage location** | Encrypted Google Drive (institution-managed) or local encrypted drive |
| **Access** | Principal investigator only during active research |
| **Backup** | Weekly encrypted backup to secondary location |
| **Retention** | 5 years after publication, then securely deleted |
| **Sharing** | Anonymized aggregated data only; published as open dataset |
| **Breach protocol** | Notify institution data officer within 72 hours; no re-identification risk due to anonymous design |

---

## 5. Bias & Fairness Considerations

These must be addressed in the ethics application and in the paper:

### 5.1 Sampling Bias
- **Risk**: School-based recruitment may over-represent certain age groups, socioeconomic levels, or geographic regions.
- **Mitigation**: Multi-channel recruitment (schools + online + community clubs); stratified quotas by age and gender if feasible.

### 5.2 Gender Bias in Sports Labels
- **Risk**: Popular sports in the training data are heavily gender-skewed (e.g., football male-dominated).
- **Mitigation**: Report per-gender label distributions; use class weighting or stratified sampling; audit SHAP values by gender subgroup.

### 5.3 Cultural / Regional Bias
- **Risk**: Sports taxonomy reflects Global North / Western sports cultures.
- **Mitigation**: Include Q57 (free-text novel sports); add regional sports (kabaddi, sepak takraw); survey translated if recruiting non-English regions.

### 5.4 Self-Report Bias
- **Risk**: Self-rated strengths (Q31–Q40) may be systematically over/under-estimated.
- **Mitigation**: Anchor descriptions for each rating level; attention check questions; cross-validate with physical metric questions where possible.

### 5.5 Socioeconomic Bias
- **Risk**: Participants with greater sports access will have wider sports exposure.
- **Mitigation**: Include Q5 (facility access rating) as a covariate; report model performance stratified by access level.

---

## 6. School Recruitment Ethics Protocol

If distributing through schools, the following additional steps are required:

- [ ] Obtain written approval from school principal/administration
- [ ] Brief participating teachers on study purpose and their role
- [ ] Ensure survey is administered during optional/free periods, not class time
- [ ] Provide teachers with a FAQ document to answer student questions
- [ ] Collect all parental consent forms before any student accesses the survey
- [ ] Allow students to opt out without any academic consequence
- [ ] Do not share individual student results with teachers

---

## 7. Timeline for Ethics Process

| Step | Action | Target Date |
|------|--------|-------------|
| Week 1 | Complete all documents, supervisor review | Mar 30, 2026 |
| Week 2 | Submit IRB application | Apr 6, 2026 |
| Week 3–4 | IRB review period (expedited: 1–3 weeks) | Apr 6–20, 2026 |
| Approval | Begin data collection (Phase 3) | ~Apr 21–27, 2026 |

> **Note**: If IRB requires full board review (4–8 weeks), Phase 3 start shifts to late May 2026. This is accounted for in the risk register.

---

## 8. Fallback Plan (If School IRB Delayed)

If IRB approval for minors is delayed beyond May 2026:
- Launch adult-only (18+) version of survey immediately using expedited online review
- Remove all minor-specific questions (parental consent, age 13–17 options)
- Target adult online communities (Reddit r/sports, Discord communities, university students)
- Pursue minor participants in a follow-up study after full IRB approval

---

*v1.0 — March 23, 2026 | Submit to institution ethics committee by April 6, 2026*
