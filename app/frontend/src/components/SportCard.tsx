import { SPORT_ICONS } from '../lib/sportIcons';
import type { SportRecommendation } from '../lib/api';
import { Sparkles } from 'lucide-react';

interface SportCardProps {
  rec: SportRecommendation;
}

export default function SportCard({ rec }: SportCardProps) {
  const pct = Math.round(rec.score * 100);
  const icon = SPORT_ICONS[rec.sport_id] || '🏅';

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl w-10 text-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800 text-sm truncate">
            {rec.sport_name}
          </span>
          {rec.is_discovery && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <Sparkles size={10} /> NEW
            </span>
          )}
        </div>
        <div className="mt-1 w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-sm font-bold text-indigo-600 w-12 text-right shrink-0">
        {pct}%
      </span>
    </div>
  );
}
