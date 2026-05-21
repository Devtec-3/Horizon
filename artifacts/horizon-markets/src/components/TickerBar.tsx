import { tickerItems } from "@/data/mockData";

function CoinDot({ color }: { color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  );
}

export function TickerBar() {
  const triple = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      data-testid="ticker-bar"
      style={{
        background: "#000000",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        height: 44,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="ticker-track" style={{ display: "flex", alignItems: "center" }}>
        {triple.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              paddingLeft: 24,
              paddingRight: 24,
              flexShrink: 0,
            }}
          >
            <CoinDot color={item.color} />
            <span style={{ color: "#ffffff", fontSize: 12, fontWeight: 500 }}>
              {item.pair}
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.price}
            </span>
            <span
              style={{
                display: "inline-block",
                width: 1,
                height: 18,
                background: "#2a2a2a",
                marginLeft: 8,
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
