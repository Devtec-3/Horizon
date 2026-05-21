import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, Copy, QrCode, Clock } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "USDT", name: "Tether", color: "#26A17B" },
  { symbol: "USDC", name: "USD Coin", color: "#2775CA" },
  { symbol: "TRX", name: "Tron", color: "#EF0027" },
];

const inputStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: 10,
  padding: "13px 14px",
  color: "#ffffff",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Deposit() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("100.00");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timer, setTimer] = useState(3600);

  const dummyAddress = "TJn8xMqkZ4QvEZb4M2H5u8nB3LpWk9F2p";

  useEffect(() => {
    if (activeStep === 3) {
      setTimer(3600);
      const id = setInterval(() => {
        setTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
      return () => clearInterval(id);
    }
  }, [activeStep]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyAddress);
  };

  const stepLineWidth = activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%";

  return (
    <div className="min-h-screen bg-black flex flex-col" style={{ maxWidth: 430, margin: "0 auto" }}>
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div style={{ maxWidth: 400, margin: "0 auto", width: "100%", padding: "32px 16px 48px", flex: 1 }}>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#1a1a1a", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, height: 2, background: "#00e676", zIndex: 1, width: stepLineWidth, transition: "width 0.3s" }} />
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                zIndex: 2,
                background: activeStep >= step ? "#00e676" : "#111111",
                border: `2px solid ${activeStep >= step ? "#00e676" : "#2a2a2a"}`,
                color: activeStep >= step ? "#000000" : "#9ca3af",
              }}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {activeStep === 1 && (
          <div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Enter Amount</h2>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>How much do you want to deposit?</p>

            <div style={{ marginBottom: 24 }}>
              <label style={{ color: "#9ca3af", fontSize: 14, fontWeight: 500, display: "block", marginBottom: 6 }}>
                Amount (USD)
              </label>
              <div style={{ display: "flex", alignItems: "center", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10 }}>
                <span style={{ color: "#6b7280", fontSize: 18, paddingLeft: 14 }}>$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ ...inputStyle, border: "none", paddingLeft: 8, borderRadius: 0 }}
                  data-testid="input-deposit-amount"
                />
              </div>
              <p style={{ color: "#9ca3af", fontSize: 12, marginTop: 6 }}>Minimum deposit: $50</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 32 }}>
              {["50", "100", "250", "500"].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  style={{
                    background: "transparent",
                    border: "1px solid #2a2a2a",
                    color: "#ffffff",
                    borderRadius: 10,
                    padding: "8px 0",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                  data-testid={`quick-${val}`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveStep(2)}
              disabled={!amount || parseFloat(amount) < 50}
              style={{
                width: "100%",
                background: "#00e676",
                color: "#000000",
                fontWeight: 700,
                height: 48,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                opacity: !amount || parseFloat(amount) < 50 ? 0.5 : 1,
              }}
              data-testid="btn-continue-step1"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {activeStep === 2 && (
          <div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
              Select Currency & Network
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>
              Depositing{" "}
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                ${parseFloat(amount || "0").toFixed(2)}
              </span>
            </p>

            <div style={{ position: "relative", marginBottom: 32 }}>
              <label style={{ color: "#9ca3af", fontSize: 14, fontWeight: 500, display: "block", marginBottom: 6 }}>
                Select Cryptocurrency
              </label>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 10,
                  padding: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                data-testid="dropdown-crypto"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: selectedCrypto.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>{selectedCrypto.symbol.slice(0, 3)}</span>
                  </div>
                  <span style={{ color: "#ffffff", fontWeight: 500 }}>{selectedCrypto.name}</span>
                </div>
                <ChevronDown
                  size={16}
                  color="#9ca3af"
                  style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                />
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 10,
                    overflow: "hidden",
                    zIndex: 10,
                  }}
                >
                  {cryptos.map((c) => (
                    <div
                      key={c.symbol}
                      onClick={() => { setSelectedCrypto(c); setDropdownOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: 14,
                        borderBottom: "1px solid #1a1a1a",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#2a2a2a")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: c.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>{c.symbol.slice(0, 3)}</span>
                      </div>
                      <div>
                        <div style={{ color: "#ffffff", fontWeight: 500, fontSize: 14 }}>{c.name}</div>
                        <div style={{ color: "#9ca3af", fontSize: 12 }}>{c.symbol}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12 }}>
              <button
                onClick={() => setActiveStep(1)}
                style={{
                  background: "transparent",
                  border: "1px solid #2a2a2a",
                  color: "#ffffff",
                  fontWeight: 500,
                  padding: "0 24px",
                  height: 48,
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 14,
                }}
                data-testid="btn-back-step2"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(3)}
                style={{
                  background: "#00e676",
                  color: "#000000",
                  fontWeight: 700,
                  height: 48,
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 14,
                }}
                data-testid="btn-generate-address"
              >
                <QrCode size={16} />
                Generate Address
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {activeStep === 3 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Deposit Address</h2>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16 }}>
              Send <span style={{ color: "#ffffff", fontWeight: 600 }}>{selectedCrypto.name}</span> to this address
            </p>

            {/* Countdown Timer */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 18, fontVariantNumeric: "tabular-nums" }}>
                {formatTime(timer)}
              </span>
              <span style={{ color: "#9ca3af", fontSize: 12, display: "block", marginTop: 2 }}>Address expires in</span>
            </div>

            {/* QR Code */}
            <div
              style={{
                background: "#ffffff",
                padding: 12,
                borderRadius: 12,
                width: 192,
                height: 192,
                display: "flex",
                flexWrap: "wrap",
                position: "relative",
                marginBottom: 24,
              }}
            >
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "10%",
                    height: "10%",
                    backgroundColor: Math.random() > 0.4 ? "black" : "white",
                  }}
                />
              ))}
              <div style={{ position: "absolute", top: 16, left: 16, width: 32, height: 32, border: "4px solid black", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 12, height: 12, background: "black" }} />
              </div>
              <div style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, border: "4px solid black", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 12, height: 12, background: "black" }} />
              </div>
              <div style={{ position: "absolute", bottom: 16, left: 16, width: 32, height: 32, border: "4px solid black", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 12, height: 12, background: "black" }} />
              </div>
            </div>

            {/* Address */}
            <div
              style={{
                width: "100%",
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 10,
                padding: 12,
                position: "relative",
                marginBottom: 24,
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#9ca3af", wordBreak: "break-all", textAlign: "center" }}>
                {dummyAddress}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#00e676",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  margin: "8px auto 0",
                }}
                data-testid="btn-copy-address"
              >
                <Copy size={14} />
                Copy Address
              </button>
            </div>

            <button
              onClick={() => setActiveStep(1)}
              style={{ color: "#6b7280", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}
            >
              Start New Deposit
            </button>
          </div>
        )}

        {/* Deposit History */}
        {activeStep === 1 && (
          <div style={{ marginTop: 48, borderTop: "1px solid #1e1e1e", paddingTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Clock size={18} color="#9ca3af" />
              <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: 16 }}>Deposit History</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
              <ArrowUpRight size={28} color="#4b5563" style={{ marginBottom: 8 }} />
              <p style={{ color: "#9ca3af", fontSize: 14 }}>No deposit history</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
