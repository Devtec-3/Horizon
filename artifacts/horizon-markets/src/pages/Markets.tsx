import { useState } from "react";
import { Search, Flame, Zap } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { marketsList } from "@/data/mockData";
import { Link } from "wouter";

type FilterType = "All" | "★" | "Gainers" | "Losers";

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
          <p className="text-muted-foreground text-sm mt-1">
            {marketsList.length} trading pairs — live prices
          </p>
        </div>

        {/* Top Gainers & Losers cards — FIX 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Top Gainers */}
          <div
            style={{
              background: "#111111",
              borderRadius: 14,
              padding: 16,
              border: "1px solid #1e1e1e",
              borderLeft: "3px solid #00e676",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-white font-bold" style={{ fontSize: 15 }}>Top Gainers</span>
            </div>
            {[
              { symbol: "PEPE", price: "$0",    change: "+11.76%", color: "#00e676" },
              { symbol: "FET",  price: "$2.1",  change: "+9.38%",  color: "#7B61FF" },
              { symbol: "SEI",  price: "$0.48", change: "+9.09%",  color: "#9945FF" },
            ].map((coin) => (
              <div key={coin.symbol} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    backgroundColor: coin.color + "33",
                    border: `1px solid ${coin.color}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: coin.color, flexShrink: 0,
                  }}
                >
                  {coin.symbol.slice(0, 3)}
                </div>
                <span style={{ color: "white", fontWeight: 700, fontSize: 14, flex: 1 }}>{coin.symbol}</span>
                <span style={{ color: "#9ca3af", fontSize: 13 }}>{coin.price}</span>
                <span
                  style={{
                    background: "#16532d", color: "#00e676",
                    fontSize: 11, fontWeight: 700,
                    padding: "3px 8px", borderRadius: 6,
                  }}
                >
                  ↗ {coin.change}
                </span>
              </div>
            ))}
          </div>

          {/* Top Losers */}
          <div
            style={{
              background: "#111111",
              borderRadius: 14,
              padding: 16,
              border: "1px solid #1e1e1e",
              borderLeft: "3px solid #ef4444",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4" style={{ color: "#ef4444" }} />
              <span className="text-white font-bold" style={{ fontSize: 15 }}>Top Losers</span>
            </div>
            {[
              { symbol: "AVAX", price: "$42.2", change: "-4.74%", color: "#E84142" },
              { symbol: "ADA",  price: "$0.95", change: "-4.04%", color: "#0033AD" },
              { symbol: "LTC",  price: "$108",  change: "-2.88%", color: "#BFBBBB" },
            ].map((coin) => (
              <div key={coin.symbol} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    backgroundColor: coin.color + "33",
                    border: `1px solid ${coin.color}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: coin.color, flexShrink: 0,
                  }}
                >
                  {coin.symbol.slice(0, 3)}
                </div>
                <span style={{ color: "white", fontWeight: 700, fontSize: 14, flex: 1 }}>{coin.symbol}</span>
                <span style={{ color: "#9ca3af", fontSize: 13 }}>{coin.price}</span>
                <span
                  style={{
                    background: "#7f1d1d", color: "#ef4444",
                    fontSize: 11, fontWeight: 700,
                    padding: "3px 8px", borderRadius: 6,
                  }}
                >
                  ↘ {coin.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search coins or pairs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
              style={{ borderColor: search ? "#00e676" : undefined }}
              data-testid="input-search-markets"
            />
          </div>

          <div className="flex gap-1.5">
            {tabs.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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

        {/* Table — FIX 3: proper 5-column grid, no overlap */}
        <div style={{ background: "#111111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30px 1fr 100px 75px 75px",
              padding: "8px 16px",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
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
              style={{
                display: "grid",
                gridTemplateColumns: "30px 1fr 100px 75px 75px",
                padding: "12px 16px",
                alignItems: "center",
                borderBottom: "1px solid #0f0f0f",
              }}
            >
              {/* Cell 1: Star */}
              <button
                onClick={() => toggleStar(market.symbol)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, padding: 0, lineHeight: 1 }}
                data-testid={`star-${market.symbol}`}
              >
                {starred[market.symbol] ? (
                  <span style={{ color: "#eab308" }}>★</span>
                ) : (
                  <span style={{ color: "#4b5563" }}>☆</span>
                )}
              </button>

              {/* Cell 2: Coin icon + name ONLY — no price */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    backgroundColor: "#ffffff11",
                    border: "1px solid #ffffff22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: "white", flexShrink: 0,
                  }}
                >
                  {market.symbol.slice(0, 3)}
                </div>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{market.symbol}</div>
                  <div style={{ color: "#9ca3af", fontSize: 10 }}>{market.symbol}/USDT</div>
                </div>
              </div>

              {/* Cell 3: Price ONLY */}
              <div
                style={{
                  textAlign: "right",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {market.price}
              </div>

              {/* Cell 4: % Change ONLY */}
              <div
                style={{
                  textAlign: "right",
                  fontSize: 12,
                  fontWeight: 600,
                  color: market.positive ? "#00e676" : "#ef4444",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {market.change}
              </div>

              {/* Cell 5: Trade button */}
              <div style={{ textAlign: "right" }}>
                <Link href="/trade">
                  <button
                    style={{
                      background: "#00e676",
                      color: "#000",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "7px 10px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                    }}
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
