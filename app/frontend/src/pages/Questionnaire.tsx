import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react';
import StepProgress from '../components/StepProgress';
import LikertSlider from '../components/LikertSlider';
import LangSwitcher from '../components/LangSwitcher';
import {
  type UserFeatures,
  type RecommendResponse,
  DEFAULT_FEATURES,
  getRecommendations,
} from '../lib/api';
import { SPORT_ICONS } from '../lib/sportIcons';
import { useLang } from '../lib/LangContext';


const REGIONS = ['south_asia','east_asia','europe','americas','africa','oceania'] as const;

const SPORT_IDS = ['football_soccer','cricket','basketball','tennis','badminton','table_tennis','volleyball','swimming','athletics_track','cycling','martial_arts','boxing','gymnastics','archery','rock_climbing','rugby','weightlifting','esports','skateboarding','rowing'] as const;

interface QuestionnaireProps {
  onResults: (res: RecommendResponse) => void;
  onBack: () => void;
}

export default function Questionnaire({ onResults, onBack }: QuestionnaireProps) {
  const { t } = useLang();
  const STEPS = [t.step_interests, t.step_strengths, t.step_physical, t.step_demographics];
  const [step, setStep] = useState(0);
  const [features, setFeatures] = useState<UserFeatures>({ ...DEFAULT_FEATURES });
  const [triedSports, setTriedSports] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof UserFeatures, val: number | string) =>
    setFeatures((f) => ({ ...f, [key]: val }));

  const toggleTried = (id: string) =>
    setTriedSports((t) => (t.includes(id) ? t.filter((s) => s !== id) : [...t, id]));

  const canNext = step < STEPS.length - 1;
  const canPrev = step > 0;

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getRecommendations({
        features,
        tried_sports: triedSports,
        top_k: 5,
      });
      onResults(res);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [t.step_interests, t.step_strengths, t.step_physical, t.step_demographics];
  const stepSubtitles = [
    t.step_interests_subtitle,
    t.step_strengths_subtitle,
    t.step_physical_subtitle,
    t.step_demographics_subtitle,
  ];

  return (
    <div className="deco-bg min-h-screen py-10 px-4" style={{ color: 'var(--cream)' }}>
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs tracking-widest uppercase mb-8 cursor-pointer transition-all duration-300"
          style={{ color: 'var(--pewter)', background: 'none', border: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--pewter)')}
        >
          <ArrowLeft size={13} /> {t.btn_return_home}
        </button>
        <div className="flex justify-end mb-4">
          <LangSwitcher />
        </div>

        <StepProgress steps={STEPS} current={step} />

        {/* Main card */}
        <div
          className="deco-corners p-7 md:p-10"
          style={{
            background: 'var(--charcoal)',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          {/* Section header */}
          <div
            className="pb-5 mb-7"
            style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
          >
            <h2
              className="font-display uppercase tracking-widest mb-1"
              style={{ color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: '0.18em' }}
            >
              {stepTitles[step]}
            </h2>
            <p className="text-xs tracking-wide" style={{ color: 'var(--pewter)' }}>
              {stepSubtitles[step]}
            </p>
          </div>

          {step === 0 && (
            <div>
              <LikertSlider label={t.interest_team_vs_individual} value={features.interest_team_vs_individual} onChange={(v) => set('interest_team_vs_individual', v)} low={t.interest_team_vs_individual_low} high={t.interest_team_vs_individual_high} />
              <LikertSlider label={t.interest_outdoor_preference} value={features.interest_outdoor_preference} onChange={(v) => set('interest_outdoor_preference', v)} low={t.interest_outdoor_preference_low} high={t.interest_outdoor_preference_high} />
              <LikertSlider label={t.interest_competition_drive} value={features.interest_competition_drive} onChange={(v) => set('interest_competition_drive', v)} low={t.interest_competition_drive_low} high={t.interest_competition_drive_high} />
              <LikertSlider label={t.interest_risk_tolerance} value={features.interest_risk_tolerance} onChange={(v) => set('interest_risk_tolerance', v)} low={t.interest_risk_tolerance_low} high={t.interest_risk_tolerance_high} />
              <LikertSlider label={t.interest_creative_expression} value={features.interest_creative_expression} onChange={(v) => set('interest_creative_expression', v)} low={t.interest_creative_expression_low} high={t.interest_creative_expression_high} />
              <LikertSlider label={t.interest_social_enjoyment} value={features.interest_social_enjoyment} onChange={(v) => set('interest_social_enjoyment', v)} low={t.interest_social_enjoyment_low} high={t.interest_social_enjoyment_high} />
              <LikertSlider label={t.interest_endurance_interest} value={features.interest_endurance_interest} onChange={(v) => set('interest_endurance_interest', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.interest_power_interest} value={features.interest_power_interest} onChange={(v) => set('interest_power_interest', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.interest_speed_agility_interest} value={features.interest_speed_agility_interest} onChange={(v) => set('interest_speed_agility_interest', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.interest_spectator_engagement} value={features.interest_spectator_engagement} onChange={(v) => set('interest_spectator_engagement', v)} low={t.interest_spectator_engagement_low} high={t.interest_spectator_engagement_high} />
              <LikertSlider label={t.interest_ambition_level} value={features.interest_ambition_level} onChange={(v) => set('interest_ambition_level', v)} low={t.interest_ambition_level_low} high={t.interest_ambition_level_high} />
              <LikertSlider label={t.interest_strategy_preference} value={features.interest_strategy_preference} onChange={(v) => set('interest_strategy_preference', v)} low={t.interest_strategy_preference_low} high={t.interest_strategy_preference_high} />
            </div>
          )}

          {step === 1 && (
            <div>
              <LikertSlider label={t.strength_endurance} value={features.strength_endurance_self} onChange={(v) => set('strength_endurance_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_strength} value={features.strength_strength_self} onChange={(v) => set('strength_strength_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_speed} value={features.strength_speed_self} onChange={(v) => set('strength_speed_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_flexibility} value={features.strength_flexibility_self} onChange={(v) => set('strength_flexibility_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_coordination} value={features.strength_coordination_self} onChange={(v) => set('strength_coordination_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_agility} value={features.strength_agility_self} onChange={(v) => set('strength_agility_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_reaction_time} value={features.strength_reaction_time_self} onChange={(v) => set('strength_reaction_time_self', v)} low={t.pole_low} high={t.pole_high} />
              <LikertSlider label={t.strength_strategy} value={features.strength_strategy_self} onChange={(v) => set('strength_strategy_self', v)} low={t.pole_low} high={t.pole_high} />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-5">
              <NumberInput label={t.field_age} value={features.age} onChange={(v) => set('age', v)} unit={t.field_age_unit} min={10} max={80} />
              <NumberInput label={t.field_height} value={features.height_cm} onChange={(v) => set('height_cm', v)} unit={t.field_height_unit} min={100} max={230} />
              <NumberInput label={t.field_weight} value={features.weight_kg} onChange={(v) => set('weight_kg', v)} unit={t.field_weight_unit} min={30} max={200} />
              <NumberInput label={t.field_sprint} value={features.sprint_100m_s} onChange={(v) => set('sprint_100m_s', v)} unit={t.field_sprint_unit} min={9} max={30} step={0.1} />
              <NumberInput label={t.field_jump} value={features.jump_cm} onChange={(v) => set('jump_cm', v)} unit={t.field_jump_unit} min={10} max={120} />
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--pewter)' }}>{t.label_gender}</p>
              <div className="flex gap-2 mb-7">
                {(['male','female','other'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => set('gender', g)}
                    className="px-4 py-2 text-xs tracking-widest uppercase cursor-pointer transition-all duration-300"
                    style={{
                      border: features.gender === g ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.25)',
                      color: features.gender === g ? 'var(--obsidian)' : 'var(--pewter)',
                      background: features.gender === g ? 'var(--gold)' : 'transparent',
                    }}
                  >{t[`gender_${g}` as const]}</button>
                ))}
              </div>

              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--pewter)' }}>{t.label_region}</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => set('region', r)}
                    className="px-3 py-1.5 text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-300"
                    style={{
                      border: features.region === r ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.25)',
                      color: features.region === r ? 'var(--obsidian)' : 'var(--pewter)',
                      background: features.region === r ? 'var(--gold)' : 'transparent',
                    }}
                  >{t[`region_${r}` as keyof typeof t]}</button>
                ))}
              </div>

              <LikertSlider label={t.label_facility} value={features.facility_access} onChange={(v) => set('facility_access', v)} low={t.facility_low} high={t.facility_high} />

              <div className="mt-7">
                <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--pewter)' }}>
                  {t.label_tried_sports} <span style={{ opacity: 0.5 }}>({t.tried_optional})</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {SPORT_IDS.map((id) => (
                    <button
                      key={id}
                      onClick={() => toggleTried(id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300"
                      style={{
                        border: triedSports.includes(id) ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.2)',
                        color: triedSports.includes(id) ? 'var(--gold)' : 'rgba(212,175,55,0.35)',
                        background: triedSports.includes(id) ? 'rgba(212,175,55,0.1)' : 'transparent',
                      }}
                    >
                      {SPORT_ICONS[id] && <span>{SPORT_ICONS[id]}</span>}
                      {t[`sport_${id}` as keyof typeof t]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="mt-5 text-xs tracking-wide p-3"
              style={{
                border: '1px solid rgba(255,80,80,0.4)',
                color: '#ff8080',
                background: 'rgba(255,80,80,0.06)',
              }}
            >
              {error}
            </div>
          )}

          {/* Navigation */}
          <div
            className="flex justify-between items-center mt-8 pt-7"
            style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}
          >
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={!canPrev}
              className="flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-3 cursor-pointer transition-all duration-300"
              style={{
                border: canPrev ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(212,175,55,0.1)',
                color: canPrev ? 'var(--pewter)' : 'rgba(212,175,55,0.2)',
                background: 'transparent',
                cursor: canPrev ? 'pointer' : 'not-allowed',
              }}
            >
              <ArrowLeft size={13} /> {t.btn_back}
            </button>

            {canNext ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2 text-xs tracking-widest uppercase px-7 py-3 cursor-pointer transition-all duration-500"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)', background: 'transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--obsidian)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--gold)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t.btn_continue} <ArrowRight size={13} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 text-xs tracking-widest uppercase px-7 py-3 cursor-pointer transition-all duration-500 disabled:opacity-40"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)', background: 'transparent' }}
                onMouseEnter={e => {
                  if (!loading) {
                    e.currentTarget.style.background = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--obsidian)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.4)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--gold)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {loading ? (
                  <><Loader2 size={13} className="animate-spin" /> {t.btn_analysing}</>
                ) : (
                  <><Send size={13} /> {t.btn_reveal}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, unit, min = 0, max = 9999, step = 1 }: { label: string; value: number; onChange: (v: number) => void; unit: string; min?: number; max?: number; step?: number }) {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(String(value));
  }, [value, focused]);

  return (
    <div>
      <label
        className="block text-[10px] tracking-widest uppercase mb-2"
        style={{ color: 'var(--pewter)' }}
      >
        {label}
      </label>
      <div className="relative h-12 flex items-center" style={{ borderBottom: '2px solid var(--gold)' }}>
        <input
          type="number"
          value={focused ? draft : value}
          min={min}
          max={max}
          step={step}
          onFocus={() => {
            setFocused(true);
            setDraft(String(value));
          }}
          onChange={(e) => {
            setDraft(e.target.value);
          }}
          onBlur={() => {
            setFocused(false);
            const raw = Number(draft);
            if (isNaN(raw) || draft.trim() === '') {
              onChange(min);
            } else {
              onChange(Math.min(max, Math.max(min, raw)));
            }
          }}
          className="w-full h-full outline-none text-sm pr-10"
          style={{
            background: 'transparent',
            color: 'var(--cream)',
            border: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
          }}
        />
        <span
          className="absolute right-0 text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(212,175,55,0.5)' }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}
