import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Activity, TrendingUp, TrendingDown, Check } from "lucide-react";
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
    const hasShownToast = sessionStorage.getItem("hasShownLoginToast");
    if (!hasShownToast) {
      setShowToast(true);
      sessionStorage.setItem("hasShownLoginToast", "true");
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col pb-10" style={{ maxWidth: 430, margin: "0 auto" }}>
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 shadow-xl flex items-start gap-3 max-w-xs"
          >
            <div className="bg-[#0f2a0f] p-1.5 rounded-full mt-0.5">
              <Check className="w-4 h-4 text-[#00e676]" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Welcome back!</h4>
              <p className="text-gray-400 text-sm mt-0.5">You have successfully logged in.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(180deg, #071a0e 0%, #040d07 60%, #000 100%)",
          padding: "28px 16px 32px",
        }}
      >
        <h1 style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>
          Welcome back, {username}
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6 }}>
          Here's the latest market overview.
        </p>

        {/* Stats 2x2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 24,
          }}
        >
          {/* Total Balance */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #1e1e1e",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Wallet size={18} color="#9ca3af" />
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Total Balance</span>
            </div>
            <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 20, marginTop: 10, fontVariantNumeric: "tabular-nums" }}>
              $0.00
            </div>
          </div>

          {/* 24h Volume */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #1e1e1e",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Activity size={18} color="#9ca3af" />
              <span style={{ color: "#9ca3af", fontSize: 12 }}>24h Volume</span>
            </div>
            <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 20, marginTop: 10, fontVariantNumeric: "tabular-nums" }}>
              $558.05 B
            </div>
          </div>

          {/* Top Gainer */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #1e1e1e",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp size={18} color="#00e676" />
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Top Gainer</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 10 }}>
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 20 }}>BTC</span>
              <span style={{ color: "#00e676", fontSize: 12, fontWeight: 600 }}>+442.75%</span>
            </div>
          </div>

          {/* Top Loser */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #1e1e1e",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingDown size={18} color="#ef4444" />
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Top Loser</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 10 }}>
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 20 }}>BCH</span>
              <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>-10.50%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <TickerBar />

      {/* Trending Assets */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-lg">Trending Assets</h2>
          <Link href="/markets" className="text-gray-400 text-sm hover:text-white transition-colors">
            View All →
          </Link>
        </div>

        {trendingAssets.map((asset) => (
          <Link href="/trade" key={asset.symbol}>
            <div
              style={{
                background: "#111111",
                border: "1px solid #1e1e1e",
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-white font-bold">{asset.symbol}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{asset.name}</div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: asset.positive ? "rgba(0,230,118,0.12)" : "rgba(239,68,68,0.12)",
                    color: asset.positive ? "#00e676" : "#ef4444",
                  }}
                >
                  {asset.change}
                </div>
              </div>

              {/* Sparkline — edge to edge, no padding */}
              <div style={{ margin: "0 -16px", height: 60 }}>
                <SparklineChart
                  data={asset.sparkData}
                  color={asset.positive ? "#00e676" : "#ef4444"}
                  height={60}
                />
              </div>

              <div className="flex justify-between items-end mt-2">
                <div className="text-white font-bold tabular-nums">{asset.price}</div>
                <div className="text-gray-400 text-xs">Vol: {asset.volume}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Top Gainers / Losers */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4 mb-8">
        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#00e676]" size={14} />
            <h3 className="text-white font-semibold text-sm">Top Gainers (24h)</h3>
          </div>
          <div>
            {topGainers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid #1e1e1e" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 text-xs w-4">{coin.rank}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: coin.color }} />
                  <span className="text-white text-xs font-medium">{coin.symbol}</span>
                  <span className="text-gray-400 text-xs ml-1">{coin.price}</span>
                </div>
                <span className="text-[#00e676] text-xs font-medium tabular-nums">{coin.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="text-[#ef4444]" size={14} />
            <h3 className="text-white font-semibold text-sm">Top Losers (24h)</h3>
          </div>
          <div>
            {topLosers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid #1e1e1e" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 text-xs w-4">{coin.rank}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: coin.color }} />
                  <span className="text-white text-xs font-medium">{coin.symbol}</span>
                  <span className="text-gray-400 text-xs ml-1">{coin.price}</span>
                </div>
                <span className="text-[#ef4444] text-xs font-medium tabular-nums">{coin.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
