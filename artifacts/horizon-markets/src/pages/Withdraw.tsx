import { Link } from "wouter";
import { ArrowLeft, ArrowDownLeft, Clock } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { useState } from "react";

export default function Withdraw() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Withdraw Crypto</h1>
          <p className="text-muted-foreground text-sm mt-1">Withdraw your cryptocurrency to an external wallet</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-10 sm:p-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <ArrowDownLeft className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-foreground text-2xl font-bold mb-3">Coming Soon</h2>
          <p className="text-muted-foreground text-sm max-w-xs mb-2">
            Withdrawals are currently undergoing maintenance. Please check back later.
          </p>
          <div className="flex items-center gap-1.5 text-warning text-xs font-mono mt-2 mb-8">
            <Clock className="w-3.5 h-3.5" />
            Estimated ETA: 48 hours
          </div>
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
