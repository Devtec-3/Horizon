import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Activity, Check, Flame, Zap, ArrowRight } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { SparklineChart } from "@/components/SparklineChart";
import { trendingAssets, topGainers, topLosers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

function CoinIcon({ symbol, size = 28 }: { symbol: string; size?: number }) {
  const [err, setErr] = useState(false);
  const colors: Record<string, string> = {
    BTC: "#F7931A", ETH: "#627EEA", BNB: "#F3BA2F", SOL: "#9945FF", XRP: "#00B4D8",
    PEPE: "#00e676", FET: "#7B61FF", SEI: "#9945FF", ARB: "#2D374B", OP: "#FF0420",
    AVAX: "#E84142", ADA: "#0033AD", LTC: "#BFBBBB", BCH: "#8DC351", ATOM: "#2E3148",
    SNX: "#00d2ff", IMX: "#17b3b3", GRT: "#6747ed", RNDR: "#F04F40", SUSHI: "#fa52a0",
  };
  const color = colors[symbol] || "#00e676";
  if (err) {
    return (
      <div
        style={{
          width: size, height: size, borderRadius: "50%",
          background: color + "33", border: `1px solid ${color}66`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, fontWeight: 800, color, flexShrink: 0,
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

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { username } = useAuth();

  useEffect(() => {
    const seen = sessionStorage.getItem("hasShownLoginToast");
    if (!seen) {
      setShowToast(true);
      sessionStorage.setItem("hasShownLoginToast", "true");
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-card border border-border rounded-xl p-4 shadow-2xl flex items-start gap-3 max-w-xs"
          >
            <div className="bg-success/10 p-1.5 rounded-full mt-0.5">
              <Check className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Welcome back, {username}!</p>
              <p className="text-muted-foreground text-xs mt-0.5">Successfully logged in.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 pb-10">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Welcome back, <span style={{ color: "#00e676" }}>{username}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's the latest market overview.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Total Balance",  value: "$0.00",      sub: "USDT equivalent",  icon: Wallet,       positive: null  },
            { label: "24h Volume",     value: "$558.05 B",  sub: "Global market",    icon: Activity,     positive: null  },
            { label: "Top Gainer",     value: "BTC",        sub: "+442.75% today",   icon: TrendingUp,   positive: true  },
            { label: "Top Loser",      value: "BCH",        sub: "-10.50% today",    icon: TrendingDown, positive: false },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-card border border-border rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${card.positive === true ? "text-success" : card.positive === false ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className="text-muted-foreground text-xs font-medium">{card.label}</span>
                </div>
                <div className="text-foreground font-bold text-lg sm:text-xl font-mono">{card.value}</div>
                <div className={`text-xs mt-1 font-mono ${card.positive === true ? "text-success" : card.positive === false ? "text-destructive" : "text-muted-foreground"}`}>{card.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Trending assets header */}
        <div className="flex items-center justify-between">
          <h2 className="text-foreground font-semibold text-base">Trending Assets</h2>
          <Link href="/markets">
            <button className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity font-medium" style={{ color: "#00e676" }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>

        {/* Trending asset sparkline cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {trendingAssets.map((asset) => (
            <Link href="/trade" key={asset.symbol}>
              <div
                className="rounded-xl p-4 cursor-pointer transition-all"
                style={{
                  background: "#111111",
                  border: "1px solid #1e1e1e",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#00e67633"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1e1e1e"; }}
              >
                {/* Top row: icon + name + change badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CoinIcon symbol={asset.symbol} size={28} />
                    <div>
                      <div className="text-white font-bold text-sm leading-tight">{asset.symbol}</div>
                      <div className="text-gray-500 text-[10px] leading-tight truncate max-w-[80px]">{asset.name}</div>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      background: asset.positive ? "#16532d" : "#7f1d1d",
                      color: asset.positive ? "#00e676" : "#ef4444",
                    }}
                  >
                    {asset.positive ? "↗" : "↘"} {asset.change}
                  </span>
                </div>

                {/* Sparkline */}
                <div className="my-1" style={{ height: 56 }}>
                  <SparklineChart
                    data={asset.sparkData}
                    color={asset.positive ? "#00e676" : "#ef4444"}
                    height={56}
                  />
                </div>

                {/* Bottom row: price + volume */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white font-bold text-sm font-mono">{asset.price}</span>
                  <span className="text-gray-500 text-[10px] font-mono">Vol: {asset.volume}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Gainers & Losers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Top Gainers */}
          <div
            className="rounded-[14px] p-4"
            style={{ background: "#111111", border: "1px solid #1e1e1e", borderLeft: "3px solid #00e676" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className="text-white font-bold" style={{ fontSize: 15 }}>Top Gainers (24h)</h3>
            </div>
            {topGainers.map((coin, idx) => (
              <div key={coin.symbol} className="flex items-center gap-2.5 mb-3 last:mb-0">
                <span className="text-gray-500 text-xs w-4 text-center shrink-0">{idx + 1}</span>
                <CoinIcon symbol={coin.symbol} size={26} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">{coin.symbol}</div>
                </div>
                <span className="text-gray-400 font-mono text-xs">{coin.price}</span>
                <span
                  className="font-bold text-[11px] px-2 py-0.5 rounded shrink-0"
                  style={{ background: "#16532d", color: "#00e676" }}
                >
                  ↗ {coin.change}
                </span>
              </div>
            ))}
          </div>

          {/* Top Losers */}
          <div
            className="rounded-[14px] p-4"
            style={{ background: "#111111", border: "1px solid #1e1e1e", borderLeft: "3px solid #ef4444" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4" style={{ color: "#ef4444" }} />
              <h3 className="text-white font-bold" style={{ fontSize: 15 }}>Top Losers (24h)</h3>
            </div>
            {topLosers.map((coin, idx) => (
              <div key={coin.symbol} className="flex items-center gap-2.5 mb-3 last:mb-0">
                <span className="text-gray-500 text-xs w-4 text-center shrink-0">{idx + 1}</span>
                <CoinIcon symbol={coin.symbol} size={26} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">{coin.symbol}</div>
                </div>
                <span className="text-gray-400 font-mono text-xs">{coin.price}</span>
                <span
                  className="font-bold text-[11px] px-2 py-0.5 rounded shrink-0"
                  style={{ background: "#7f1d1d", color: "#ef4444" }}
                >
                  ↘ {coin.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
