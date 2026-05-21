import { useLivePrices, formatPrice } from "@/context/LivePricesContext";

export function TickerBar() {
  const { prices } = useLivePrices();
  // triple for seamless loop
  const items = [...prices, ...prices, ...prices];

  return (
    <div
      data-testid="ticker-bar"
      className="h-9 border-b border-border bg-card overflow-hidden flex items-center flex-shrink-0"
      style={{ background: "#0a0a0a" }}
    >
      <div className="ticker-track flex items-center">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-mono font-medium text-foreground whitespace-nowrap">
              {item.pair}
            </span>
            <span
              className="text-xs font-mono whitespace-nowrap font-semibold"
              style={{ color: item.positive ? "#00e676" : "#ef4444" }}
            >
              {formatPrice(item.price)}
            </span>
            <span
              className="text-[10px] font-mono whitespace-nowrap"
              style={{ color: item.positive ? "#00e676" : "#ef4444" }}
            >
              {item.positive ? "+" : ""}{item.change24h.toFixed(2)}%
            </span>
            <span className="w-px h-4 bg-border shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
