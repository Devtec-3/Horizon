import { useState } from "react";
import { ChevronDown, AlignJustify, Clock, TrendingUp, Wallet } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { orderBookAsks, orderBookBids, recentTrades } from "@/data/mockData";

const fakeChartData = Array.from({ length: 30 }).map((_, i) => {
  const base = 97500;
  const variance = Math.sin(i / 2) * 500 + Math.cos(i / 3) * 200;
  return { time: i, price: base + variance };
});

export default function Trade() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1D");
  const [chartType, setChartType] = useState("Area");
  const [bookTab, setBookTab] = useState("Both");
  
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("97500.00");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-black flex flex-col pb-20">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="bg-[#111] rounded-xl mx-4 mt-4 p-4 flex items-center justify-between border border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">BTC</span>
          </div>
          <span className="font-bold text-white">BTC/USDT</span>
          <ChevronDown className="text-gray-400 w-4 h-4 ml-1" />
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white tabular-nums">$97,500.00</div>
        </div>
        <div className="text-[#00e676] font-medium text-sm tabular-nums">+2.58%</div>
      </div>

      <div className="bg-[#111] rounded-xl mx-4 mt-3 p-4 border border-[#1e1e1e]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-lg">
            {["1H", "4H", "1D", "1W", "1M"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  activeTab === tab ? "bg-white text-black font-medium" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {["Candle", "Line", "Area"].map((tab) => (
              <button
                key={tab}
                onClick={() => setChartType(tab)}
                className={`px-2 py-0.5 text-xs transition-colors ${
                  chartType === tab ? "text-white font-medium" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fakeChartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e676" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00e676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#00e676" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-4 mt-3">
        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Order Book</h3>
            <div className="flex gap-2">
              {["Both", "Bids", "Asks"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBookTab(tab)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    bookTab === tab ? "bg-[#1a1a1a] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-gray-400 text-xs mb-2">
            <div>Price</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          
          <div className="space-y-[1px]">
            {orderBookAsks.map((ask, i) => (
              <div key={`ask-${i}`} className="grid grid-cols-3 gap-2 text-xs tabular-nums py-0.5 relative group cursor-pointer hover:bg-[#1a1a1a]">
                <div className="absolute right-0 top-0 bottom-0 bg-[#ef4444]/10 z-0" style={{ width: `${Math.max(10, 100 - i * 10)}%` }} />
                <div className="text-[#ef4444] z-10">{ask.price}</div>
                <div className="text-white text-right z-10">{ask.amount}</div>
                <div className="text-gray-400 text-right z-10">{ask.total}</div>
              </div>
            ))}
          </div>
          
          <div className="my-2 py-1 border-y border-[#1e1e1e] text-center text-sm font-medium text-gray-400">
            Spread: $9.50
          </div>
          
          <div className="space-y-[1px]">
            {orderBookBids.map((bid, i) => (
              <div key={`bid-${i}`} className="grid grid-cols-3 gap-2 text-xs tabular-nums py-0.5 relative group cursor-pointer hover:bg-[#1a1a1a]">
                <div className="absolute right-0 top-0 bottom-0 bg-[#00e676]/10 z-0" style={{ width: `${Math.max(10, 80 - i * 15)}%` }} />
                <div className="text-[#00e676] z-10">{bid.price}</div>
                <div className="text-white text-right z-10">{bid.amount}</div>
                <div className="text-gray-400 text-right z-10">{bid.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e]">
          <h3 className="text-white font-semibold mb-3">Order</h3>
          
          <div className="grid grid-cols-2 gap-1 bg-[#1a1a1a] p-1 rounded-lg mb-4">
            <button 
              onClick={() => setSide("buy")}
              className={`py-1.5 text-sm font-bold rounded-md transition-colors ${
                side === "buy" ? "bg-[#00e676] text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Buy
            </button>
            <button 
              onClick={() => setSide("sell")}
              className={`py-1.5 text-sm font-bold rounded-md transition-colors ${
                side === "sell" ? "bg-[#ef4444] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Sell
            </button>
          </div>
          
          <div className="flex gap-4 mb-4 border-b border-[#1e1e1e] pb-2">
            <button 
              onClick={() => setOrderType("limit")}
              className={`text-sm font-medium transition-colors ${
                orderType === "limit" ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Limit
            </button>
            <button 
              onClick={() => setOrderType("market")}
              className={`text-sm font-medium transition-colors ${
                orderType === "market" ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Market
            </button>
          </div>
          
          <div className="space-y-3">
            {orderType === "limit" && (
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-gray-400 text-xs">Price (USDT)</label>
                </div>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white tabular-nums focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            )}
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-gray-400 text-xs">Amount (BTC)</label>
              </div>
              <input 
                type="text" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white tabular-nums focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((pct) => (
                <button 
                  key={pct}
                  onClick={() => setAmount(((pct / 100) * 1.5).toFixed(4))}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gray-500 rounded text-white text-xs py-1 transition-colors"
                >
                  {pct}%
                </button>
              ))}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-gray-400 text-xs">Total (USDT)</label>
              </div>
              <div className="w-full bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg px-3 py-2 text-gray-400 tabular-nums">
                {amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : "0.00"}
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-xs">Fee (0.1%)</span>
              <span className="text-gray-400 text-xs tabular-nums">
                {amount ? (parseFloat(amount) * 0.001).toFixed(4) : "0.0000"}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Wallet className="w-3 h-3" />
                <span className="text-xs">Available (USDT)</span>
              </div>
              <span className="text-white text-xs font-medium tabular-nums">0.00</span>
            </div>
            
            <button 
              className={`w-full font-bold h-12 rounded-lg transition-colors ${
                side === "buy" 
                  ? "bg-[#00e676] hover:bg-[#00c853] text-black" 
                  : "bg-[#ef4444] hover:bg-red-600 text-white"
              }`}
            >
              {side === "buy" ? "Buy BTC" : "Sell BTC"}
            </button>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl p-4 border border-[#1e1e1e] md:col-span-2">
          <h3 className="text-white font-semibold mb-3">Recent Trades</h3>
          <div className="grid grid-cols-3 gap-2 text-gray-400 text-xs mb-2 border-b border-[#1e1e1e] pb-2">
            <div>Price</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Time</div>
          </div>
          <div className="space-y-2 pt-1">
            {recentTrades.map((trade, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-xs tabular-nums">
                <div className={trade.side === "buy" ? "text-[#00e676]" : "text-[#ef4444]"}>
                  {trade.price}
                </div>
                <div className="text-white text-right">{trade.amount}</div>
                <div className="text-gray-500 text-right">{trade.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1e1e1e] flex justify-around py-3 z-20 pb-safe">
        <button className="flex flex-col items-center gap-1 text-xs text-white">
          <AlignJustify className="w-5 h-5" />
          <span>Orders</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <Clock className="w-5 h-5" />
          <span>History</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <TrendingUp className="w-5 h-5" />
          <span>Positions</span>
        </button>
      </div>
    </div>
  );
}
