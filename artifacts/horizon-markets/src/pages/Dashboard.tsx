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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Welcome back, <span className="text-primary">{username}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's your portfolio overview and market snapshot.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Portfolio Balance", value: "$0.00", sub: "USDT equivalent", icon: Wallet,       color: "text-muted-foreground" },
            { label: "24h Volume",        value: "$58.2B", sub: "Global market",  icon: Activity,     color: "text-muted-foreground" },
            { label: "Top Gainer",        value: "PEPE",   sub: "+11.76% today",  icon: TrendingUp,   color: "text-success" },
            { label: "Top Loser",         value: "AVAX",   sub: "-4.74% today",   icon: TrendingDown, color: "text-destructive" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-card border border-border rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                  <span className="text-muted-foreground text-xs font-medium">{card.label}</span>
                </div>
                <div className="text-foreground font-bold text-lg sm:text-xl font-mono">{card.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{card.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Trending assets + movers */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Trending */}
          <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border">
              <h2 className="text-foreground font-semibold text-sm sm:text-base">Trending Assets</h2>
              <Link href="/markets">
                <button className="flex items-center gap-1 text-primary text-xs hover:text-primary/80 transition-colors font-medium">
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-4 sm:px-5 py-2 text-muted-foreground text-[11px] uppercase tracking-wider font-medium border-b border-border">
              <div>Asset</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h</div>
              <div className="text-right">Volume</div>
            </div>

            {trendingAssets.map((asset) => (
              <Link href="/trade" key={asset.symbol}>
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center px-4 sm:px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                      style={{ backgroundColor: asset.color + "33", border: `1px solid ${asset.color}55` }}
                    >
                      <span style={{ color: asset.color }}>{asset.symbol.slice(0,1)}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-foreground font-semibold text-sm">{asset.symbol}</div>
                      <div className="text-muted-foreground text-xs truncate">{asset.name}</div>
                    </div>
                  </div>

                  <div className="text-foreground text-sm font-mono font-medium text-right">{asset.price}</div>

                  <div className="text-right">
                    <span className={`text-xs font-mono font-medium ${asset.positive ? "text-success" : "text-destructive"}`}>
                      {asset.change}
                    </span>
                  </div>

                  <div className="text-muted-foreground text-xs font-mono text-right">{asset.volume}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Gainers & Losers */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Flame className="w-4 h-4 text-orange-400" />
                <h3 className="text-foreground font-semibold text-sm">Top Gainers</h3>
              </div>
              <div>
                {topGainers.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs w-4 font-mono">{coin.rank}</span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: coin.color }} />
                      <span className="text-foreground text-xs font-medium">{coin.symbol}</span>
                      <span className="text-muted-foreground text-xs font-mono hidden sm:block">{coin.price}</span>
                    </div>
                    <span className="text-success text-xs font-mono font-medium">{coin.change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Zap className="w-4 h-4 text-destructive" />
                <h3 className="text-foreground font-semibold text-sm">Top Losers</h3>
              </div>
              <div>
                {topLosers.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs w-4 font-mono">{coin.rank}</span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: coin.color }} />
                      <span className="text-foreground text-xs font-medium">{coin.symbol}</span>
                      <span className="text-muted-foreground text-xs font-mono hidden sm:block">{coin.price}</span>
                    </div>
                    <span className="text-destructive text-xs font-mono font-medium">{coin.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini sparkline cards */}
        <div>
          <h2 className="text-foreground font-semibold text-sm mb-3">Price Charts (24h)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {trendingAssets.map((asset) => (
              <Link href="/trade" key={`spark-${asset.symbol}`}>
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="px-3 pt-3 pb-1 flex items-center justify-between">
                    <div>
                      <div className="text-foreground font-semibold text-sm">{asset.symbol}</div>
                      <div className="text-foreground font-mono font-medium text-sm">{asset.price}</div>
                    </div>
                    <span className={`text-xs font-mono font-medium ${asset.positive ? "text-success" : "text-destructive"}`}>
                      {asset.change}
                    </span>
                  </div>
                  <div className="h-14">
                    <SparklineChart data={asset.sparkData} color={asset.positive ? "#00ff88" : "#ef4444"} height={56} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
