import { ArrowLeft } from 'lucide-react';
import SportCard from '../components/SportCard';
import type { RecommendResponse } from '../lib/api';

interface ResultsProps {
  data: RecommendResponse;
  onRestart: () => void;
}

// Importance bar colours — muted gold tones to stay on-palette
const IMPORTANCE_COLORS: Record<string, string> = {
  interests:    '#D4AF37',
  strengths:    '#A0874A',
  physical:     '#C8A415',
  demographics: '#7A6128',
};

export default function Results({ data, onRestart }: ResultsProps) {
  const importanceEntries = Object.entries(data.feature_importance).sort(
    (a, b) => b[1].percentage - a[1].percentage
  );

  return (
    <div className="deco-bg min-h-screen py-10 px-4" style={{ color: 'var(--cream)' }}>
      {/* Subtle sunburst behind top */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw', height: '60vh',
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Back button */}
        <button
          onClick={onRestart}
          className="flex items-center gap-2 text-xs tracking-widest uppercase mb-8 cursor-pointer transition-all duration-300"
          style={{ color: 'var(--pewter)', background: 'none', border: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--pewter)')}
        >
          <ArrowLeft size={13} /> Retake Profile
        </button>

        {/* Page heading */}
        <div className="text-center mb-12">
          <h1
            className="font-display uppercase mb-4"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', letterSpacing: '0.14em', color: 'var(--cream)' }}
          >
            Your Recommendations
          </h1>
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <div className="h-px w-16" style={{ background: 'var(--gold)', opacity: 0.45 }} />
            <div className="w-2 h-2" style={{ background: 'var(--gold)', transform: 'rotate(45deg)' }} />
            <div className="h-px w-16" style={{ background: 'var(--gold)', opacity: 0.45 }} />
          </div>
          <p className="text-xs tracking-widest uppercase mt-4" style={{ color: 'var(--pewter)' }}>
            Stacking Ensemble · XGBoost + Random Forest · SHAP-analysed
          </p>
        </div>

        {/* Play + Watch grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <ResultSection roman="I" title="To Play" subtitle="Best sports for active participation">
            <div className="space-y-2">
              {data.play_recommendations.map((r) => <SportCard key={r.sport_id} rec={r} />)}
            </div>
          </ResultSection>

          <ResultSection roman="II" title="To Watch" subtitle="Sports you'd love as a spectator">
            <div className="space-y-2">
              {data.watch_recommendations.map((r) => <SportCard key={r.sport_id} rec={r} />)}
            </div>
          </ResultSection>
        </div>

        {/* Discovery — full width */}
        <div className="mb-5">
          <ResultSection roman="III" title="Discover" subtitle="Sports you've never tried — but should (85.7% novelty rate)">
            <div className="grid sm:grid-cols-2 gap-2">
              {data.discovery_recommendations.map((r) => (
                <SportCard key={r.sport_id} rec={{ ...r, is_discovery: true }} />
              ))}
            </div>
          </ResultSection>
        </div>

        {/* Feature Importance */}
        <div
          className="deco-corners p-6 mb-10"
          style={{
            background: 'var(--charcoal)',
            border: '1px solid rgba(212,175,55,0.25)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-6 h-6 flex items-center justify-center shrink-0"
              style={{ border: '1px solid var(--gold)', transform: 'rotate(45deg)', background: 'rgba(212,175,55,0.08)' }}
              aria-hidden="true"
            >
              <span className="font-display text-[9px]" style={{ transform: 'rotate(-45deg)', color: 'var(--gold)' }}>IV</span>
            </div>
            <h2
              className="font-display text-sm tracking-widest uppercase"
              style={{ color: 'var(--gold)' }}
            >
              What Drove Your Results
            </h2>
          </div>
          <p className="text-[10px] tracking-wide mb-5 ml-9" style={{ color: 'var(--pewter)' }}>
            Feature group importance from SHAP analysis — research paper Table V
          </p>

          {/* Segmented gold bar */}
          <div
            className="flex mb-4 overflow-hidden"
            style={{ height: 4 }}
            role="img"
            aria-label="Feature importance breakdown"
          >
            {importanceEntries.map(([key, val], i) => (
              <div
                key={key}
                style={{
                  width: `${val.percentage}%`,
                  background: IMPORTANCE_COLORS[key] || 'var(--gold)',
                  marginLeft: i > 0 ? 2 : 0,
                  boxShadow: i === 0 ? '0 0 8px rgba(212,175,55,0.5)' : 'none',
                }}
                title={`${val.label}: ${val.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {importanceEntries.map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 shrink-0"
                  style={{ background: IMPORTANCE_COLORS[key] || 'var(--gold)', transform: 'rotate(45deg)' }}
                  aria-hidden="true"
                />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--pewter)' }}>
                  {val.label}
                </span>
                <span className="text-xs font-display" style={{ color: 'var(--gold)' }}>
                  {val.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA + footer */}
        <div className="text-center pb-10">
          <button
            onClick={onRestart}
            className="text-xs tracking-widest uppercase px-10 py-4 cursor-pointer transition-all duration-500"
            style={{ border: '2px solid var(--gold)', color: 'var(--gold)', background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.color = 'var(--obsidian)';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(212,175,55,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--gold)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Retake Profile
          </button>

          <div className="flex items-center justify-center gap-3 mt-8 mb-2" aria-hidden="true">
            <div className="h-px w-10" style={{ background: 'rgba(212,175,55,0.25)' }} />
            <div className="w-1.5 h-1.5" style={{ background: 'var(--gold)', transform: 'rotate(45deg)', opacity: 0.4 }} />
            <div className="h-px w-10" style={{ background: 'rgba(212,175,55,0.25)' }} />
          </div>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(136,136,136,0.6)' }}>
            Pabasara W.G.K. · University of Moratuwa · ICDSIAI-26
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultSection({
  roman,
  title,
  subtitle,
  children,
}: {
  roman: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="deco-corners p-5"
      style={{
        background: 'var(--charcoal)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center gap-3 pb-4 mb-4"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div
          className="w-7 h-7 shrink-0 flex items-center justify-center"
          style={{
            border: '1px solid var(--gold)',
            transform: 'rotate(45deg)',
            background: 'rgba(212,175,55,0.08)',
          }}
          aria-hidden="true"
        >
          <span
            className="font-display"
            style={{ transform: 'rotate(-45deg)', color: 'var(--gold)', fontSize: 10 }}
          >
            {roman}
          </span>
        </div>
        <div>
          <h2
            className="font-display text-xs tracking-widest uppercase"
            style={{ color: 'var(--gold)' }}
          >
            {title}
          </h2>
          <p className="text-[10px] tracking-wide mt-0.5" style={{ color: 'var(--pewter)' }}>
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
