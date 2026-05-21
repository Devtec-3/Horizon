import { useState } from "react";
import { Search, Star, Flame, Zap } from "lucide-react";
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Markets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {marketsList.length} trading pairs — live prices
          </p>
        </div>

        {/* Top mini cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-foreground font-semibold text-sm">Top Gainers (24h)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] px-4 py-2">
              {[["PEPE", "+11.76%"], ["FET", "+9.38%"], ["SEI", "+9.09%"]].map(([s, c]) => (
                <div key={s} className="flex flex-col items-center gap-0.5">
                  <span className="text-foreground font-medium text-xs">{s}</span>
                  <span className="text-success font-mono text-[11px] font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
              <Zap className="w-4 h-4 text-destructive" />
              <span className="text-foreground font-semibold text-sm">Top Losers (24h)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] px-4 py-2">
              {[["AVAX", "-4.74%"], ["ADA", "-4.04%"], ["LTC", "-2.88%"]].map(([s, c]) => (
                <div key={s} className="flex flex-col items-center gap-0.5">
                  <span className="text-foreground font-medium text-xs">{s}</span>
                  <span className="text-destructive font-mono text-[11px] font-medium">{c}</span>
                </div>
              ))}
            </div>
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
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-search-markets"
            />
          </div>

          {/* Filter tabs */}
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

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="grid items-center px-4 py-2.5 text-[11px] text-muted-foreground uppercase tracking-wider font-medium border-b border-border"
            style={{ gridTemplateColumns: "28px 2fr 1fr 90px 80px 80px" }}
          >
            <div />
            <div>Name</div>
            <div className="text-right">Price</div>
            <div className="text-right">24h Change</div>
            <div className="text-right hidden sm:block">Volume</div>
            <div />
          </div>

          {/* Rows */}
          {filtered.map((market) => (
            <div
              key={market.symbol}
              className="grid items-center px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors group"
              style={{ gridTemplateColumns: "28px 2fr 1fr 90px 80px 80px" }}
            >
              {/* Star */}
              <button
                onClick={() => toggleStar(market.symbol)}
                className="text-muted-foreground hover:text-yellow-500 transition-colors"
                data-testid={`star-${market.symbol}`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${starred[market.symbol] ? "fill-yellow-500 text-yellow-500" : ""}`}
                />
              </button>

              {/* Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                  <span className="text-foreground text-[9px] font-bold">{market.symbol.slice(0,3)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-foreground font-semibold text-sm">{market.symbol}</span>
                    <span className="text-muted-foreground text-[10px]">/USDT</span>
                  </div>
                  <div className="text-muted-foreground text-xs truncate">{market.name}</div>
                </div>
              </div>

              {/* Price */}
              <div className="text-foreground font-mono text-sm font-medium text-right">{market.price}</div>

              {/* Change */}
              <div className="text-right">
                <span className={`inline-flex items-center gap-0.5 font-mono text-xs font-medium ${market.positive ? "text-success" : "text-destructive"}`}>
                  {market.change}
                </span>
              </div>

              {/* Volume */}
              <div className="text-muted-foreground font-mono text-xs text-right hidden sm:block">
                {market.volume}
              </div>

              {/* Trade button */}
              <div className="text-right">
                <Link href="/trade">
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100"
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
