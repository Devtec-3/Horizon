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
    // Show toast only once per session
    const hasShownToast = sessionStorage.getItem("hasShownLoginToast");
    if (!hasShownToast) {
      setShowToast(true);
      sessionStorage.setItem("hasShownLoginToast", "true");
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col pb-20">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 shadow-xl flex items-start gap-3 max-w-sm"
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

      <div className="bg-gradient-to-b from-[#0a1a0f] to-black px-4 pt-6 pb-8">
        <h1 className="text-white text-2xl font-bold tracking-tight">Welcome back, {username}</h1>
        <p className="text-gray-400 text-sm mt-1">Here's the latest market overview.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <Wallet className="text-gray-400 w-5 h-5 mb-2" />
          <div className="text-gray-400 text-xs font-medium">Total Balance</div>
          <div className="text-white font-bold text-xl mt-1 tabular-nums">$0.00</div>
        </div>
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <Activity className="text-gray-400 w-5 h-5 mb-2" />
          <div className="text-gray-400 text-xs font-medium">24h Volume</div>
          <div className="text-white font-bold text-xl mt-1 tabular-nums">$558.05 B</div>
        </div>
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <TrendingUp className="text-[#00e676] w-5 h-5 mb-2" />
          <div className="text-gray-400 text-xs font-medium">Top Gainer</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white font-bold text-xl">BTC</span>
            <span className="text-[#00e676] text-xs font-medium">+442.75%</span>
          </div>
        </div>
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <TrendingDown className="text-[#ef4444] w-5 h-5 mb-2" />
          <div className="text-gray-400 text-xs font-medium">Top Loser</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white font-bold text-xl">BCH</span>
            <span className="text-[#ef4444] text-xs font-medium">-10.50%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <TickerBar />
      </div>

      <div className="px-4">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-white font-bold text-lg">Trending Assets</h2>
          <Link href="/markets" className="text-gray-400 text-sm hover:text-white transition-colors">
            View All →
          </Link>
        </div>

        {trendingAssets.map((asset) => (
          <Link href="/trade" key={asset.symbol}>
            <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e] mb-3 hover:border-[#2a2a2a] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-white font-bold">{asset.symbol}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{asset.name}</div>
                </div>
                <div
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    asset.positive
                      ? "bg-[#00e676]/10 text-[#00e676]"
                      : "bg-[#ef4444]/10 text-[#ef4444]"
                  }`}
                >
                  {asset.change}
                </div>
              </div>
              
              <div className="h-[60px] w-full -mx-2 opacity-80 group-hover:opacity-100 transition-opacity">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 mt-4 mb-8">
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#00e676] w-3.5 h-3.5" />
            <h3 className="text-white font-semibold text-sm">Top Gainers</h3>
          </div>
          <div className="space-y-0.5">
            {topGainers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
                <div className="flex items-center gap-2">
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

        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="text-[#ef4444] w-3.5 h-3.5" />
            <h3 className="text-white font-semibold text-sm">Top Losers</h3>
          </div>
          <div className="space-y-0.5">
            {topLosers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
                <div className="flex items-center gap-2">
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
