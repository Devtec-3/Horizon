import { Link } from "wouter";
import { ArrowLeft, Bot, Zap, Play, Pause } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { useState } from "react";
import { botTemplates } from "@/data/mockData";

const RISK_COLORS: Record<string, string> = {
  "Very Low": "text-success bg-success/10",
  Low:        "text-blue-400 bg-blue-400/10",
  Medium:     "text-warning bg-warning/10",
  High:       "text-destructive bg-destructive/10",
};

export default function Bots() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bots, setBots] = useState(botTemplates);

  const toggleBot = (id: string) => {
    setBots((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Trading Bots</h1>
          <p className="text-muted-foreground text-sm mt-1">Automated algorithmic trading strategies</p>
        </div>

        {/* Banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary shrink-0" />
          <p className="text-foreground/80 text-sm">
            <strong className="text-foreground">Bot trading is in beta.</strong> Deploy automated strategies with one click — no coding required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bots.map((bot) => (
            <div key={bot.id} className={`bg-card border rounded-xl overflow-hidden transition-colors ${bot.active ? "border-primary/30" : "border-border"}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bot.active ? "bg-primary/10" : "bg-secondary"}`}>
                      <Bot className={`w-5 h-5 ${bot.active ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-sm">{bot.name}</h3>
                      <span className="text-muted-foreground text-xs">{bot.pairs}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${bot.active ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
                    {bot.active ? "Running" : "Idle"}
                  </div>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed mb-4">{bot.description}</p>

                <div className="flex items-center justify-between text-xs mb-4">
                  <div>
                    <div className="text-muted-foreground">Avg Return ({bot.period})</div>
                    <div className="text-success font-mono font-bold text-sm">{bot.profit}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-right">Risk Level</div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${RISK_COLORS[bot.risk] || "text-muted-foreground bg-secondary"}`}>
                      {bot.risk}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleBot(bot.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-colors ${
                    bot.active
                      ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  data-testid={`bot-toggle-${bot.id}`}
                >
                  {bot.active ? <><Pause className="w-4 h-4" /> Stop Bot</> : <><Play className="w-4 h-4" /> Start Bot</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
