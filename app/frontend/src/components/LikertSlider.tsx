interface LikertSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  low?: string;
  high?: string;
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];

export default function LikertSlider({ label, value, onChange, low, high }: LikertSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--pewter)', fontFamily: 'Josefin Sans, sans-serif' }}
        >
          {label}
        </span>
        <span
          className="font-display text-sm w-8 h-8 flex items-center justify-center"
          style={{
            color: 'var(--gold)',
            border: '1px solid var(--gold)',
            transform: 'rotate(45deg)',
            fontSize: '12px',
          }}
        >
          <span style={{ transform: 'rotate(-45deg)' }}>{ROMAN[value]}</span>
        </span>
      </div>
      {(low || high) && (
        <div
          className="flex justify-between text-[10px] tracking-wider uppercase mb-2"
          style={{ color: 'rgba(212,175,55,0.45)' }}
        >
          <span>{low}</span>
          <span>{high}</span>
        </div>
      )}
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
