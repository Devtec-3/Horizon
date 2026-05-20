import { useState } from "react";
import { Search, Flame, Zap, Star } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { marketsList } from "@/data/mockData";
import { Link } from "wouter";

export default function Markets() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  // Initialize starred map from mock data
  const [starred, setStarred] = useState<Record<string, boolean>>(
    marketsList.reduce((acc, m) => ({ ...acc, [m.symbol]: m.starred }), {})
  );

  const toggleStar = (symbol: string) => {
    setStarred(prev => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  const filteredMarkets = marketsList.filter(market => {
    if (search && !market.symbol.toLowerCase().includes(search.toLowerCase()) && !market.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter === "★" && !starred[market.symbol]) return false;
    if (filter === "Gainers" && !market.positive) return false;
    if (filter === "Losers" && market.positive) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black flex flex-col pb-6">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">Markets</h1>
        <p className="text-gray-400 text-sm mt-1">Explore and trade cryptocurrencies</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 mt-2">
        <div className="bg-[#111] rounded-xl p-3 border border-[#1e1e1e]">
          <div className="flex items-center gap-1.5 mb-2 border-b border-[#1e1e1e] pb-2">
            <Flame className="text-orange-400 w-4 h-4" />
            <h3 className="text-white text-sm font-semibold">Top Gainers</h3>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">PEPE</span>
              <span className="text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">+11.76%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">FET</span>
              <span className="text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">+9.38%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">SEI</span>
              <span className="text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">+9.09%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111] rounded-xl p-3 border border-[#1e1e1e]">
          <div className="flex items-center gap-1.5 mb-2 border-b border-[#1e1e1e] pb-2">
            <Zap className="text-red-500 w-4 h-4" />
            <h3 className="text-white text-sm font-semibold">Top Losers</h3>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">AVAX</span>
              <span className="text-[#ef4444] bg-[#ef4444]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">-4.74%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">ADA</span>
              <span className="text-[#ef4444] bg-[#ef4444]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">-4.04%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-medium">LTC</span>
              <span className="text-[#ef4444] bg-[#ef4444]/10 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">-2.88%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search coin or pair..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1a1a1a] w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:border-[#00e676] transition-colors text-sm"
        />
      </div>

      <div className="flex gap-2 mx-4 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {["All", "★", "Gainers", "Losers"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-[#00e676] text-black" : "bg-[#1a1a1a] text-gray-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-4 mt-4">
        <div className="grid grid-cols-[28px_minmax(0,1fr)_80px_60px_60px] gap-2 text-gray-400 text-[11px] uppercase font-medium tracking-wider px-2 py-2 border-b border-[#2a2a2a]">
          <div></div>
          <div>Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">24h</div>
          <div></div>
        </div>
        
        <div className="flex flex-col">
          {filteredMarkets.map((market) => (
            <div key={market.symbol} className="grid grid-cols-[28px_minmax(0,1fr)_80px_60px_60px] gap-2 items-center px-2 py-3 border-b border-[#1e1e1e] hover:bg-[#111] transition-colors group">
              <button onClick={() => toggleStar(market.symbol)} className="text-gray-500 hover:text-yellow-500 transition-colors">
                <Star className={`w-4 h-4 ${starred[market.symbol] ? "fill-yellow-500 text-yellow-500" : ""}`} />
              </button>
              
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-bold">{market.symbol.slice(0,3)}</span>
                </div>
                <div className="truncate">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-bold text-sm truncate">{market.symbol}</span>
                    <span className="text-gray-500 text-[10px]">/USDT</span>
                  </div>
                  <div className="text-gray-500 text-xs truncate">{market.name}</div>
                </div>
              </div>
              
              <div className="text-white text-sm tabular-nums text-right font-medium">
                {market.price}
              </div>
              
              <div className="text-right">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums ${
                  market.positive ? "bg-[#00e676]/10 text-[#00e676]" : "bg-[#ef4444]/10 text-[#ef4444]"
                }`}>
                  {market.change}
                </span>
              </div>
              
              <div className="text-right">
                <Link href="/trade">
                  <button className="bg-[#1a1a1a] hover:bg-[#00e676] text-gray-300 hover:text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border border-[#2a2a2a] group-hover:border-transparent">
                    Trade
                  </button>
                </Link>
              </div>
            </div>
          ))}
          
          {filteredMarkets.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No markets found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
