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
  const [bottomTab, setBottomTab] = useState("Orders");

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("97500.00");
  const [amount, setAmount] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    padding: "10px 12px",
    color: "#ffffff",
    fontSize: 13,
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    boxSizing: "border-box",
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col"
      style={{ maxWidth: 430, margin: "0 auto", paddingBottom: 56 }}
    >
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Pair Bar */}
      <div
        style={{
          background: "#111111",
          borderRadius: 14,
          margin: "16px 16px 0",
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #1e1e1e",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#F7931A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 8, fontWeight: 700 }}>BTC</span>
          </div>
          <span className="font-bold text-white">BTC/USDT</span>
          <ChevronDown className="text-gray-400 w-4 h-4" />
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          $97,500.00
        </div>
        <div style={{ color: "#00e676", fontWeight: 500, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
          +2.58%
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          background: "#111111",
          borderRadius: 14,
          margin: "12px 16px 0",
          padding: 16,
          border: "1px solid #1e1e1e",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-lg">
            {["1H", "4H", "1D", "1W", "1M"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "2px 8px",
                  fontSize: 11,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: activeTab === tab ? "#ffffff" : "transparent",
                  color: activeTab === tab ? "#000000" : "#9ca3af",
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
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
                style={{
                  padding: "2px 6px",
                  fontSize: 11,
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: chartType === tab ? "#ffffff" : "#9ca3af",
                  fontWeight: chartType === tab ? 600 : 400,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 192, width: "100%" }}>
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
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Book */}
      <div
        style={{
          background: "#111111",
          borderRadius: 14,
          margin: "12px 16px 0",
          padding: 16,
          border: "1px solid #1e1e1e",
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white font-semibold">Order Book</h3>
          <div className="flex gap-2">
            {["Both", "Bids", "Asks"].map((tab) => (
              <button
                key={tab}
                onClick={() => setBookTab(tab)}
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: bookTab === tab ? "#1a1a1a" : "transparent",
                  color: bookTab === tab ? "#ffffff" : "#9ca3af",
                }}
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

        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {orderBookAsks.map((ask, i) => (
            <div
              key={`ask-${i}`}
              className="grid grid-cols-3 gap-2 text-xs tabular-nums py-0.5 relative cursor-pointer"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: "rgba(239,68,68,0.1)",
                  width: `${Math.max(10, 100 - i * 10)}%`,
                  zIndex: 0,
                }}
              />
              <div style={{ color: "#ef4444", position: "relative", zIndex: 1 }}>{ask.price}</div>
              <div className="text-white text-right" style={{ position: "relative", zIndex: 1 }}>{ask.amount}</div>
              <div className="text-gray-400 text-right" style={{ position: "relative", zIndex: 1 }}>{ask.total}</div>
            </div>
          ))}
        </div>

        <div className="my-2 py-1 text-center text-sm font-medium text-gray-400" style={{ borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
          Spread: $9.50
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {orderBookBids.map((bid, i) => (
            <div
              key={`bid-${i}`}
              className="grid grid-cols-3 gap-2 text-xs tabular-nums py-0.5 relative cursor-pointer"
            >
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: "rgba(0,230,118,0.1)",
                  width: `${Math.max(10, 80 - i * 15)}%`,
                  zIndex: 0,
                }}
              />
              <div style={{ color: "#00e676", position: "relative", zIndex: 1 }}>{bid.price}</div>
              <div className="text-white text-right" style={{ position: "relative", zIndex: 1 }}>{bid.amount}</div>
              <div className="text-gray-400 text-right" style={{ position: "relative", zIndex: 1 }}>{bid.total}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trades */}
      <div
        style={{
          background: "#111111",
          borderRadius: 14,
          margin: "12px 16px 0",
          padding: 16,
          border: "1px solid #1e1e1e",
        }}
      >
        <h3 className="text-white font-semibold mb-3">Recent Trades</h3>
        <div className="grid grid-cols-3 gap-2 text-gray-400 text-xs mb-2 pb-2" style={{ borderBottom: "1px solid #1e1e1e" }}>
          <div>Price</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Time</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recentTrades.map((trade, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 text-xs tabular-nums">
              <div style={{ color: trade.side === "buy" ? "#00e676" : "#ef4444" }}>{trade.price}</div>
              <div className="text-white text-right">{trade.amount}</div>
              <div className="text-gray-500 text-right">{trade.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Form */}
      <div
        style={{
          background: "#111111",
          borderRadius: 14,
          margin: "12px 16px 0",
          padding: 16,
          border: "1px solid #1e1e1e",
        }}
      >
        {/* Buy/Sell Toggle */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
            background: "#1a1a1a",
            padding: 4,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => setSide("buy")}
            style={{
              padding: "8px 0",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: side === "buy" ? "#00e676" : "transparent",
              color: side === "buy" ? "#000000" : "#9ca3af",
            }}
            data-testid="btn-buy"
          >
            Buy
          </button>
          <button
            onClick={() => setSide("sell")}
            style={{
              padding: "8px 0",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: side === "sell" ? "#ef4444" : "transparent",
              color: side === "sell" ? "#ffffff" : "#9ca3af",
            }}
            data-testid="btn-sell"
          >
            Sell
          </button>
        </div>

        {/* Limit/Market Toggle */}
        <div className="flex gap-4 mb-4 pb-2" style={{ borderBottom: "1px solid #1e1e1e" }}>
          {["limit", "market"].map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t as "limit" | "market")}
              style={{
                fontSize: 13,
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: orderType === t ? "#ffffff" : "#6b7280",
                textTransform: "capitalize",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {orderType === "limit" && (
            <div>
              <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 4 }}>
                Price (USDT)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#00e676")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                data-testid="input-price"
              />
            </div>
          )}

          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 4 }}>
              Amount (BTC)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-amount"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                onClick={() => setAmount(((pct / 100) * 1.5).toFixed(4))}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 6,
                  color: "#ffffff",
                  fontSize: 11,
                  padding: "6px 0",
                  cursor: "pointer",
                }}
                data-testid={`pct-${pct}`}
              >
                {pct}%
              </button>
            ))}
          </div>

          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 4 }}>
              Total (USDT)
            </label>
            <div
              style={{
                ...inputStyle,
                background: "#0a0a0a",
                border: "1px solid #1e1e1e",
                color: "#9ca3af",
              }}
            >
              {amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : "0.00"}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span style={{ color: "#9ca3af", fontSize: 12 }}>Fee (0.1%)</span>
            <span style={{ color: "#9ca3af", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
              {amount ? (parseFloat(amount) * 0.001).toFixed(4) : "0.0000"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Wallet size={12} color="#9ca3af" />
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Available (USDT)</span>
            </div>
            <span style={{ color: "#ffffff", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>0 USDT</span>
          </div>

          <button
            style={{
              width: "100%",
              fontWeight: 700,
              height: 48,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              background: side === "buy" ? "#00e676" : "#ef4444",
              color: side === "buy" ? "#000000" : "#ffffff",
            }}
            data-testid="btn-place-order"
          >
            {side === "buy" ? "Buy BTC" : "Sell BTC"}
          </button>
        </div>
      </div>

      {/* Fixed Bottom Tab Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          background: "#111111",
          borderTop: "1px solid #1e1e1e",
          height: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          zIndex: 100,
        }}
      >
        {[
          { label: "Orders", icon: AlignJustify },
          { label: "History", icon: Clock },
          { label: "Positions", icon: TrendingUp },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setBottomTab(label)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: bottomTab === label ? "#ffffff" : "#6b7280",
            }}
            data-testid={`tab-${label.toLowerCase()}`}
          >
            <Icon size={18} />
            <span style={{ fontSize: 11 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
