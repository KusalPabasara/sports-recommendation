# Recruitment Strategy
## Study: Understanding Personal Interests and Sports Preferences

**Target Sample**: 500–1000 participants  
**Timeline**: Phase 3 (after IRB approval, ~Apr 21 – Jun 1, 2026)  
**Date Prepared**: March 23, 2026

---

## 1. Target Population & Quotas

| Group | Age Range | Target N | % of Total | Priority |
|-------|-----------|----------|------------|----------|
| School students | 13–18 | 200–300 | 30–35% | High |
| University/college students | 18–25 | 200–250 | 25–30% | High |
| Young adults (working) | 26–35 | 100–150 | 15–20% | Medium |
| Adults | 36–45 | 50–100 | 8–12% | Low |
| **Total** | **13–45** | **550–800** | **100%** | — |

### Diversity Targets
- **Gender**: Target ≥40% each for male/female; ≥5% non-binary/prefer not to say
- **Sports exposure**: Mix of active athletes (≥2 sports), casual players (1 sport), and non-players
- **Geography**: At minimum 3 different countries/regions to reduce cultural bias

---

## 2. Recruitment Channels

### 2A — School Channel (Target: 200–300 responses)

**Process**:
1. Identify 5–10 schools within reach (secondary/high schools)
2. Send formal request letter to principal/sports department head
3. Attach: study summary, consent forms, IRB approval letter
4. Arrange 15-minute classroom slot or distribute via school Google Classroom
5. Collect signed parental consent forms before students access survey

**Outreach Template (email to school principal)**:
> Subject: Research Study Request — Sports Interests Survey (15 min, voluntary)  
>  
> Dear [Principal's Name],  
>  
> I am [Name], a student/researcher at [Institution], conducting an approved academic study on sports interest prediction using machine learning. I am seeking 30–50 volunteer students from your school to complete a 15-minute anonymous survey about their sports interests and preferences.  
>  
> All data is anonymous, participation is entirely voluntary, and parental consent forms are provided. This has been reviewed and approved by [IRB/Ethics Committee].  
>  
> I would greatly appreciate 10 minutes of your time to discuss. I can be reached at [email] or [phone].  
>  
> Kind regards, [Name]

**Timeline**: Contact schools in Week 1 of Phase 3; collect responses across weeks 2–5.

---

### 2B — University / Online Communities (Target: 200–300 responses)

#### Reddit (estimated: 100–150 responses)
Target subreddits — post with IRB-approved survey link:
- r/sports (~1.5M members)
- r/learnmachinelearning (ML community, may be interested in contributing to research)
- r/soccer, r/cricket, r/basketball (sport-specific — reaches engaged fans)
- r/mildlyinteresting / r/SampleSize (dedicated survey subreddits)
- r/teenagers (for younger demographic — verify subreddit rules first)

**Post template**:
> **[Academic Survey] Help train a sports recommendation AI — 12 min, anonymous**  
>  
> Hi r/[subreddit]! I'm a researcher building an ML model that recommends sports based on personal interests (not just physical ability). I need 500+ participants for my dataset.  
>  
> 📋 Survey: [Google Forms link]  
> ⏱️ Time: ~12 minutes  
> 🔒 Anonymous: no names/emails collected  
> 🎓 IRB Approved: [Reference number]  
>  
> All sports fans, athletes, and curious non-players welcome! Thanks!

#### Discord Servers (estimated: 50–80 responses)
- Sports-specific Discord communities (football, cricket, esports, fitness)
- University Discord servers
- ML/AI communities (researchers sympathetic to data collection)

#### University Department Mailing Lists (estimated: 50–80 responses)
- Sports science departments
- Physical education faculty
- Computer science / data science student groups
- Campus sports clubs and intramural leagues

#### Personal Networks (estimated: 30–50 responses)
- WhatsApp/Telegram groups (family, friends, classmates)
- Directly share with local sports clubs

---

### 2C — Sports Clubs & Organizations (Target: 50–100 responses)

- Local sports clubs (football, cricket, badminton, swimming)
- Community fitness centers / gyms
- After-school sports programs

**Approach**: Email club coordinator with study brief; offer to present at a training session (5 min) and distribute QR code for survey.

---

## 3. Survey Distribution Tools

| Tool | Use Case | Link |
|------|----------|------|
| **Google Forms** | Primary survey platform (free, easy QR code) | forms.google.com |
| **SurveyMonkey** | Backup if Google Forms has response limits | surveymonkey.com |
| **QR Code Generator** | Physical posters for schools/clubs | qr-code-generator.com |
| **Bitly** | Short URL for posts | bit.ly |

### QR Code Poster
Create a simple A4 poster with:
- Study title
- QR code linking to survey
- "Anonymous | 12 min | No sign-up required"
- IRB approval reference
- Researcher contact

Print and distribute at: school notice boards, gym entrances, university common areas.

---

## 4. Response Quality Control

### During Collection
- Embed 2 attention check questions (see `survey_instrument.md`)
- Set minimum completion time of 4 minutes (auto-filter rush-throughs)
- Limit to 1 response per device (Google Forms setting)

### Post-Collection Filtering
Remove responses that:
- [ ] Fail both attention checks
- [ ] Complete in <4 minutes
- [ ] Select the same Likert score for every question (straight-lining)
- [ ] Leave >60% of interest/strength questions blank
- [ ] Come from duplicate IP addresses (if collected — check platform settings)

**Expected attrition**: ~10–15% of raw responses filtered → collect 600–1200 raw to net 500–1000 clean.

---

## 5. Monitoring & Progress Tracking

### Weekly Response Log Template
```
Week of [DATE]:
- New responses this week: ___
- Cumulative total: ___
- % target reached: ___%
- Active channels this week: ___
- Issues/notes: ___
```

### Target Milestones
| Week | Cumulative Target | Action if Behind |
|------|-------------------|-----------------|
| End of Week 1 | 50 responses | Boost Reddit/Discord posts |
| End of Week 2 | 150 responses | Contact 3 more schools |
| End of Week 3 | 300 responses | Add university mailing lists |
| End of Week 4 | 450 responses | Personal network push |
| End of Week 5 | 550–700 responses | Extend by 1 week if needed |

---

## 6. Incentive Strategy

This study uses **no monetary incentives** (to avoid coercion concerns with minors).

**Intrinsic motivators to emphasize in recruitment posts**:
- "Contribute to AI research"
- "Help build a sports recommendation system"
- "Your responses directly shape the model"
- "See your sports personality results" *(offer optional summary at end of survey)*

**Optional end-of-survey benefit**: Add a final page with a basic "your interest profile" summary (top 3 interest dimensions based on their responses). This adds perceived value and improves completion rates.

---

## 7. Fallback Scenarios

| Scenario | Threshold | Action |
|----------|-----------|--------|
| Total responses < 300 by end of Phase 3 | 300 | Extend collection 2 weeks; partner with additional schools |
| School IRB delayed | IRB not approved by Apr 27 | Launch adult-only survey immediately on Reddit/Discord |
| Demographic imbalance (e.g., >70% male) | Any group >70% | Targeted recruitment in under-represented channels |
| High attrition after QC (>25%) | >25% filtered | Revise attention check placement; simplify confusing questions |

---

*v1.0 — March 23, 2026 | Activate after IRB approval (~Apr 21, 2026)*
