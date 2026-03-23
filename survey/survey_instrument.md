# Survey Instrument — Personalized Sports Recommendation Study
## Full Question Bank for Google Forms / SurveyMonkey

**Estimated completion time**: 12–15 minutes  
**Target N**: 500–1000 participants  
**Sections**: 6 (Introduction → Demographics → Interests → Strengths → Physical → Sports Labels)

---

## Preamble (shown before Section 1)

> **Study Title**: Understanding Personal Interests and Sports Preferences  
> Thank you for participating in this research study. Your responses will help build a system that recommends sports based on what you enjoy, not just your physical ability.  
>  
> This survey takes about 12–15 minutes. All responses are **completely anonymous** — no names or identifying information are collected. You may stop at any time.  
>  
> By continuing, you confirm you have read and agree to the Participant Information Sheet provided separately.

---

## Section 1: Demographics
*(Used for bias analysis and demographic balancing — not as primary model features)*

**Q1.** What is your age?
- [ ] Under 13 *(exit survey — parental consent required)*
- [ ] 13–15
- [ ] 16–18
- [ ] 19–25
- [ ] 26–35
- [ ] 36–45
- [ ] 46 or older

**Q2.** What is your gender?
- [ ] Male
- [ ] Female
- [ ] Non-binary / gender-diverse
- [ ] Prefer not to say

**Q3.** What is your country of residence?
*(Free text — used to cluster regional sports culture bias)*

**Q4.** Which setting best describes where you grew up?
- [ ] Urban (city)
- [ ] Suburban
- [ ] Rural

**Q5.** How would you describe your access to sports facilities near you? *(1 = Very limited, 5 = Excellent)*
> Likert: 1 — 2 — 3 — 4 — 5

**Q6.** What is your current occupation/student status?
- [ ] School student (age 13–18)
- [ ] University / college student
- [ ] Working professional
- [ ] Other

---

## Section 2: Interest Profile
*(Primary features — highest weight in the model)*

> **Instructions**: Rate how much each statement describes you. There are no right or wrong answers.  
> Scale: **1 = Strongly Disagree → 5 = Strongly Agree**

### 2A — Social & Team Orientation
**Q7.** I prefer activities where I work together with a team.  
**Q8.** I enjoy the social aspect of group sports more than the competition itself.  
**Q9.** I prefer competing alone rather than relying on teammates.  
**Q10.** I enjoy being part of a community centered around a sport or activity.

### 2B — Environment & Setting
**Q11.** I prefer outdoor activities over indoor ones.  
**Q12.** I enjoy activities in natural environments (water, mountains, open fields).  
**Q13.** I find it energizing to be active in structured, indoor environments (gyms, courts).  
**Q14.** I enjoy activities that involve travel or varied locations.

### 2C — Competition & Challenge
**Q15.** I thrive under competitive pressure.  
**Q16.** I enjoy physical risk and the adrenaline that comes with it.  
**Q17.** I prefer self-improvement and personal bests over beating others.  
**Q18.** I enjoy strategic thinking and outsmarting opponents.

### 2D — Physical & Aesthetic Expression
**Q19.** I enjoy activities that involve artistic or creative expression (e.g., gymnastics, dance).  
**Q20.** I am drawn to activities that require grace, balance, and coordination.  
**Q21.** I enjoy activities where raw power and strength are key.  
**Q22.** I prefer activities focused on speed and agility.

### 2E — Spectator & Fan Engagement
**Q23.** I enjoy watching sports as much as (or more than) playing them.  
**Q24.** I follow sports news, statistics, or analysis regularly.  
**Q25.** I enjoy watching individual-athlete sports (e.g., tennis, athletics, boxing).  
**Q26.** I enjoy watching team-based sports (e.g., football, basketball, cricket).

### 2F — Ambition & Aspiration
**Q27.** I would be motivated to train seriously if I found a sport I was naturally suited to.  
**Q28.** I think I could reach a competitive or professional level in the right sport.  
**Q29.** I enjoy learning the technical details and skills of a sport.  
**Q30.** I am interested in pursuing a sport-related career (coaching, sports science, management).

---

## Section 3: Strength & Ability Self-Assessment
*(Secondary features — self-reported, not objective tests)*

> **Instructions**: Rate your self-perceived ability in each area.  
> Scale: **1 = Very Low → 5 = Very High**  
> *(Compare yourself to average people of your age and gender — not professional athletes)*

### 3A — Physical Strengths
**Q31.** Endurance (ability to sustain effort over a long time) — e.g., running, cycling  
**Q32.** Raw strength (ability to exert maximum force) — e.g., lifting, pushing  
**Q33.** Speed (ability to move quickly over short distances)  
**Q34.** Flexibility (range of motion, ability to stretch)  
**Q35.** Coordination & balance (body control, precise movement)  
**Q36.** Agility (ability to change direction quickly)

### 3B — Cognitive Strengths
**Q37.** Strategic thinking (planning moves ahead, reading the game)  
**Q38.** Reaction time (responding quickly to unexpected stimuli)  
**Q39.** Spatial awareness (tracking objects, people, and space simultaneously)  
**Q40.** Focus under pressure (maintaining performance when stakes are high)

---

## Section 4: Physical Metrics
*(Tertiary features — optional, self-reported)*

> **Instructions**: These questions are optional but help improve recommendation accuracy. Measurements should be approximate — no need to measure precisely right now.

**Q41.** What is your approximate height?
- Free text: _______ cm  *(or leave blank)*

**Q42.** What is your approximate weight?
- Free text: _______ kg  *(or leave blank)*

