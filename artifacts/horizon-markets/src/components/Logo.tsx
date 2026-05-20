import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} data-testid="logo">
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Candlestick / Horizon abstract mark */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16"
            stroke="url(#horizon-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="14" y="10" width="4" height="12" rx="1" fill="#00e676" />
          <line x1="16" y1="8" x2="16" y2="24" stroke="#00e676" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="horizon-grad" x1="6" y1="16" x2="26" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e676" />
              <stop offset="1" stopColor="#00e676" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-lg uppercase tracking-wider">Horizon</span>
        <span className="text-[#00e676] text-[10px] uppercase tracking-[0.2em] font-medium mt-0.5">Markets</span>
      </div>
    </div>
  );
}
