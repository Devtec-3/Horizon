import { useState } from "react";
import { ArrowUpRight, ChevronDown, Copy, QrCode } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";

const cryptos = [
  { symbol: "USDT", name: "Tether (TRC20)", color: "#26A17B" },
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "USDC", name: "USD Coin", color: "#2775CA" },
];

export default function Deposit() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("100.00");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dummyAddress = "TJn8xMqkZ4QvEZb4M2H5u8nB3LpWk9F2p";

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyAddress);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="max-w-md mx-auto w-full px-4 pt-8 pb-12 flex-1 flex flex-col">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-2 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#1a1a1a] -z-10" />
          <div className="absolute top-1/2 left-0 h-0.5 bg-[#00e676] -z-10 transition-all duration-300" style={{ width: `${(activeStep - 1) * 50}%` }} />
          
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                activeStep >= step 
                  ? "bg-[#00e676] border-[#00e676] text-black" 
                  : "bg-[#111] border-[#2a2a2a] text-gray-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>

        <div className="flex-1">
          {activeStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-1">Enter Amount</h2>
              <p className="text-gray-400 text-sm mb-6">Specify the amount you wish to deposit.</p>
              
              <div className="space-y-1.5 mb-6">
                <label className="text-gray-400 text-sm font-medium block">Amount (USD)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500 text-lg">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3.5 text-white text-lg font-medium focus:outline-none focus:border-[#00e676] transition-colors"
                  />
                </div>
                <div className="text-gray-500 text-xs mt-2">Minimum deposit: $50</div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-8">
                {["50", "100", "250", "500"].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className="bg-transparent border border-[#2a2a2a] hover:border-gray-500 text-white rounded-lg py-2 text-sm transition-colors"
                  >
                    ${val}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setActiveStep(2)}
                disabled={!amount || parseFloat(amount) < 50}
                className="w-full bg-[#00e676] hover:bg-[#00c853] text-black font-bold h-12 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-1">Select Currency</h2>
              <p className="text-gray-400 text-sm mb-6">Depositing <span className="text-white font-semibold">${parseFloat(amount || "0").toFixed(2)}</span></p>
              
              <div className="relative mb-8">
                <label className="text-gray-400 text-sm font-medium block mb-1.5">Asset & Network</label>
                <div 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: selectedCrypto.color }}>
                      <span className="text-white text-[8px] font-bold">{selectedCrypto.symbol.slice(0,3)}</span>
                    </div>
                    <span className="text-white font-medium">{selectedCrypto.name}</span>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </div>
                
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden z-10 shadow-xl">
                    {cryptos.map((c) => (
                      <div 
                        key={c.symbol}
                        onClick={() => { setSelectedCrypto(c); setDropdownOpen(false); }}
                        className="flex items-center gap-3 p-3.5 hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: c.color }}>
                          <span className="text-white text-[8px] font-bold">{c.symbol.slice(0,3)}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{c.name}</div>
                          <div className="text-gray-500 text-xs">{c.symbol}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <button 
                  onClick={() => setActiveStep(1)}
                  className="bg-transparent border border-[#2a2a2a] hover:border-gray-500 text-white font-medium px-6 h-12 rounded-xl transition-colors"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setActiveStep(3)}
                  className="bg-[#00e676] hover:bg-[#00c853] text-black font-bold h-12 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  Generate Address
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center text-center">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-1">Deposit Address</h2>
              <p className="text-gray-400 text-sm mb-6">Send <span className="text-white font-semibold">{selectedCrypto.name}</span> to this address</p>
              
              <div className="bg-white p-3 rounded-xl w-48 h-48 mx-auto mb-6 flex flex-wrap relative">
                {/* Fake QR code generation pattern */}
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="w-[10%] h-[10%] border-white border-[0.5px]" style={{ backgroundColor: Math.random() > 0.4 ? 'black' : 'white' }} />
                ))}
                {/* Positioning squares */}
                <div className="absolute top-4 left-4 w-8 h-8 border-4 border-black bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black"/></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-4 border-black bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black"/></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-4 border-black bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black"/></div>
              </div>
              
              <div className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 flex flex-col gap-2 mb-6">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider text-left">Network</span>
                <div className="flex items-center gap-2 text-left">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: selectedCrypto.color }}>
                    <span className="text-white text-[6px] font-bold">{selectedCrypto.symbol.slice(0,3)}</span>
                  </div>
                  <span className="text-white text-sm font-medium">{selectedCrypto.name}</span>
                </div>
              </div>

              <div className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 mb-6 relative overflow-hidden group">
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-left mb-1.5">Deposit Address</div>
                <div className="font-mono text-xs text-white break-all text-left pr-10 leading-relaxed">
                  {dummyAddress}
                </div>
                <button 
                  onClick={handleCopy}
                  className="absolute right-2 bottom-2 p-2 bg-[#2a2a2a] hover:bg-[#333] rounded-lg text-[#00e676] transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-[#0f2a0f]/50 border border-[#00e676]/20 rounded-xl p-4 w-full text-left">
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e676] mt-1.5 shrink-0 animate-pulse" />
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Send only <strong className="text-white">{selectedCrypto.symbol}</strong> to this address. Sending any other asset will result in permanent loss.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveStep(1)}
                className="mt-8 text-gray-500 hover:text-white text-sm transition-colors"
              >
                Start New Deposit
              </button>
            </div>
          )}
        </div>

        {activeStep === 1 && (
          <div className="mt-12 border-t border-[#1e1e1e] pt-8">
            <div className="flex items-center gap-2 mb-6">
              <ArrowUpRight className="text-gray-400 w-5 h-5" />
              <h3 className="text-white font-bold">Recent Deposits</h3>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 bg-[#111] rounded-xl border border-[#1e1e1e] border-dashed">
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-3">
                <ArrowUpRight className="text-gray-600 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm font-medium">No deposit history yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
