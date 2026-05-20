import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  badge?: {
    text: string;
    positive: boolean;
  };
}

export function StatCard({ icon, label, value, badge }: StatCardProps) {
  return (
    <div className="bg-[#111111] rounded-xl p-4 border border-[#1e1e1e] flex flex-col relative overflow-hidden group hover:border-[#2a2a2a] transition-colors" data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-between items-start">
        <div className="mb-1">{icon}</div>
        {badge && (
          <div
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              badge.positive
                ? "bg-[#00e676]/10 text-[#00e676]"
                : "bg-[#ef4444]/10 text-[#ef4444]"
            }`}
          >
            {badge.text}
          </div>
        )}
      </div>
      <div className="text-gray-400 text-xs font-medium mt-1">{label}</div>
      <div className="text-white font-bold text-2xl mt-0.5 tracking-tight tabular-nums">
        {value}
      </div>
    </div>
  );
}
