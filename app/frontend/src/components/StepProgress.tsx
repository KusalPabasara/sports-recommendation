import { Check } from 'lucide-react';

interface StepProgressProps {
  steps: string[];
  current: number;
}

export default function StepProgress({ steps, current }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  done
                    ? 'bg-indigo-600 text-white'
                    : active
                    ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <Check size={18} /> : i + 1}
              </div>
              <span
                className={`text-[11px] mt-1 whitespace-nowrap ${
                  active ? 'text-indigo-700 font-semibold' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-1 mt-[-14px] ${
                  i < current ? 'bg-indigo-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
