import { tickerItems } from "@/data/mockData";

export function TickerBar() {
  const triple = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      data-testid="ticker-bar"
      className="h-9 border-b border-border bg-card overflow-hidden flex items-center flex-shrink-0"
    >
      <div className="ticker-track flex items-center">
        {triple.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-mono font-medium text-foreground whitespace-nowrap">
              {item.pair}
            </span>
            <span
              className={`text-xs font-mono whitespace-nowrap ${
                item.positive ? "text-success" : "text-destructive"
              }`}
            >
              {item.price}
            </span>
            {item.positive ? (
              <span className="text-[10px] font-mono text-success">{item.changeStr}</span>
            ) : (
              <span className="text-[10px] font-mono text-destructive">{item.changeStr}</span>
            )}
            <span className="w-px h-4 bg-border shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
