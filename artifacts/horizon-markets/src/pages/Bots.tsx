import { useState, useRef } from "react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";

const G = "#00e676";
const CARD: React.CSSProperties = {
  background: "#111111",
  border: "1px solid #1e1e1e",
  borderRadius: 14,
  padding: 18,
};

export default function Bots() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [tradeAmount, setTradeAmount] = useState("10");
  const [interval, setIntervalVal] = useState("1 minute");
  const [asset, setAsset] = useState("EUR/USD");
  const fileRef = useRef<HTMLInputElement>(null);

  const inputStyle: React.CSSProperties = {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    padding: "12px 14px",
    color: "white",
    fontSize: 14,
    outline: "none",
    width: "100%",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full pb-10">

        {/* Page header */}
        <div style={{ padding: "20px 16px 0", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ background: "#0d2b15", borderRadius: 12, padding: 10, flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 22 }}>Trading Bots</div>
            <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>Automate your trading strategy</div>
          </div>
        </div>

        {/* Card 1: Upload Trading Bot */}
        <div style={{ ...CARD, margin: "16px 16px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: 15, letterSpacing: "0.05em" }}>
              UPLOAD TRADING BOT
            </span>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${G}`,
              borderRadius: 12,
              padding: "36px 20px",
              textAlign: "center",
              marginBottom: 14,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 48, height: 48, background: "#1a1a1a",
                borderRadius: "50%", margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginTop: 12 }}>
              Drag &amp; drop your bot file here
            </div>
            <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>or click to browse</div>
            <div style={{ color: "#6b7280", fontSize: 11, marginTop: 6 }}>
              Supports .py, .js, .ts, .json, .zip files
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".py,.js,.ts,.json,.zip"
            className="hidden"
          />

          {/* Upload button */}
          <button
            style={{
              width: "100%", background: G, color: "#000",
              fontSize: 14, fontWeight: 700,
              padding: 13, borderRadius: 10, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            data-testid="btn-upload-bot"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Upload Trading Bot
          </button>
        </div>

        {/* Divider — OR */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 16px 14px" }}>
          <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
          <span style={{ color: "#9ca3af", fontSize: 13 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
        </div>

        {/* Card 2: Activate with Passkey */}
        <div style={{ ...CARD, margin: "0 16px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: 15, letterSpacing: "0.05em" }}>
              ACTIVATE WITH PASSKEY
            </span>
          </div>
          <div style={{ borderTop: "1px solid #1e1e1e", margin: "12px 0" }} />
          <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6, marginBottom: 14, textAlign: "center" }}>
            Already have a trading bot passkey? Enter it below to activate your bot instantly.
          </p>

          {/* Passkey input */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter your trading bot passkey"
              style={{ background: "none", border: "none", color: "white", fontSize: 14, outline: "none", flex: 1 }}
              data-testid="input-passkey"
            />
          </div>

          {/* Submit button */}
          <button
            style={{
              width: "100%", background: G, color: "#000",
              fontSize: 14, fontWeight: 700,
              padding: 13, borderRadius: 10, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            data-testid="btn-submit-passkey"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Submit Passkey
          </button>

          <p style={{ color: "#9ca3af", fontSize: 11, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
            Passkeys are provided by authorized bot developers.
            <br />Contact support if you need assistance.
          </p>
        </div>

        {/* Card 3: Bot Settings */}
        <div style={{ ...CARD, margin: "0 16px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Bot Settings</span>
          </div>
          <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 16 }}>Configure your bot before starting</div>

          {/* Trade Amount */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 6 }}>
              Trade Amount ($)
            </label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              style={inputStyle}
              data-testid="input-trade-amount"
            />
          </div>

          {/* Trade Interval */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 6 }}>
              Trade Interval
            </label>
            <select
              value={interval}
              onChange={(e) => setIntervalVal(e.target.value)}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              data-testid="select-interval"
            >
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>1 hour</option>
              <option>1 day</option>
            </select>
          </div>

          {/* Trading Asset */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: 13, display: "block", marginBottom: 6 }}>
              Trading Asset
            </label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              data-testid="select-asset"
            >
              <option>EUR/USD</option>
              <option>BTC/USDT</option>
              <option>ETH/USDT</option>
              <option>BNB/USDT</option>
              <option>SOL/USDT</option>
            </select>
          </div>
        </div>

        {/* Card 4: My Bots */}
        <div style={{ ...CARD, margin: "0 16px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>My Bots (0)</span>
          </div>

          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 40, color: "#4b5563" }}>🤖</div>
            <div style={{ color: "white", fontSize: 14, marginTop: 8 }}>No bots added yet</div>
            <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 4 }}>
              Enter a passkey above to add a trading bot
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
