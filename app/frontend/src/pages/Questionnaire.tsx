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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to home
        </button>

        <StepProgress steps={STEPS} current={step} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Your Interests</h2>
              <p className="text-sm text-gray-400 mb-6">Rate your preferences on each dimension</p>
              {INTEREST_FIELDS.map((f) => (
                <LikertSlider
                  key={f.key}
                  label={f.label}
                  value={features[f.key] as number}
                  onChange={(v) => set(f.key, v)}
                  low={f.low}
                  high={f.high}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Self-Rated Strengths</h2>
              <p className="text-sm text-gray-400 mb-6">How would you rate yourself? (1 = Low, 5 = High)</p>
              {STRENGTH_FIELDS.map((f) => (
                <LikertSlider
                  key={f.key}
                  label={f.label}
                  value={features[f.key] as number}
                  onChange={(v) => set(f.key, v)}
                  low="Low"
                  high="High"
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Physical Profile</h2>
              <p className="text-sm text-gray-400 mb-6">Enter your approximate physical info</p>
              <div className="grid grid-cols-2 gap-4">
                <NumberInput label="Age" value={features.age} onChange={(v) => set('age', v)} unit="years" />
                <NumberInput label="Height" value={features.height_cm} onChange={(v) => set('height_cm', v)} unit="cm" />
                <NumberInput label="Weight" value={features.weight_kg} onChange={(v) => set('weight_kg', v)} unit="kg" />
                <NumberInput label="100m Sprint" value={features.sprint_100m_s} onChange={(v) => set('sprint_100m_s', v)} unit="seconds" />
                <NumberInput label="Standing Jump" value={features.jump_cm} onChange={(v) => set('jump_cm', v)} unit="cm" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Demographics & Sports History</h2>
              <p className="text-sm text-gray-400 mb-6">Final details for personalized results</p>

              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex gap-2 mb-5">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => set('gender', g.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border cursor-pointer transition ${
                      features.gender === g.value
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <div className="flex flex-wrap gap-2 mb-5">
                {REGIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => set('region', r.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm border cursor-pointer transition ${
                      features.region === r.value
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <LikertSlider
                label="Facility Access"
                value={features.facility_access}
                onChange={(v) => set('facility_access', v)}
                low="No access"
                high="Full gym"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                Sports you've already tried <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {SPORTS_LIST.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleTried(s.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
                      triedSports.includes(s.id)
                        ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {SPORT_ICONS[s.id]} {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={!canPrev}
              className={`flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition ${
                canPrev ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {canNext ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm cursor-pointer transition"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm cursor-pointer transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Get Recommendations
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
