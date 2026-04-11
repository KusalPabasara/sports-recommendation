import { Activity, Brain, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="text-indigo-600" size={24} />
          <span className="font-bold text-gray-800 text-lg">SportRec</span>
        </div>
        <a
          href="https://github.com/KusalPabasara/sports-recommendation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ExternalLink size={16} /> GitHub
        </a>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={14} /> Accepted at ICDSIAI-26
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          Discover Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            {' '}Perfect Sport
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          AI-powered recommendations based on your personal interests, self-rated strengths,
          and physical profile — not just athletic metrics. Powered by a stacking ensemble
          with a novel-sport discovery mechanism.
        </p>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base shadow-lg shadow-indigo-200 hover:shadow-xl transition-all cursor-pointer"
        >
          Get Your Recommendations <ArrowRight size={18} />
        </button>
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Brain className="text-indigo-500" size={28} />}
          title="Interest-Driven"
          desc="Goes beyond physical tests — your passions, motivations, and personality shape the recommendation."
        />
        <FeatureCard
          icon={<Activity className="text-cyan-500" size={28} />}
          title="Stacking Ensemble"
          desc="XGBoost + Random Forest combined via logistic regression meta-learner for 17.4% higher accuracy."
        />
        <FeatureCard
          icon={<Sparkles className="text-amber-500" size={28} />}
          title="Sport Discovery"
          desc="Cosine similarity finds sports you never considered but would love — 85.7% novelty rate."
        />
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-6">
        By Pabasara W.G.K. — University of Moratuwa, Dept. of CSE
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-left">
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
