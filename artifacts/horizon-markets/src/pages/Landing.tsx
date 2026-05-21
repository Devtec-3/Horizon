import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { LineChart, Activity, Shield, Clock, DollarSign, Bot } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Advanced Trading Charts",
    body: "Access professional candlestick charts with real-time OHLCV data and multiple timeframes.",
  },
  {
    icon: Activity,
    title: "Real-Time Market Monitoring",
    body: "Monitor live price movements across hundreds of trading pairs with instant alerts.",
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    body: "Bank-grade security with end-to-end encryption protecting your assets 24/7.",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    body: "Markets never sleep. Trade any time, anywhere with our always-on platform.",
  },
  {
    icon: DollarSign,
    title: "Low Trading Fees",
    body: "Industry-leading 0.1% maker/taker fees. Keep more of your profits.",
  },
  {
    icon: Bot,
    title: "Automated Bots",
    body: "Deploy AI-powered trading bots to execute strategies while you sleep.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col" style={{ maxWidth: 430, margin: "0 auto" }}>
      <header className="flex justify-between items-center px-5 py-4 bg-black sticky top-0 z-10">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-white text-sm font-medium">
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-[#00e676] text-black font-bold px-5 py-2.5 rounded-xl text-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-16 pb-10 text-center">
        <div className="flex justify-center">
          <span style={{ color: "#00e676", fontSize: 13, fontWeight: 600 }}>
            • Premium Trading
          </span>
        </div>

        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1.15,
            marginTop: 12,
            color: "#ffffff",
          }}
        >
          Professional Trading
          <br />
          Platform
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 14,
            lineHeight: 1.65,
            marginTop: 14,
            maxWidth: 320,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Our platform provides real-time market data and professional tools tailored to maximize
          your trading opportunities.
        </p>

        <div style={{ marginTop: 32 }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  background: "#111111",
                  border: "1px solid #1e1e1e",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    background: "#0d2b15",
                    borderRadius: 12,
                    padding: 12,
                    width: "fit-content",
                  }}
                >
                  <Icon size={24} color="#00e676" strokeWidth={1.75} />
                </div>
                <div
                  style={{ color: "#ffffff", fontWeight: 700, fontSize: 15 }}
                >
                  {f.title}
                </div>
                <div style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.55 }}>
                  {f.body}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #071a0e, #0d2b15)",
            border: "1px solid #1e3a1e",
            borderRadius: 18,
            padding: "36px 24px",
            marginTop: 8,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: 22 }}>
            Start Trading Today
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 6 }}>
            Join millions of traders on the most trusted platform
          </p>
          <Link href="/register">
            <button
              style={{
                background: "#00e676",
                color: "#000000",
                fontWeight: 700,
                fontSize: 14,
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                marginTop: 20,
              }}
            >
              Create Free Account
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
