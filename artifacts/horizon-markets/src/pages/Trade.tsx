import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { orderBookAsks, orderBookBids, recentTrades } from "@/data/mockData";

const chartData = Array.from({ length: 60 }).map((_, i) => {
  const base = 97500;
  const v = base + Math.sin(i / 4) * 800 + Math.cos(i / 7) * 300 + (Math.sin(i / 2) * 150);
  return { time: i, price: Math.round(v * 100) / 100 };
});

const PAIRS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"];
const TABS_TIME = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"];

export default function Trade() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pair, setPair] = useState("BTC/USDT");
  const [pairOpen, setPairOpen] = useState(false);
  const [timeTab, setTimeTab] = useState("1D");
  const [bookTab, setBookTab] = useState<"Both" | "Bids" | "Asks">("Both");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("97,523.40");
  const [amount, setAmount] = useState("");
  const [bottomTab, setBottomTab] = useState<"orderbook" | "trades" | "positions">("orderbook");

  const total = amount && price
    ? (parseFloat(amount) * parseFloat(price.replace(/,/g, ""))).toLocaleString("en-US", { maximumFractionDigits: 2 })
    : "0.00";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Pair bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-2 sm:py-2.5 border-b border-border bg-card flex-shrink-0 flex-wrap">
        {/* Pair selector */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap min-w-0">
          <div className="relative">
            <button
              onClick={() => setPairOpen(!pairOpen)}
              className="flex items-center gap-2 p-1.5 sm:p-2 rounded-md hover:bg-secondary transition-colors"
              data-testid="btn-pair-selector"
            >
              <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                <span className="text-orange-400 text-[9px] font-bold">B</span>
              </div>
              <span className="text-foreground font-bold text-sm sm:text-base">{pair}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {pairOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg overflow-hidden z-50 shadow-2xl">
                {PAIRS.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPair(p); setPairOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${p === pair ? "text-primary bg-primary/5" : "text-foreground"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price + change */}
          <div className="flex items-center gap-1 font-mono">
            <span className="text-foreground font-bold text-lg sm:text-2xl">$97,523.40</span>
            <div className="flex items-center gap-0.5 text-success text-sm ml-1">
              <ChevronUp className="w-3.5 h-3.5" />
              <span>+2.58%</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs shrink-0 font-mono">
            {[
              ["24h High", "$98,200.00", "text-foreground"],
              ["24h Low",  "$96,100.00", "text-foreground"],
              ["24h Vol",  "24,812 BTC", "text-foreground"],
              ["24h Vol",  "$2.41B",     "text-muted-foreground"],
            ].map(([label, val, cls]) => (
              <div key={label + val}>
                <div className="text-muted-foreground">{label}</div>
                <div className={cls}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">

        {/* Left: Chart + bottom panels */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Chart */}
          <div className="h-[260px] sm:h-[310px] lg:flex-1 lg:min-h-0 bg-card md:bg-background border-b border-border overflow-hidden flex flex-col">
            {/* Time tabs */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-0.5 bg-secondary rounded-md p-0.5 mr-2">
                {TABS_TIME.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeTab(t)}
                    className={`px-2 py-0.5 text-[11px] sm:text-xs rounded transition-colors ${
                      timeTab === t ? "bg-card text-foreground font-medium shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart area */}
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis
                    domain={["auto", "auto"]}
                    orientation="right"
                    tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
                    tickLine={false}
                    axisLine={false}
                    width={70}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                  />
                  <Tooltip
                    contentStyle={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Price"]}
                    labelFormatter={() => ""}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#00ff88"
                    strokeWidth={1.5}
                    fill="url(#tradeGrad)"
                    isAnimationActive={false}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mobile order form (shown below chart on mobile) */}
          <div className="lg:hidden border-b border-border">
            <MobileOrderForm side={side} setSide={setSide} orderType={orderType} setOrderType={setOrderType} price={price} setPrice={setPrice} amount={amount} setAmount={setAmount} total={total} />
          </div>

          {/* Bottom tabs: Order Book / Recent Trades / Positions */}
          <div className="hidden lg:flex flex-col border-t border-border min-h-0" style={{ height: 260 }}>
            {/* Tab bar */}
            <div className="flex items-center border-b border-border flex-shrink-0">
              {(["orderbook", "trades", "positions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBottomTab(tab)}
                  className={`px-4 py-2 text-xs sm:text-sm capitalize transition-colors border-b-2 ${
                    bottomTab === tab
                      ? "text-foreground border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {tab === "orderbook" ? "Order Book" : tab === "trades" ? "Recent Trades" : "Positions"}
                </button>
              ))}
            </div>

            <div className="flex-1 flex min-h-0">
              {bottomTab === "orderbook" && <OrderBook bookTab={bookTab} setBookTab={setBookTab} />}
              {bottomTab === "trades" && <RecentTradesPanel />}
              {bottomTab === "positions" && (
                <div className="flex items-center justify-center flex-1 text-muted-foreground text-sm">
                  No open positions
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Order form — desktop only */}
        <div className="hidden lg:flex lg:w-72 xl:w-80 flex-col border-l border-border bg-card flex-shrink-0">
          <DesktopOrderForm side={side} setSide={setSide} orderType={orderType} setOrderType={setOrderType} price={price} setPrice={setPrice} amount={amount} setAmount={setAmount} total={total} />
        </div>
      </div>
    </div>
  );
}

/* ---- Order Book ---- */
function OrderBook({ bookTab, setBookTab }: { bookTab: string; setBookTab: (t: "Both" | "Bids" | "Asks") => void }) {
  return (
    <div className="flex flex-col h-full bg-card border-border flex-1">
      <div className="flex items-center justify-between gap-1 sm:gap-2 p-2 sm:p-3 border-b border-border">
        <span className="text-xs sm:text-sm font-medium text-foreground">Order Book</span>
        <div className="flex">
          {(["Both", "Bids", "Asks"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setBookTab(t)}
              className={`text-[10px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3 rounded transition-colors ${
                bookTab === t ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-xs text-muted-foreground border-b border-border">
        <div>Price (USDT)</div>
        <div className="text-right">Amount (BTC)</div>
        <div className="text-right">Total</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Asks — reversed */}
        <div className="flex flex-col-reverse">
          {orderBookAsks.map((ask, i) => (
            <div key={`ask-${i}`} className="relative grid grid-cols-3 gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs font-mono hover:bg-secondary/50 cursor-pointer">
              <div className="absolute inset-0 right-0 bg-destructive/10" style={{ left: `${100 - ask.depth}%` }} />
              <div className="relative z-10 text-destructive">{ask.price}</div>
              <div className="relative z-10 text-right text-foreground">{ask.amount}</div>
              <div className="relative z-10 text-right text-muted-foreground">{ask.total}</div>
            </div>
          ))}
        </div>

        {/* Mid price */}
        <div className="py-1.5 sm:py-2 px-2 sm:px-3 bg-accent/50 text-center font-mono text-xs sm:text-sm font-bold text-success border-y border-border">
          $97,523.40 <span className="text-muted-foreground font-normal text-[10px] ml-1">≈ $97,523.40</span>
        </div>

        {/* Bids */}
        {orderBookBids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-3 gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs font-mono hover:bg-secondary/50 cursor-pointer">
            <div className="absolute inset-0 right-0 bg-success/10" style={{ left: `${100 - bid.depth}%` }} />
            <div className="relative z-10 text-success">{bid.price}</div>
            <div className="relative z-10 text-right text-foreground">{bid.amount}</div>
            <div className="relative z-10 text-right text-muted-foreground">{bid.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Recent Trades Panel ---- */
function RecentTradesPanel() {
  return (
    <div className="flex flex-col h-full bg-card border-border flex-1">
      <div className="grid grid-cols-3 gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-xs text-muted-foreground border-b border-border">
        <div>Price (USDT)</div>
        <div className="text-right">Amount (BTC)</div>
        <div className="text-right">Time</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {recentTrades.map((t, i) => (
          <div key={i} className="grid grid-cols-3 gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs font-mono hover:bg-secondary/50">
            <div className={t.side === "buy" ? "text-success" : "text-destructive"}>{t.price}</div>
            <div className="text-right text-foreground">{t.amount}</div>
            <div className="text-right text-muted-foreground">{t.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Shared Order Form props ---- */
interface OrderFormProps {
  side: "buy" | "sell";
  setSide: (s: "buy" | "sell") => void;
  orderType: "limit" | "market";
  setOrderType: (t: "limit" | "market") => void;
  price: string;
  setPrice: (p: string) => void;
  amount: string;
  setAmount: (a: string) => void;
  total: string;
}

/* ---- Desktop Order Form ---- */
function DesktopOrderForm({ side, setSide, orderType, setOrderType, price, setPrice, amount, setAmount, total }: OrderFormProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Buy / Sell tabs */}
      <div className="p-2 sm:p-3 border-b border-border flex-shrink-0">
        <div className="flex-1 text-xs sm:text-sm flex">
          <button
            onClick={() => setSide("buy")}
            className={`flex-1 py-2 text-sm font-semibold rounded-l-md border transition-colors ${
              side === "buy"
                ? "bg-success text-success-foreground border-success"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
            data-testid="btn-buy"
          >
            Buy
          </button>
          <button
            onClick={() => setSide("sell")}
            className={`flex-1 py-2 text-sm font-semibold rounded-r-md border transition-colors ${
              side === "sell"
                ? "bg-destructive text-destructive-foreground border-destructive"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
            data-testid="btn-sell"
          >
            Sell
          </button>
        </div>
      </div>

      <div className="flex-1 p-2 sm:p-3 space-y-3 sm:space-y-4 overflow-auto">
        {/* Order type tabs */}
        <div className="w-full bg-secondary h-8 sm:h-9 flex rounded-md p-0.5">
          {(["limit", "market"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 text-xs sm:text-sm rounded capitalize transition-colors ${
                orderType === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Available */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
          <span>Available</span>
          <span className="font-mono text-foreground">0 USDT</span>
        </div>

        {/* Price */}
        {orderType === "limit" && (
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] sm:text-xs text-muted-foreground">Price (USDT)</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="font-mono bg-secondary border-border h-8 sm:h-9 text-xs sm:text-sm w-full px-3 rounded-md border text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-price"
            />
          </div>
        )}

        {/* Amount */}
        <div className="space-y-1 sm:space-y-1.5">
          <label className="text-[10px] sm:text-xs text-muted-foreground">Amount (BTC)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="font-mono bg-secondary border-border h-8 sm:h-9 text-xs sm:text-sm w-full px-3 rounded-md border text-foreground focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
            data-testid="input-amount"
          />
        </div>

        {/* Percentage quick-fill */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="grid grid-cols-4 gap-1">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                onClick={() => setAmount(((pct / 100) * 1.5).toFixed(4))}
                className="h-5 sm:h-6 text-[10px] sm:text-xs px-1 bg-secondary hover:bg-card border border-border rounded transition-colors text-muted-foreground hover:text-foreground"
                data-testid={`pct-${pct}`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="space-y-1 sm:space-y-1.5">
          <label className="text-[10px] sm:text-xs text-muted-foreground">Total (USDT)</label>
          <div className="font-mono bg-muted border-border h-8 sm:h-9 text-xs sm:text-sm w-full px-3 rounded-md border text-muted-foreground flex items-center">
            {total}
          </div>
        </div>

        {/* Fee */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
          <span>Fee (0.1%)</span>
          <span className="font-mono">{amount ? (parseFloat(amount) * 0.001).toFixed(6) : "0.000000"} BTC</span>
        </div>

        {/* Submit */}
        <button
          className={`w-full py-2.5 sm:py-3 rounded-md font-semibold text-sm transition-colors ${
            side === "buy"
              ? "bg-success text-success-foreground hover:bg-success/90"
              : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          }`}
          data-testid="btn-place-order"
        >
          {side === "buy" ? `Buy BTC` : `Sell BTC`}
        </button>
      </div>
    </div>
  );
}

/* ---- Mobile Order Form (collapsible) ---- */
function MobileOrderForm(props: OrderFormProps) {
  const { side, setSide, orderType, setOrderType, price, setPrice, amount, setAmount, total } = props;
  return (
    <div className="p-4 space-y-3">
      <div className="flex">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 text-sm font-semibold rounded-l-md border transition-colors ${
            side === "buy" ? "bg-success text-success-foreground border-success" : "bg-secondary text-muted-foreground border-border"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 text-sm font-semibold rounded-r-md border transition-colors ${
            side === "sell" ? "bg-destructive text-destructive-foreground border-destructive" : "bg-secondary text-muted-foreground border-border"
          }`}
        >
          Sell
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {orderType === "limit" && (
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="font-mono w-full bg-secondary border border-border rounded-md px-3 h-9 text-xs text-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
        )}
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Amount (BTC)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="font-mono w-full bg-secondary border border-border rounded-md px-3 h-9 text-xs text-foreground focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <button
        className={`w-full py-2.5 rounded-md font-semibold text-sm transition-colors ${
          side === "buy" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
        }`}
      >
        {side === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>
    </div>
  );
}
