import { useState } from "react";
import { Search, Flame, Zap } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { marketsList } from "@/data/mockData";
import { Link } from "wouter";

type FilterType = "All" | "★" | "Gainers" | "Losers";

function CoinIcon({ symbol, size = 30 }: { symbol: string; size?: number }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        style={{
          width: size, height: size, borderRadius: "50%",
          backgroundColor: "#ffffff11", border: "1px solid #ffffff22",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, fontWeight: 800, color: "white", flexShrink: 0,
        }}
      >
        {symbol.slice(0, 3)}
      </div>
    );
  }
  return (
    <img
      src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
      width={size}
      height={size}
      alt={symbol}
      style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0 }}
      onError={() => setErr(true)}
    />
  );
}

const GAINERS = [
  { symbol: "PEPE", price: "$0",    change: "+11.76%" },
  { symbol: "FET",  price: "$2.1",  change: "+9.38%"  },
  { symbol: "SEI",  price: "$0.48", change: "+9.09%"  },
];

const LOSERS = [
  { symbol: "AVAX", price: "$42.2", change: "-4.74%" },
  { symbol: "ADA",  price: "$0.95", change: "-4.04%" },
  { symbol: "LTC",  price: "$108",  change: "-2.88%" },
];

export default function Markets() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [starred, setStarred] = useState<Record<string, boolean>>(
    marketsList.reduce((acc, m) => ({ ...acc, [m.symbol]: m.starred }), {})
  );

  const toggleStar = (sym: string) => setStarred((p) => ({ ...p, [sym]: !p[sym] }));

  const filtered = marketsList
    .filter((m) => {
      if (search && !m.symbol.toLowerCase().includes(search.toLowerCase()) && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "★" && !starred[m.symbol]) return false;
      if (filter === "Gainers" && !m.positive) return false;
      if (filter === "Losers" && m.positive) return false;
      return true;
    })
    .sort((a, b) => {
      if (filter === "Gainers") return parseFloat(b.change) - parseFloat(a.change);
      if (filter === "Losers") return parseFloat(a.change) - parseFloat(b.change);
      return 0;
    });

  const tabs: FilterType[] = ["All", "★", "Gainers", "Losers"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 pb-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Markets</h1>
          <p className="text-muted-foreground text-sm mt-1">Explore and trade cryptocurrencies</p>
        </div>

        {/* Top Gainers & Losers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Top Gainers */}
          <div style={{ background: "#111111", borderRadius: 14, padding: 16, border: "1px solid #1e1e1e", borderLeft: "3px solid #00e676" }}>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-white font-bold" style={{ fontSize: 15 }}>Top Gainers</span>
            </div>
            {GAINERS.map((coin, idx) => (
              <div key={coin.symbol} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#6b7280", fontSize: 11, width: 14, textAlign: "center", flexShrink: 0 }}>{idx + 1}</span>
                <CoinIcon symbol={coin.symbol} size={26} />
                <span style={{ color: "white", fontWeight: 700, fontSize: 14, flex: 1 }}>{coin.symbol}</span>
                <span style={{ color: "#9ca3af", fontSize: 12, fontFamily: "monospace" }}>{coin.price}</span>
                <span style={{ background: "#16532d", color: "#00e676", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>
                  ↗ {coin.change}
                </span>
              </div>
            ))}
          </div>

          {/* Top Losers */}
          <div style={{ background: "#111111", borderRadius: 14, padding: 16, border: "1px solid #1e1e1e", borderLeft: "3px solid #ef4444" }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4" style={{ color: "#ef4444" }} />
              <span className="text-white font-bold" style={{ fontSize: 15 }}>Top Losers</span>
            </div>
            {LOSERS.map((coin, idx) => (
              <div key={coin.symbol} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#6b7280", fontSize: 11, width: 14, textAlign: "center", flexShrink: 0 }}>{idx + 1}</span>
                <CoinIcon symbol={coin.symbol} size={26} />
                <span style={{ color: "white", fontWeight: 700, fontSize: 14, flex: 1 }}>{coin.symbol}</span>
                <span style={{ color: "#9ca3af", fontSize: 12, fontFamily: "monospace" }}>{coin.price}</span>
                <span style={{ background: "#7f1d1d", color: "#ef4444", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>
                  ↘ {coin.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
              style={{ borderColor: search ? "#00e676" : undefined }}
              data-testid="input-search-markets"
            />
          </div>

          <div className="flex gap-1.5">
            {tabs.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-card border border-border/60 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`filter-${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Markets table */}
        <div style={{ background: "#111111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 110px 90px 72px", padding: "8px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <div />
            <div style={{ color: "#9ca3af", fontSize: 11 }}>Name ↕</div>
            <div style={{ color: "#9ca3af", fontSize: 11, textAlign: "right" }}>Price ↕</div>
            <div style={{ color: "#9ca3af", fontSize: 11, textAlign: "right" }}>24h ↕</div>
            <div style={{ color: "#9ca3af", fontSize: 11, textAlign: "right" }}>Action</div>
          </div>

          {/* Rows */}
          {filtered.map((market) => (
            <div
              key={market.symbol}
              style={{ display: "grid", gridTemplateColumns: "28px 1fr 110px 90px 72px", padding: "10px 16px", alignItems: "center", borderBottom: "1px solid #0f0f0f" }}
            >
              {/* Star */}
              <button
                onClick={() => toggleStar(market.symbol)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }}
                data-testid={`star-${market.symbol}`}
              >
                {starred[market.symbol] ? (
                  <span style={{ color: "#eab308" }}>★</span>
                ) : (
                  <span style={{ color: "#374151" }}>☆</span>
                )}
              </button>

              {/* Coin icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CoinIcon symbol={market.symbol} size={30} />
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{market.symbol}</div>
                  <div style={{ color: "#6b7280", fontSize: 10 }}>{market.symbol}/USDT</div>
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: "white", fontFamily: "JetBrains Mono, monospace" }}>
                {market.price}
              </div>

              {/* Change with arrow icon */}
              <div style={{ textAlign: "right", fontSize: 12, fontWeight: 600, color: market.positive ? "#00e676" : "#ef4444", fontFamily: "JetBrains Mono, monospace" }}>
                {market.positive ? "↗" : "↘"} {market.change}
              </div>

              {/* Trade button */}
              <div style={{ textAlign: "right" }}>
                <Link href="/trade">
                  <button
                    style={{ background: "#00e676", color: "#000", fontWeight: 700, fontSize: 11, padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer" }}
                    data-testid={`trade-${market.symbol}`}
                  >
                    Trade
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No markets found for "{search}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
