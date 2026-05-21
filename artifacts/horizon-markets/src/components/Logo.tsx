import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} data-testid="logo">
      <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizon arc base */}
        <path
          d="M2 26 Q18 12 34 26"
          fill="#0a3d1f"
          stroke="#0a3d1f"
          strokeWidth="0"
        />
        {/* Left short bar */}
        <rect x="5" y="18" width="5" height="9" rx="1" fill="#00695c" />
        {/* Center tall bar */}
        <rect x="15" y="8" width="6" height="19" rx="1" fill="#00e676" />
        {/* Right shorter bar */}
        <rect x="26" y="14" width="5" height="13" rx="1" fill="#00695c" />
        {/* Wick on center bar */}
        <line x1="18" y1="5" x2="18" y2="8" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" />
        {/* Horizon arc stroke */}
        <path
          d="M2 27 Q18 14 34 27"
          stroke="#00e676"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="text-white font-extrabold uppercase tracking-[0.08em]"
          style={{ fontSize: 14 }}
        >
          HORIZON
        </span>
        <span
          className="font-semibold uppercase tracking-[0.2em]"
          style={{ fontSize: 8, color: "#00e676", marginTop: 1 }}
        >
          MARKETS
        </span>
      </div>
    </div>
  );
}
