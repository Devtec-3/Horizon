import { Link } from "wouter";
import { ArrowLeft, Bot } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { useState } from "react";

export default function Bots() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <Bot className="text-[#00e676] w-16 h-16 mb-6 opacity-80" />
        <h1 className="text-white text-3xl font-bold mb-3 tracking-tight">Trading Bots</h1>
        <p className="text-gray-400 text-base max-w-sm mb-8">
          Automated algorithmic trading strategies are coming soon to Horizon Markets.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#00e676] hover:text-[#00c853] font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </main>
    </div>
  );
}
