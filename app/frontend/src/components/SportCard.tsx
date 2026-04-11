import { SPORT_ICONS } from '../lib/sportIcons';
import type { SportRecommendation } from '../lib/api';

interface SportCardProps {
  rec: SportRecommendation;
}

export default function SportCard({ rec }: SportCardProps) {
  const pct = Math.round(rec.score * 100);
  const icon = SPORT_ICONS[rec.sport_id] || '🏅';

  return (
    <div
      className="deco-corners flex items-center gap-3 p-3 transition-all duration-300 group"
      style={{
        background: 'var(--charcoal)',
        border: '1px solid rgba(212,175,55,0.25)',
      }}
    >
      {/* Rotated diamond icon container */}
      <div
        className="shrink-0 w-10 h-10 flex items-center justify-center text-xl"
        style={{
          border: '1px solid rgba(212,175,55,0.4)',
          transform: 'rotate(45deg)',
          background: 'rgba(212,175,55,0.06)',
        }}
        aria-hidden="true"
      >
        <span style={{ transform: 'rotate(-45deg)', display: 'block' }}>{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-xs tracking-widest uppercase truncate"
            style={{ color: 'var(--cream)' }}
          >
            {rec.sport_name}
          </span>
          {rec.is_discovery && (
            <span
              className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 shrink-0"
              style={{
                color: 'var(--gold)',
                border: '1px solid var(--gold)',
                background: 'rgba(212,175,55,0.1)',
              }}
            >
              NEW
            </span>
          )}
        </div>
        {/* Gold progress bar — no rounded corners */}
        <div style={{ height: 2, background: 'rgba(212,175,55,0.15)' }}>
          <div
            className="transition-all duration-700"
            style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              boxShadow: '0 0 6px rgba(212,175,55,0.4)',
            }}
          />
        </div>
      </div>

      <span
        className="font-display text-sm w-10 text-right shrink-0"
        style={{ color: 'var(--gold)' }}
      >
        {pct}%
      </span>
    </div>
  );
}
