import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { LineChart, Activity } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 bg-black sticky top-0 z-10 border-b border-[#1e1e1e]">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="bg-[#00e676] hover:bg-[#00c853] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 min-h-[80vh] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0f]/20 to-black pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto w-full pt-12 pb-20">
          <div className="inline-flex items-center gap-1.5 text-[#00e676] text-sm font-medium mb-6 bg-[#0f2a0f] px-3 py-1 rounded-full border border-[#00e676]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
            Premium Trading
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Professional<br />Trading Platform
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md mb-12">
            Information-dense, razor-sharp, and instantly readable. Built for active crypto traders.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#111] rounded-xl p-5 border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors">
              <div className="bg-[#0f2a0f] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="text-[#00e676] w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg">Advanced Trading Charts</h3>
              <p className="text-gray-400 text-sm mt-2">
                Pixel-perfect charting tools with real-time data integration.
              </p>
            </div>
            
            <div className="bg-[#111] rounded-xl p-5 border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors">
              <div className="bg-[#0f2a0f] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="text-[#00e676] w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-lg">Real-Time Market Monitoring</h3>
              <p className="text-gray-400 text-sm mt-2">
                Live order books, recent trades, and ultra-fast price updates.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
