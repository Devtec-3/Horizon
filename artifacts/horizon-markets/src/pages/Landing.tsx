import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { TickerBar } from "@/components/TickerBar";
import { TrendingUp, Shield, Zap, BarChart2, Bot, DollarSign, ArrowRight, Star } from "lucide-react";

const features = [
  { icon: BarChart2,  title: "Professional Charts",       body: "Real-time candlestick charts with indicators, multiple timeframes, and drawing tools." },
  { icon: Zap,        title: "Lightning-Fast Execution",  body: "Sub-millisecond order execution with deep liquidity across 200+ trading pairs." },
  { icon: Shield,     title: "Bank-Grade Security",       body: "End-to-end encryption, 2FA, cold storage, and 24/7 threat monitoring." },
  { icon: Bot,        title: "AI Trading Bots",           body: "Deploy automated strategies — grid, DCA, momentum, and arbitrage — with zero code." },
  { icon: DollarSign, title: "Ultra-Low Fees",            body: "0.1% maker/taker with volume discounts. No hidden fees, no surprises." },
  { icon: TrendingUp, title: "Advanced Analytics",        body: "Portfolio P&L, tax reports, performance breakdown across all your positions." },
];

const stats = [
  { label: "24h Volume", value: "$58.2B" },
  { label: "Registered Users", value: "4.2M+" },
  { label: "Countries Supported", value: "180+" },
  { label: "Trading Pairs", value: "500+" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 sm:h-16 border-b border-border bg-black/90 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#markets" className="hover:text-foreground transition-colors">Markets</a>
            <a href="#fees" className="hover:text-foreground transition-colors">Fees</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <button className="px-3 sm:px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-3 sm:px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <TickerBar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28 relative overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live — 500+ Trading Pairs Available
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
            The Professional
            <br />
            <span className="text-primary">Crypto Trading</span> Platform
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Built for serious traders. Real-time data, institutional-grade tools, and
            automated strategies — all in one razor-sharp platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto">
                Start Trading Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/markets">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors w-full sm:w-auto">
                <BarChart2 className="w-4 h-4" />
                View Markets
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">{s.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Everything you need to trade professionally
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              From advanced charting to automated bots, Horizon Markets gives you the edge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Join 4.2 million traders worldwide
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-8">
                Create your free account in under 2 minutes and start trading instantly.
              </p>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-muted-foreground text-xs">
            © 2025 Horizon Markets. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
