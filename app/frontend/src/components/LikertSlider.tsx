interface LikertSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  low?: string;
  high?: string;
}

const LABELS = ['', '1', '2', '3', '4', '5'];

export default function LikertSlider({ label, value, onChange, low, high }: LikertSliderProps) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          {LABELS[value]}
        </span>
      </div>
      {(low || high) && (
        <div className="flex justify-between text-[11px] text-gray-400 mb-1">
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
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-500 bg-gray-200"
      />
    </div>
  );
}
