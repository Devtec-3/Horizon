import { Link } from "wouter";
import { ArrowLeft, ArrowDownLeft } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { useState } from "react";

export default function Withdraw() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-[#111] border border-[#1e1e1e] rounded-2xl flex items-center justify-center mb-6">
          <ArrowDownLeft className="text-[#00e676] w-8 h-8" />
        </div>
        <h1 className="text-white text-3xl font-bold mb-3 tracking-tight">Withdrawals</h1>
        <p className="text-gray-400 text-base max-w-sm mb-8">
          Fiat and crypto withdrawals are currently undergoing maintenance. Please check back later.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#00e676] hover:text-[#00c853] font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </main>
    </div>
  );
}
