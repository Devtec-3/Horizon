import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, Copy, QrCode, Clock, Check } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";

const NETWORKS = [
  { symbol: "BTC",  name: "Bitcoin",          network: "Bitcoin (BTC)",       color: "#F7931A", minDep: 0.0001 },
  { symbol: "ETH",  name: "Ethereum",         network: "Ethereum (ERC-20)",   color: "#627EEA", minDep: 0.01   },
  { symbol: "USDT", name: "Tether",           network: "Tron (TRC-20)",       color: "#26A17B", minDep: 10     },
  { symbol: "USDC", name: "USD Coin",         network: "Ethereum (ERC-20)",   color: "#2775CA", minDep: 10     },
  { symbol: "BNB",  name: "Binance Coin",     network: "BNB Smart Chain",     color: "#F3BA2F", minDep: 0.01   },
];

const DUMMY_ADDRESS = "TJn8xMqkZ4QvEZb4M2H5u8nB3LpWk9F2p";

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function Deposit() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("100");
  const [coin, setCoin] = useState(NETWORKS[2]);
  const [dropOpen, setDropOpen] = useState(false);
  const [timer, setTimer] = useState(3600);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (step !== 3) return;
    setTimer(3600);
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  const handleCopy = () => {
    navigator.clipboard.writeText(DUMMY_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepLabels = ["Amount", "Currency", "Address"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Deposit Crypto</h1>
          <p className="text-muted-foreground text-sm mt-1">Fund your account securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">

              {/* Stepper */}
              <div className="flex items-center gap-0 mb-8">
                {stepLabels.map((label, idx) => {
                  const n = idx + 1;
                  const done = step > n;
                  const active = step === n;
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                          done ? "bg-primary border-primary text-primary-foreground"
                            : active ? "bg-primary/10 border-primary text-primary"
                            : "bg-secondary border-border text-muted-foreground"
                        }`}>
                          {done ? <Check className="w-4 h-4" /> : n}
                        </div>
                        <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-primary" : "text-muted-foreground"}`}>
                          {label}
                        </span>
                      </div>
                      {idx < stepLabels.length - 1 && (
                        <div className={`flex-1 h-px mx-2 mb-4 transition-colors ${step > n ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-foreground font-semibold text-lg mb-1">Enter Amount</h2>
                    <p className="text-muted-foreground text-sm">How much do you want to deposit?</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-md pl-7 pr-4 py-3 text-foreground font-mono text-lg focus:outline-none focus:border-primary/50 transition-colors"
                        data-testid="input-deposit-amount"
                      />
                    </div>
                    <p className="text-muted-foreground text-xs">Minimum deposit: $50.00</p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {["50", "100", "250", "500"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v)}
                        className={`py-2 rounded-md text-sm font-medium border transition-colors ${
                          amount === v
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                        }`}
                        data-testid={`quick-${v}`}
                      >
                        ${v}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!amount || parseFloat(amount) < 50}
                    className="w-full bg-primary text-primary-foreground font-semibold h-11 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="btn-continue-step1"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-foreground font-semibold text-lg mb-1">Select Currency & Network</h2>
                    <p className="text-muted-foreground text-sm">
                      Depositing <span className="text-foreground font-mono font-medium">${parseFloat(amount || "0").toFixed(2)}</span>
                    </p>
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium text-foreground block mb-1.5">Cryptocurrency</label>
                    <button
                      type="button"
                      onClick={() => setDropOpen(!dropOpen)}
                      className="w-full flex items-center justify-between bg-secondary border border-border rounded-md px-4 py-3 hover:border-primary/50 transition-colors"
                      data-testid="dropdown-crypto"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: coin.color + "33", border: `1px solid ${coin.color}55` }}>
                          <span style={{ color: coin.color }} className="text-[9px] font-bold">{coin.symbol[0]}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-foreground text-sm font-medium">{coin.name}</div>
                          <div className="text-muted-foreground text-xs">{coin.network}</div>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                    </button>

                    {dropOpen && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg overflow-hidden z-20 shadow-2xl">
                        {NETWORKS.map((n) => (
                          <button
                            key={n.symbol}
                            type="button"
                            onClick={() => { setCoin(n); setDropOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors border-b border-border last:border-0 ${n.symbol === coin.symbol ? "bg-primary/5" : ""}`}
                          >
                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: n.color + "33" }}>
                              <span style={{ color: n.color }} className="text-[10px] font-bold">{n.symbol[0]}</span>
                            </div>
                            <div>
                              <div className="text-foreground text-sm font-medium">{n.name}</div>
                              <div className="text-muted-foreground text-xs">{n.network}</div>
                            </div>
                            <div className="ml-auto text-muted-foreground text-xs font-mono">min {n.minDep} {n.symbol}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-none px-6 h-11 rounded-md bg-secondary border border-border text-foreground font-medium hover:bg-card transition-colors"
                      data-testid="btn-back-step2"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold h-11 rounded-md hover:bg-primary/90 transition-colors"
                      data-testid="btn-generate-address"
                    >
                      <QrCode className="w-4 h-4" />
                      Generate Address
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-foreground font-semibold text-lg mb-1">Deposit Address</h2>
                      <p className="text-muted-foreground text-sm">
                        Send <span className="text-foreground font-medium">{coin.name}</span> to this address
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-warning font-mono font-bold text-xl">{formatTime(timer)}</div>
                      <div className="text-muted-foreground text-xs">expires in</div>
                    </div>
                  </div>

                  {/* QR code */}
                  <div className="flex justify-center">
                    <div className="bg-white p-3 rounded-xl w-44 h-44 flex flex-wrap relative">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="w-[10%] h-[10%]" style={{ backgroundColor: (i * 37 + 11) % 3 === 0 ? "black" : "white" }} />
                      ))}
                      {[{ t: 8, l: 8 }, { t: 8, r: 8 }, { b: 8, l: 8 }].map((pos, i) => (
                        <div key={i} className="absolute w-8 h-8 border-[3px] border-black bg-white flex items-center justify-center"
                          style={{ top: pos.t, bottom: (pos as {b?: number}).b, left: pos.l, right: (pos as {r?: number}).r }}>
                          <div className="w-3 h-3 bg-black" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address box */}
                  <div className="bg-secondary border border-border rounded-lg p-4">
                    <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wider font-medium">Deposit Address</div>
                    <div className="font-mono text-xs text-foreground break-all leading-relaxed">{DUMMY_ADDRESS}</div>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors ${copied ? "text-success" : "text-primary hover:text-primary/80"}`}
                      data-testid="btn-copy-address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy Address"}
                    </button>
                  </div>

                  {/* Network info */}
                  <div className="bg-secondary border border-border rounded-lg px-4 py-3 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Network</span>
                    <span className="text-foreground text-sm font-medium">{coin.network}</span>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                      <p className="text-foreground/80 text-xs leading-relaxed">
                        Only send <strong className="text-foreground">{coin.symbol}</strong> on the{" "}
                        <strong className="text-foreground">{coin.network}</strong> network to this address.
                        Sending other assets will result in permanent loss.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    ← Start a new deposit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Deposit history */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-foreground font-semibold text-sm">Deposit History</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <ArrowUpRight className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-muted-foreground text-sm">No deposits yet</p>
              </div>
            </div>

            {/* Info card */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h3 className="text-foreground font-semibold text-sm">Deposit Info</h3>
              {[
                ["Min. Deposit", "$50.00"],
                ["Processing Time", "10–60 min"],
                ["Fee", "0%"],
                ["Daily Limit", "Unlimited"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground font-medium font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
