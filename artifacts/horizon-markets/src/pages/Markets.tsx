import { useState } from "react";
import { Search, Flame, Zap, Star } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
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

  const toggleStar = (symbol: string) => {
    setStarred((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  const filtered = marketsList
    .filter((market) => {
      if (
        search &&
        !market.symbol.toLowerCase().includes(search.toLowerCase()) &&
        !market.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (filter === "★" && !starred[market.symbol]) return false;
      if (filter === "Gainers" && !market.positive) return false;
      if (filter === "Losers" && market.positive) return false;
      return true;
    })
    .sort((a, b) => {
      if (filter === "Gainers") {
        return parseFloat(b.change) - parseFloat(a.change);
      }
      if (filter === "Losers") {
        return parseFloat(a.change) - parseFloat(b.change);
      }
      return 0;
    });

  const tabs: FilterType[] = ["All", "★", "Gainers", "Losers"];

  return (
    <div className="min-h-screen bg-black flex flex-col pb-10" style={{ maxWidth: 430, margin: "0 auto" }}>
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="px-4 pt-6 pb-2">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>Markets</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>
          Explore and trade cryptocurrencies
        </p>
      </div>

      {/* Top Gainers / Losers mini cards */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-2">
        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <div className="flex items-center gap-1.5 mb-2 pb-2" style={{ borderBottom: "1px solid #1e1e1e" }}>
            <Flame className="text-orange-400 w-4 h-4" />
            <h3 className="text-white text-sm font-semibold">Top Gainers</h3>
          </div>
          <div className="space-y-1.5">
            {[["PEPE", "+11.76%"], ["FET", "+9.38%"], ["SEI", "+9.09%"]].map(([sym, ch]) => (
              <div key={sym} className="flex justify-between items-center">
                <span className="text-xs text-white font-medium">{sym}</span>
                <span
                  style={{
                    color: "#00e676",
                    background: "rgba(0,230,118,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {ch}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <div className="flex items-center gap-1.5 mb-2 pb-2" style={{ borderBottom: "1px solid #1e1e1e" }}>
            <Zap className="text-red-500 w-4 h-4" />
            <h3 className="text-white text-sm font-semibold">Top Losers</h3>
          </div>
          <div className="space-y-1.5">
            {[["AVAX", "-4.74%"], ["ADA", "-4.04%"], ["LTC", "-2.88%"]].map(([sym, ch]) => (
              <div key={sym} className="flex justify-between items-center">
                <span className="text-xs text-white font-medium">{sym}</span>
                <span
                  style={{
                    color: "#ef4444",
                    background: "rgba(239,68,68,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {ch}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mt-4 relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "#1a1a1a",
            width: "100%",
            paddingLeft: 40,
            paddingRight: 16,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
            border: "1px solid #2a2a2a",
            color: "#ffffff",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#00e676")}
          onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          data-testid="input-search-markets"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mx-4 mt-3">
        {tabs.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: filter === f ? 600 : 400,
              cursor: "pointer",
              background: filter === f ? "#000000" : "transparent",
              border: filter === f ? "1px solid rgba(255,255,255,0.2)" : "none",
              color: filter === f ? "#ffffff" : "#9ca3af",
              transition: "all 0.15s",
            }}
            data-testid={`filter-${f}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mx-4 mt-3 pb-6">
        <div
          className="grid gap-2 text-gray-400 px-2 py-2"
          style={{
            gridTemplateColumns: "28px 1fr 80px 60px 60px",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 500,
            borderBottom: "1px solid #2a2a2a",
          }}
        >
          <div />
          <div>Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">24h</div>
          <div />
        </div>

        <div className="flex flex-col">
          {filtered.map((market) => (
            <div
              key={market.symbol}
              className="grid gap-2 items-center px-2 py-3"
              style={{
                gridTemplateColumns: "28px 1fr 80px 60px 60px",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <button
                onClick={() => toggleStar(market.symbol)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                data-testid={`star-${market.symbol}`}
              >
                <Star
                  size={16}
                  className={starred[market.symbol] ? "fill-yellow-500 text-yellow-500" : "text-gray-500"}
                />
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #374151, #111827)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#ffffff", fontSize: 9, fontWeight: 700 }}>
                    {market.symbol.slice(0, 3)}
                  </span>
                </div>
                <div className="truncate">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-bold text-sm truncate">{market.symbol}</span>
                    <span className="text-gray-500 text-[10px]">/USDT</span>
                  </div>
                  <div className="text-gray-500 text-xs truncate">{market.name}</div>
                </div>
              </div>

              <div
                className="text-right font-medium"
                style={{ color: "#ffffff", fontSize: 13, fontVariantNumeric: "tabular-nums" }}
              >
                {market.price}
              </div>

              <div className="text-right">
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    background: market.positive
                      ? "rgba(0,230,118,0.1)"
                      : "rgba(239,68,68,0.1)",
                    color: market.positive ? "#00e676" : "#ef4444",
                  }}
                >
                  {market.change}
                </span>
              </div>

              <div className="text-right">
                <Link href="/trade">
                  <button
                    style={{
                      background: "#00e676",
                      color: "#000000",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "6px 10px",
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
            <div className="text-center py-8 text-gray-500 text-sm">
              No markets found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
