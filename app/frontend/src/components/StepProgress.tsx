const ROMAN = ['I', 'II', 'III', 'IV'];

interface StepProgressProps {
  steps: string[];
  current: number;
}

export default function StepProgress({ steps, current }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center" style={{ minWidth: 56 }}>
              {/* Diamond node */}
              <div
                className="w-9 h-9 flex items-center justify-center transition-all duration-500"
                style={{
                  transform: 'rotate(45deg)',
                  border: done || active ? '2px solid var(--gold)' : '1px solid rgba(212,175,55,0.3)',
                  background: done
                    ? 'var(--gold)'
                    : active
                    ? 'rgba(212,175,55,0.12)'
                    : 'transparent',
                  boxShadow: active ? '0 0 14px rgba(212,175,55,0.35)' : 'none',
                }}
              >
                <span
                  className="font-display"
                  style={{
                    transform: 'rotate(-45deg)',
                    fontSize: 11,
                    color: done ? 'var(--obsidian)' : active ? 'var(--gold)' : 'rgba(212,175,55,0.35)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {done ? '✓' : ROMAN[i]}
                </span>
              </div>
              <span
                className="text-[10px] tracking-widest uppercase mt-2 whitespace-nowrap"
                style={{
                  color: active ? 'var(--gold)' : done ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.3)',
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px mx-1 mb-5 transition-all duration-500"
                style={{
                  width: 32,
                  background: i < current ? 'var(--gold)' : 'rgba(212,175,55,0.2)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
