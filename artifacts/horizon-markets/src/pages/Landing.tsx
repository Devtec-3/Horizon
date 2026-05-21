import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { TickerBar } from "@/components/TickerBar";
import { useLivePrices, formatPrice } from "@/context/LivePricesContext";
import {
  ChevronLeft, ChevronRight, Zap, Shield, Clock, DollarSign, Target, Lock,
  BarChart2, Activity, TrendingUp
} from "lucide-react";

const COIN_ICONS: Record<string, string> = {
  BTC:  "https://assets.coincap.io/assets/icons/btc@2x.png",
  ETH:  "https://assets.coincap.io/assets/icons/eth@2x.png",
  BNB:  "https://assets.coincap.io/assets/icons/bnb@2x.png",
  SOL:  "https://assets.coincap.io/assets/icons/sol@2x.png",
  XRP:  "https://assets.coincap.io/assets/icons/xrp@2x.png",
  DOGE: "https://assets.coincap.io/assets/icons/doge@2x.png",
  ADA:  "https://assets.coincap.io/assets/icons/ada@2x.png",
  TRX:  "https://assets.coincap.io/assets/icons/trx@2x.png",
  LTC:  "https://assets.coincap.io/assets/icons/ltc@2x.png",
};

// ─── Hero Slides ───────────────────────────────────────────────
const SLIDES = [
  {
    tag: "Smart Trading Technology",
    title: "Trade Crypto\nLike a Pro",
    body: "Our platform provides real-time market data and professional trading tools to maximize your returns.",
    bg: "slide-1",
  },
  {
    tag: "Smart Trading Technology",
    title: "Turn Idle Funds Into\nPowerful Assets",
    body: "Experience seamless cryptocurrency trading with cutting-edge technology built for consistent performance.",
    bg: "slide-2",
  },
  {
    tag: "Smart Trading Technology",
    title: "Grow Your\nWealth Faster",
    body: "Join thousands of traders who trust Horizon Markets to achieve their financial goals every day.",
    bg: "slide-3",
  },
];

// Floating coins on slide 1 & 3
const FLOAT_COINS = [
  { symbol: "BTC",  color: "#F7931A", size: 80, top: "15%",  right: "18%",  delay: "0s"   },
  { symbol: "ETH",  color: "#627EEA", size: 64, top: "55%",  right: "28%",  delay: "0.6s" },
  { symbol: "LTC",  color: "#BFBBBB", size: 56, top: "70%",  right: "10%",  delay: "1.2s" },
  { symbol: "DOGE", color: "#C2A633", size: 48, top: "30%",  right: "8%",   delay: "0.9s" },
  { symbol: "SOL",  color: "#9945FF", size: 44, top: "80%",  right: "38%",  delay: "1.8s" },
];

