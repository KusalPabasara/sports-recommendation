import { useState } from 'react';
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react';
import StepProgress from '../components/StepProgress';
import LikertSlider from '../components/LikertSlider';
import {
  type UserFeatures,
  type RecommendResponse,
  DEFAULT_FEATURES,
  INTEREST_FIELDS,
  STRENGTH_FIELDS,
  getRecommendations,
} from '../lib/api';
import { SPORT_ICONS } from '../lib/sportIcons';

const STEPS = ['Interests', 'Strengths', 'Physical', 'Demographics'];

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const REGIONS = [
  { value: 'south_asia', label: 'South Asia' },
  { value: 'east_asia', label: 'East Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'americas', label: 'Americas' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
];

const SPORTS_LIST = [
  { id: 'football_soccer', name: 'Football / Soccer' },
  { id: 'cricket', name: 'Cricket' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'badminton', name: 'Badminton' },
  { id: 'table_tennis', name: 'Table Tennis' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'swimming', name: 'Swimming' },
  { id: 'athletics_track', name: 'Athletics / Track' },
  { id: 'cycling', name: 'Cycling' },
  { id: 'martial_arts', name: 'Martial Arts' },
  { id: 'boxing', name: 'Boxing' },
  { id: 'gymnastics', name: 'Gymnastics' },
  { id: 'archery', name: 'Archery' },
  { id: 'rock_climbing', name: 'Rock Climbing' },
  { id: 'rugby', name: 'Rugby' },
  { id: 'weightlifting', name: 'Weightlifting' },
  { id: 'esports', name: 'Esports' },
  { id: 'skateboarding', name: 'Skateboarding' },
  { id: 'rowing', name: 'Rowing' },
];

interface QuestionnaireProps {
  onResults: (res: RecommendResponse) => void;
  onBack: () => void;
}

export default function Questionnaire({ onResults, onBack }: QuestionnaireProps) {
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

  const stepTitles = ['Your Interests', 'Self-Rated Strengths', 'Physical Profile', 'Demographics'];
  const stepSubtitles = [
    'Rate your preferences on each dimension (I = lowest, V = highest)',
    'How would you honestly rate your own athletic abilities?',
    'Enter your approximate physical measurements',
    'Final details to personalise your results',
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
          <ArrowLeft size={13} /> Return to Home
        </button>

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
              {INTEREST_FIELDS.map((f) => (
                <LikertSlider key={f.key} label={f.label} value={features[f.key] as number} onChange={(v) => set(f.key, v)} low={f.low} high={f.high} />
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              {STRENGTH_FIELDS.map((f) => (
                <LikertSlider key={f.key} label={f.label} value={features[f.key] as number} onChange={(v) => set(f.key, v)} low="Low" high="High" />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-5">
              <NumberInput label="Age" value={features.age} onChange={(v) => set('age', v)} unit="years" />
              <NumberInput label="Height" value={features.height_cm} onChange={(v) => set('height_cm', v)} unit="cm" />
              <NumberInput label="Weight" value={features.weight_kg} onChange={(v) => set('weight_kg', v)} unit="kg" />
              <NumberInput label="100m Sprint" value={features.sprint_100m_s} onChange={(v) => set('sprint_100m_s', v)} unit="sec" />
              <NumberInput label="Standing Jump" value={features.jump_cm} onChange={(v) => set('jump_cm', v)} unit="cm" />
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--pewter)' }}>Gender</p>
              <div className="flex gap-2 mb-7">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => set('gender', g.value)}
                    className="px-4 py-2 text-xs tracking-widest uppercase cursor-pointer transition-all duration-300"
                    style={{
                      border: features.gender === g.value ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.25)',
                      color: features.gender === g.value ? 'var(--obsidian)' : 'var(--pewter)',
                      background: features.gender === g.value ? 'var(--gold)' : 'transparent',
                    }}
                  >{g.label}</button>
                ))}
              </div>

              <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--pewter)' }}>Region</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {REGIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => set('region', r.value)}
                    className="px-3 py-1.5 text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-300"
                    style={{
                      border: features.region === r.value ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.25)',
                      color: features.region === r.value ? 'var(--obsidian)' : 'var(--pewter)',
                      background: features.region === r.value ? 'var(--gold)' : 'transparent',
                    }}
                  >{r.label}</button>
                ))}
              </div>

              <LikertSlider label="Facility Access" value={features.facility_access} onChange={(v) => set('facility_access', v)} low="No access" high="Full gym" />

              <div className="mt-7">
                <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--pewter)' }}>
                  Sports already tried <span style={{ opacity: 0.5 }}>(optional)</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {SPORTS_LIST.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleTried(s.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300"
                      style={{
                        border: triedSports.includes(s.id) ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.2)',
                        color: triedSports.includes(s.id) ? 'var(--gold)' : 'rgba(212,175,55,0.35)',
                        background: triedSports.includes(s.id) ? 'rgba(212,175,55,0.1)' : 'transparent',
                      }}
                    >
                      {SPORT_ICONS[s.id]} {s.name}
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
              <ArrowLeft size={13} /> Back
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
                Continue <ArrowRight size={13} />
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
                  <><Loader2 size={13} className="animate-spin" /> Analysing</>
                ) : (
                  <><Send size={13} /> Reveal Results</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const NUMBER_CONSTRAINTS: Record<string, { min: number; max: number; step?: number }> = {
  Age:           { min: 10,  max: 80  },
  Height:        { min: 100, max: 230 },
  Weight:        { min: 30,  max: 200 },
  '100m Sprint': { min: 9,   max: 30, step: 0.1 },
  'Standing Jump': { min: 10, max: 120 },
};

function NumberInput({ label, value, onChange, unit }: { label: string; value: number; onChange: (v: number) => void; unit: string }) {
  const constraints = NUMBER_CONSTRAINTS[label] ?? { min: 0, max: 9999 };
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
          value={value}
          min={constraints.min}
          max={constraints.max}
          step={constraints.step ?? 1}
          onChange={(e) => {
            const raw = Number(e.target.value);
            const clamped = Math.min(constraints.max, Math.max(constraints.min, raw));
            onChange(isNaN(raw) ? constraints.min : clamped);
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
