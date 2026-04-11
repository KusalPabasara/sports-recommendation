import { ExternalLink } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const FEATURES = [
  {
    roman: 'I',
    title: 'Interest-Driven',
    desc: 'Goes beyond physical tests — your passions, motivations, and personality shape every recommendation.',
  },
  {
    roman: 'II',
    title: 'Stacking Ensemble',
    desc: 'XGBoost + Random Forest combined via a logistic regression meta-learner. 17.4% NDCG improvement over baselines.',
  },
  {
    roman: 'III',
    title: 'Sport Discovery',
    desc: 'Cosine similarity reveals sports you never considered but would love. 85.7% novelty rate in validation.',
  },
];

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="deco-bg min-h-screen" style={{ color: 'var(--cream)' }}>

      {/* Sunburst radial glow behind hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Nav ───────────────────────────────────────────── */}
        <nav
          className="flex items-center justify-between px-8 py-5 max-w-5xl mx-auto"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        >
          <div className="flex items-center gap-3">
            {/* Small gold diamond logo mark */}
            <div
              className="w-5 h-5"
              style={{
                background: 'var(--gold)',
                transform: 'rotate(45deg)',
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(212,175,55,0.5)',
              }}
              aria-hidden="true"
            />
            <span
              className="font-display text-base tracking-widest uppercase"
              style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              SportRec
            </span>
          </div>
          <a
            href="https://github.com/KusalPabasara/sports-recommendation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-all duration-300"
            style={{ color: 'var(--pewter)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--pewter)')}
          >
            <ExternalLink size={13} /> GitHub
          </a>
        </nav>

        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center px-6 pt-20 pb-16">
          {/* Conference badge */}
          <div
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2 mb-10"
            style={{
              border: '1px solid rgba(212,175,55,0.5)',
              color: 'var(--gold)',
              background: 'rgba(212,175,55,0.06)',
            }}
          >
            <span
              className="w-3 h-3 inline-block"
              style={{ background: 'var(--gold)', transform: 'rotate(45deg)', flexShrink: 0 }}
              aria-hidden="true"
            />
            Accepted · ICDSIAI-26
          </div>

          {/* Headline */}
          <h1
            className="font-display uppercase mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
              letterSpacing: '0.12em',
              lineHeight: 1.1,
              color: 'var(--cream)',
            }}
          >
            Discover Your<br />
            <span style={{ color: 'var(--gold)', textShadow: '0 0 30px rgba(212,175,55,0.35)' }}>
              Perfect Sport
            </span>
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
            <div className="h-px w-16" style={{ background: 'var(--gold)', opacity: 0.5 }} />
            <div className="w-2 h-2" style={{ background: 'var(--gold)', transform: 'rotate(45deg)' }} />
            <div className="h-px w-16" style={{ background: 'var(--gold)', opacity: 0.5 }} />
          </div>

          <p
            className="text-base leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: 'var(--pewter)', letterSpacing: '0.03em' }}
          >
            AI-powered recommendations shaped by your personal interests, self-rated
            strengths, and physical profile — not just athletic metrics. Built on a
            stacking ensemble with a novel-sport discovery mechanism.
          </p>

          {/* Primary CTA */}
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase px-10 py-4 transition-all duration-500 cursor-pointer"
            style={{
              border: '2px solid var(--gold)',
              color: 'var(--gold)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'var(--gold)';
              el.style.color = 'var(--obsidian)';
              el.style.boxShadow = '0 0 28px rgba(212,175,55,0.45)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'transparent';
              el.style.color = 'var(--gold)';
              el.style.boxShadow = 'none';
            }}
          >
            Begin Your Profile
            <span
              className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1"
              style={{ border: '2px solid currentColor', transform: 'rotate(45deg)' }}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* ── Feature Cards ──────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <FeatureCard key={f.roman} roman={f.roman} title={f.title} desc={f.desc} />
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer
          className="text-center py-8 px-6"
          style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-2" aria-hidden="true">
            <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.3)' }} />
            <div className="w-1.5 h-1.5" style={{ background: 'var(--gold)', transform: 'rotate(45deg)', opacity: 0.5 }} />
            <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.3)' }} />
          </div>
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--pewter)' }}>
            Pabasara W.G.K. — University of Moratuwa, Dept. of CSE
          </p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ roman, title, desc }: { roman: string; title: string; desc: string }) {
  return (
    <div
      className="deco-corners p-6 transition-all duration-500 group"
      style={{
        background: 'var(--charcoal)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.7)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(212,175,55,0.12)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.2)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Roman numeral in rotated diamond */}
      <div
        className="w-10 h-10 flex items-center justify-center mb-6"
        style={{
          border: '1px solid var(--gold)',
          transform: 'rotate(45deg)',
          background: 'rgba(212,175,55,0.08)',
        }}
        aria-hidden="true"
      >
        <span
          className="font-display text-xs font-bold"
          style={{ transform: 'rotate(-45deg)', color: 'var(--gold)' }}
        >
          {roman}
        </span>
      </div>

      {/* Divider line */}
      <div className="h-px w-8 mb-4" style={{ background: 'rgba(212,175,55,0.4)' }} aria-hidden="true" />

      <h3
        className="font-display text-sm tracking-widest uppercase mb-3"
        style={{ color: 'var(--gold)' }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--pewter)' }}>
        {desc}
      </p>
    </div>
  );
}