function FloatCoin({ symbol, color, size, top, right, delay }: { symbol: string; color: string; size: number; top: string; right: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full flex items-center justify-center font-bold text-white pointer-events-none"
      style={{
        width: size, height: size,
        top, right,
        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
        boxShadow: `0 0 ${size / 2}px ${color}44, inset 0 1px 1px #ffffff33`,
        border: `1.5px solid ${color}88`,
        fontSize: size * 0.32,
        animation: `floatCoin 4s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {symbol.slice(0, 1)}
    </div>
  );
}

// Green wave background for slide 2
function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,#003322_0%,#000000_70%)]" />
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0" />
            <stop offset="30%" stopColor="#00e676" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#00ff88" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00695c" stopOpacity="0" />
            <stop offset="50%" stopColor="#00695c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00695c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 40, 80, 120, 160].map((off, i) => (
          <path
            key={i}
            d={`M0 ${300 + off} C360 ${260 + off * 0.5} 720 ${340 + off * 0.5} 1440 ${300 + off}`}
            stroke={i % 2 === 0 ? "url(#wg)" : "url(#wg2)"}
            strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
            fill="none"
            style={{ animation: `wavePulse ${3 + i * 0.4}s ease-in-out infinite alternate`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
      {/* Glow orb */}
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, #00e67622 0%, transparent 70%)" }} />
    </div>
  );
}

// ─── Live Market Table Rows ─────────────────────────────────────
const TABLE_COINS = ["BTC", "ETH", "BNB", "SOL", "XRP", "DOGE", "ADA"];

export default function Landing() {
  const { getPrice } = useLivePrices();
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i: number) => { setSlide(i); startTimer(); };
  const prev = () => goTo((slide - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((slide + 1) % SLIDES.length);

  const currentSlide = SLIDES[slide];

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ background: "#000" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-black/95 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-4 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button
                className="px-4 py-1.5 rounded-md text-sm font-bold transition-colors"
                style={{ background: "#00e676", color: "#000" }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Ticker ── */}
      <TickerBar />

      {/* ── Hero Slider ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 90px)", background: "#000" }}>

        {/* Slide background */}
        {slide === 1 ? (
          <WaveBackground />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#001a0e_0%,#000000_65%)]" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

        {/* Floating coins (slides 0 and 2) */}
        {slide !== 1 && (
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {FLOAT_COINS.map((c) => <FloatCoin key={c.symbol} {...c} />)}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-[inherit] px-8 sm:px-16 max-w-3xl" style={{ minHeight: "calc(100vh - 90px)" }}>
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: "#00e676" }}>
              {currentSlide.tag}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 whitespace-pre-line">
              {currentSlide.title}
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              {currentSlide.body}
            </p>
            <div className="flex items-center gap-3">
              <Link href="/register">
                <button
                  className="px-6 py-2.5 rounded-md text-sm font-bold transition-colors"
                  style={{ background: "#00e676", color: "#000" }}
                >
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2.5 rounded-md text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                background: i === slide ? "#00e676" : "#ffffff44",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="py-20 px-6" style={{ background: "#050505" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00e676" }}>
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">
            Discover Our Platform —<br className="hidden sm:block" /> Don't Miss Out
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Trading",
                body: "Execute trades instantly with live market data",
              },
              {
                icon: Shield,
                title: "Secure Platform",
                body: "Your assets protected with bank-grade security",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl p-6"
                style={{ background: "#111111", border: "1px solid #1e1e1e" }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "#00e67615" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#00e676" }} />
                </div>
                <h3 className="text-white font-bold text-base mb-1">{title}</h3>
                <p className="text-white/50 text-sm">{body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/register">
              <button
                className="px-6 py-2.5 rounded-md text-sm font-bold transition-colors"
                style={{ background: "#00e676", color: "#000" }}
              >
                Discover Now
              </button>
            </Link>
            <div>
              <span className="text-white font-extrabold text-xl">15,000+</span>
              <span className="text-white/50 text-sm ml-2">Active Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Market Overview ── */}
      <section className="py-16 px-6" style={{ background: "#000" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#00e676" }}>
            Live Market Overview
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Real-Time Prices
          </h2>

          <div className="rounded-xl overflow-hidden" style={{ background: "#111111", border: "1px solid #1e1e1e" }}>
            {TABLE_COINS.map((sym, idx) => {
              const live = getPrice(sym);
              const change = live ? live.change24h : 0;
              const positive = change >= 0;
              return (
                <div
                  key={sym}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/5"
                  style={{ borderBottom: idx < TABLE_COINS.length - 1 ? "1px solid #1a1a1a" : undefined }}
                >
                  <img
                    src={COIN_ICONS[sym] || ""}
                    alt={sym}
                    className="w-8 h-8 rounded-full"
                    style={{ background: "#1a1a1a" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">{sym}/USDT</div>
                  </div>
                  <div className="text-white font-mono font-semibold text-sm tabular-nums">
                    {live ? formatPrice(live.price) : "—"}
                  </div>
                  <div
                    className="font-mono font-bold text-sm tabular-nums w-20 text-right"
                    style={{ color: positive ? "#00e676" : "#ef4444" }}
                  >
                    {positive ? "+" : ""}{change.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Professional Trading Platform ── */}
      <section className="py-20 px-6" style={{ background: "#050505" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00e676" }}>
            Premium Trading
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Professional Trading Platform
          </h2>
          <p className="text-white/50 text-sm mb-10 max-w-lg">
            Our platform provides real-time market data and professional tools tailored to maximize your trading opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: BarChart2,
                title: "Advanced Trading Charts",
                body: "Access professional candlestick charts with real-time OHLCV data and multiple timeframes.",
              },
              {
                icon: Activity,
                title: "24/7 Market Monitoring",
                body: "Track the market around the clock with live price updates, order books, and recent trades.",
              },
              {
                icon: Zap,
                title: "Instant Order Execution",
                body: "Execute market and limit orders instantly with our high-performance trading engine.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl p-6"
                style={{ background: "#111111", border: "1px solid #1e1e1e" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#00e67615" }}>
                  <Icon className="w-5 h-5" style={{ color: "#00e676" }} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trade With Confidence ── */}
      <section className="py-20 px-6" style={{ background: "#000" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00e676" }}>
            Why Choose Us
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10">
            Trade With Confidence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Zap,         title: "Lightning-Fast Withdrawals", body: "Your funds are processed within seconds, ensuring seamless and hassle-free transactions." },
              { icon: TrendingUp,  title: "Competitive Spreads",        body: "Trade with consistently tight and stable spreads, even during high-volatility market events." },
              { icon: Clock,       title: "Round-the-Clock Support",    body: "Get expert assistance anytime via phone, live chat, or email in multiple languages." },
              { icon: DollarSign,  title: "Zero Overnight Fees",        body: "Hold positions overnight at no extra cost on most popular trading assets. Terms apply." },
              { icon: Target,      title: "Precision Execution",        body: "Experience industry-leading order execution speed with minimal slippage." },
              { icon: Lock,        title: "Enterprise-Grade Security",  body: "Your funds are held in segregated accounts with robust data protection measures." },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl p-5 hover:border-[#00e67640] transition-colors"
                style={{ background: "#111111", border: "1px solid #1e1e1e" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "#00e67615" }}>
                  <Icon className="w-4 h-4" style={{ color: "#00e676" }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Prices Table (full) ── */}
      <section className="py-16 px-6" style={{ background: "#050505" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#00e676" }}>
            Live Updates
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Real-Time Market Prices
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ background: "#111111", border: "1px solid #1e1e1e" }}>
            {/* header */}
            <div className="grid px-5 py-3 text-xs text-white/40 font-semibold uppercase tracking-wider border-b border-[#1a1a1a]"
              style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
            >
              <div>Asset</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h Change</div>
              <div className="text-right hidden md:block">24h High</div>
              <div className="text-right hidden md:block">24h Low</div>
            </div>
            {["BTC","ETH","BNB","SOL","XRP","DOGE","ADA","LTC"].map((sym, idx, arr) => {
              const live = getPrice(sym);
              const change = live ? live.change24h : 0;
              const positive = change >= 0;
              const hi = live ? live.price * 1.03 : 0;
              const lo = live ? live.price * 0.97 : 0;
              return (
                <div
                  key={sym}
                  className="grid items-center px-5 py-4 hover:bg-white/5 transition-colors"
                  style={{
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                    borderBottom: idx < arr.length - 1 ? "1px solid #1a1a1a" : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img src={COIN_ICONS[sym] || ""} alt={sym} className="w-7 h-7 rounded-full" style={{ background: "#1a1a1a" }} />
                    <div>
                      <div className="text-white font-bold text-sm">{sym}</div>
                    </div>
                  </div>
                  <div className="text-white font-mono text-sm text-right tabular-nums">
                    {live ? formatPrice(live.price) : "—"}
                  </div>
                  <div className="font-mono text-sm text-right font-bold tabular-nums"
                    style={{ color: positive ? "#00e676" : "#ef4444" }}>
                    {positive ? "+" : ""}{change.toFixed(2)}%
                  </div>
                  <div className="text-white/50 font-mono text-sm text-right hidden md:block tabular-nums">
                    {live ? formatPrice(hi) : "—"}
                  </div>
                  <div className="text-white/50 font-mono text-sm text-right hidden md:block tabular-nums">
                    {live ? formatPrice(lo) : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-14 px-6" style={{ background: "#000", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50,000+",  label: "Active Traders" },
            { value: "$2.5B+",   label: "Trading Volume" },
            { value: "100+",     label: "Trading Pairs" },
            { value: "99.9%",    label: "Uptime" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-white font-mono mb-1">{value}</div>
              <div className="text-white/40 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6" style={{ background: "#050505" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            Join thousands of traders who trust Horizon Markets. Sign up today and start trading now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <button className="px-8 py-3 rounded-md text-sm font-bold transition-colors" style={{ background: "#00e676", color: "#000" }}>
                Create Free Account
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-3 rounded-md text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-12" style={{ background: "#000", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <Logo />
            <p className="text-white/30 text-xs">© 2025 Horizon Markets. All rights reserved.</p>
          </div>
          <div className="text-white/25 text-xs leading-relaxed space-y-3 max-w-4xl">
            <p>
              <strong className="text-white/40">Horizon (SC) Ltd</strong> is a Securities Dealer registered in Seychelles with registration number 6156187-1 and authorised by the Financial Services Authority (FSA) with licence number SD016. Horizon (SC) Ltd is also authorized as an Over-The-Counter Derivatives Provider (ODP) by the Financial Sector Conduct Authority (FSCA) in South Africa. The registered office of Horizon (SC) Ltd is at 199, East Coast Road, 2nd floor, Anse Royale, Seychelles.
            </p>
            <p>
              <strong className="text-white/40">Risk Warning:</strong> Our services relate to complex derivative products which are traded outside an exchange. These products come with a high risk of losing money rapidly due to leverage and thus are not appropriate for all investors. Under no circumstances shall Horizon have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any investing activity.
            </p>
          </div>
        </div>
      </footer>

      {/* Keyframes */}
      <style>{`
        @keyframes floatCoin {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes wavePulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
