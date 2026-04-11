import { ArrowLeft, Trophy, Tv, Sparkles, BarChart3 } from 'lucide-react';
import SportCard from '../components/SportCard';
import type { RecommendResponse } from '../lib/api';

interface ResultsProps {
  data: RecommendResponse;
  onRestart: () => void;
}

export default function Results({ data, onRestart }: ResultsProps) {
  const importanceEntries = Object.entries(data.feature_importance).sort(
    (a, b) => b[1].percentage - a[1].percentage
  );

  const colorMap: Record<string, string> = {
    interests: 'bg-indigo-500',
    strengths: 'bg-cyan-500',
    physical: 'bg-amber-500',
    demographics: 'bg-emerald-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onRestart}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} /> Try again with different answers
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Your Personalized Recommendations
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Powered by a stacking ensemble of XGBoost + Random Forest
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Play */}
          <Section
            icon={<Trophy className="text-indigo-500" size={20} />}
            title="Top Sports to Play"
            subtitle="Based on your interests, strengths & physical profile"
            color="indigo"
          >
            <div className="space-y-2">
              {data.play_recommendations.map((r) => (
                <SportCard key={r.sport_id} rec={r} />
              ))}
            </div>
          </Section>

          {/* Watch */}
          <Section
            icon={<Tv className="text-cyan-500" size={20} />}
            title="Top Sports to Watch"
            subtitle="Sports you'd enjoy following as a spectator"
            color="cyan"
          >
            <div className="space-y-2">
              {data.watch_recommendations.map((r) => (
                <SportCard key={r.sport_id} rec={r} />
              ))}
            </div>
          </Section>
        </div>

        {/* Discovery */}
        <div className="mb-8">
          <Section
            icon={<Sparkles className="text-amber-500" size={20} />}
            title="Discover Something New"
            subtitle="Sports you haven't tried but match your interest profile (85.7% novelty rate)"
            color="amber"
          >
            <div className="grid sm:grid-cols-2 gap-2">
              {data.discovery_recommendations.map((r) => (
                <SportCard key={r.sport_id} rec={{ ...r, is_discovery: true }} />
              ))}
            </div>
          </Section>
        </div>

        {/* Feature Importance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-gray-500" size={20} />
            <h2 className="font-bold text-gray-800">What Drove Your Recommendations</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Feature group importance based on SHAP analysis from the research paper
          </p>

          {/* Stacked bar */}
          <div className="flex rounded-full overflow-hidden h-5 mb-4">
            {importanceEntries.map(([key, val]) => (
              <div
                key={key}
                className={`${colorMap[key] || 'bg-gray-400'} transition-all`}
                style={{ width: `${val.percentage}%` }}
                title={`${val.label}: ${val.percentage}%`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {importanceEntries.map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className={`w-2.5 h-2.5 rounded-full ${colorMap[key] || 'bg-gray-400'}`} />
                {val.label}: <span className="font-semibold">{val.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-8">
          <button
            onClick={onRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm cursor-pointer transition"
          >
            Try Again
          </button>
          <p className="text-[11px] text-gray-400 mt-3">
            Research by Pabasara W.G.K. — University of Moratuwa | Accepted at ICDSIAI-26
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h2 className="font-bold text-gray-800 text-base">{title}</h2>
      </div>
      <p className="text-xs text-gray-400 mb-4">{subtitle}</p>
      {children}
    </div>
  );
}