**Q43.** Can you estimate your 100m sprint time? *(if you've ever timed it)*
- Free text: _______ seconds  *(or leave blank)*

**Q44.** Can you estimate your standing broad jump distance? *(if known)*
- Free text: _______ cm  *(or leave blank)*

**Q45.** How many push-ups can you do without stopping?
- [ ] 0–5
- [ ] 6–15
- [ ] 16–30
- [ ] 31–50
- [ ] 50+
- [ ] I don't know

---

## Section 5: Sports Engagement Labels
*(Target labels for model training)*

> **Instructions**: The following questions ask about your current and past sports engagement.

### 5A — Sports You Currently Play / Actively Participate In

**Q46.** Which of the following sports do you currently play or participate in? *(Select all that apply)*

*(Grid of ~50 sports with checkboxes — see Sports Taxonomy below)*  
Include: **None of the above**

**Q47.** For each sport you selected in Q46, approximately how many hours per week do you participate?  
*(Grid: sport name | hours dropdown: <1 / 1–3 / 3–5 / 5–10 / 10+)*

**Q48.** For each sport you selected in Q46, how much do you enjoy it?  
*(Grid: sport name | Likert 1–10 enjoyment score)*

### 5B — Sports You Watch / Follow

**Q49.** Which of the following sports do you regularly watch or follow? *(Select all that apply)*  
*(Same grid of ~50 sports)*  
Include: **None of the above**

**Q50.** For the sports you watch, how engaged are you? *(1 = Casual viewer, 5 = Deeply engaged fan)*  
*(Grid: sport name | Likert 1–5)*

### 5C — Sports You Have Tried But Don't Currently Play

**Q51.** Which sports have you tried in the past but no longer participate in? *(Select all that apply)*  
*(Same grid — used to track exposure for discovery score)*

### 5D — Sports You've Never Tried But Are Curious About

**Q52.** Which sports have you never tried but are curious about? *(Select all that apply)*  
*(Same grid — used as ground truth for discovery score evaluation)*

### 5E — Professional / Competitive Potential (Self-Rated)

**Q53.** For any sport you currently play, how would you rate your potential to reach a competitive level?
- [ ] I play purely for fun, no competitive ambitions
- [ ] I could compete at a local/club level
- [ ] I could compete at a regional/national level
- [ ] I believe I have professional-level potential

**Q54.** If you were to pursue a sport professionally, which sport would you most likely choose?  
*(Dropdown from taxonomy — or free text "Not applicable")*

### 5F — Open Discovery

**Q55.** Have you ever been introduced to a sport you hadn't heard of before and ended up enjoying it?
- [ ] Yes
- [ ] No
- [ ] Not sure

**Q56.** If yes (Q55), how did you discover it? *(Free text)*

**Q57.** Are there any sports not listed in this survey that you play, watch, or are curious about?  
*(Free text — used to expand taxonomy)*

---

## Sports Taxonomy — Checkbox Grid (~50 sports)

| # | Sport | # | Sport | # | Sport |
|---|-------|---|-------|---|-------|
| 1 | Football (Soccer) | 18 | Gymnastics | 35 | Triathlon |
| 2 | Cricket | 19 | Archery | 36 | Weightlifting |
| 3 | Basketball | 20 | Fencing | 37 | Powerlifting |
| 4 | Tennis | 21 | Shooting | 38 | CrossFit |
| 5 | Badminton | 22 | Rowing | 39 | Yoga / Pilates |
| 6 | Table Tennis | 23 | Sailing | 40 | Dance Sport |
| 7 | Volleyball | 24 | Surfing | 41 | Esports / Gaming |
| 8 | Swimming | 25 | Skateboarding | 42 | Chess / Mind Sports |
| 9 | Athletics (Track & Field) | 26 | Rock Climbing | 43 | Ultimate Frisbee |
| 10 | Cycling | 27 | Parkour | 44 | Lacrosse |
| 11 | Karate / Taekwondo | 28 | Rugby | 45 | Kabaddi |
| 12 | Judo / Wrestling | 29 | Baseball / Softball | 46 | Sepak Takraw |
| 13 | Boxing | 30 | Golf | 47 | Pickleball |
| 14 | MMA / BJJ | 31 | Hockey (Field) | 48 | Squash |
| 15 | Football (American) | 32 | Hockey (Ice) | 49 | Water Polo |
| 16 | Handball | 33 | Equestrian | 50 | Diving |
| 17 | Skiing / Snowboarding | 34 | Skiing (Nordic) | 51 | Figure Skating |

---

## Attention Check Questions (embedded — randomly placed)
*(Used to filter low-quality responses)*

**AC1.** *(embedded in Section 2)*: "For quality control, please select '4' for this question."  
**AC2.** *(embedded in Section 3)*: "Please select 'Strongly Disagree' for this item."

Responses failing both attention checks → flagged for removal in preprocessing.

---

## Scoring Notes (for preprocessing)

| Feature Group | Questions | Encoding |
|---------------|-----------|----------|
| Interest vectors | Q7–Q30 (24 items) | Likert 1–5, normalized to [0,1] |
| Strength vectors | Q31–Q40 (10 items) | Likert 1–5, normalized to [0,1] |
| Physical metrics | Q41–Q45 | Continuous (impute missing with group median) |
| Demographics | Q1–Q6 | Categorical → ordinal / one-hot |
| Sports played (labels) | Q46 | Multi-hot binary vector (50-dim) |
| Sports watched (labels) | Q49 | Multi-hot binary vector (50-dim) |
| Enjoyment scores | Q48 | Continuous per sport |
| Pro potential | Q53–Q54 | Ordinal 0–3 |
| Discovery curiosity | Q52 | Used for discovery score ground truth |
| Tried (exposure) | Q51 | Used to filter known sports from discovery |

---

*Version 1.0 — March 23, 2026 | Review before Google Forms deployment*
