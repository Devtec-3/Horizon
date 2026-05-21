import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, User, Mail, Phone, Shield, Hash } from "lucide-react";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, navigate] = useLocation();
  const { username } = useAuth();

  const rows = [
    { icon: User, label: "Full Name", value: username },
    { icon: Mail, label: "Email", value: "abdulwadud@horizonmarkets.com", small: true },
    { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
    { icon: Hash, label: "User ID", value: "563d0625-435a-467d-b1fd-d5...", gray: true },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col" style={{ maxWidth: 430, margin: "0 auto" }}>
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div style={{ padding: "16px 16px 40px" }}>
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "#9ca3af",
            fontSize: 14,
            cursor: "pointer",
            padding: 0,
            marginBottom: 20,
          }}
          data-testid="btn-back"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Avatar + Name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0d2b15, #00e676)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <User size={32} color="#000000" />
          </div>
          <h2 style={{ color: "#ffffff", fontWeight: 800, fontSize: 20 }}>{username}</h2>
          <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>Active Trader</p>
        </div>

        {/* Account Status Card */}
        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} color="#9ca3af" />
              <span style={{ color: "#9ca3af", fontSize: 13 }}>Account Status</span>
            </div>
            <span
              style={{
                background: "#16532d",
                border: "1px solid #00e676",
                color: "#00e676",
                borderRadius: 8,
                padding: "4px 14px",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Verified
            </span>
          </div>
        </div>

        {/* Personal Info Card */}
        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          {rows.map((row, i) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderBottom: i < rows.length - 1 ? "1px solid #1a1a1a" : "none",
                }}
              >
                <Icon size={16} color="#9ca3af" style={{ marginRight: 10, flexShrink: 0 }} />
                <span style={{ color: "#9ca3af", fontSize: 13, flex: 1 }}>{row.label}</span>
                <span
                  style={{
                    color: row.gray ? "#9ca3af" : "#ffffff",
                    fontSize: row.small ? 12 : 13,
                    fontWeight: 500,
                    textAlign: "right",
                    maxWidth: "55%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Balance Card */}
        <div
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>Total Balance</div>
          <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 28, fontVariantNumeric: "tabular-nums" }}>
            $0.00
          </div>
          <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>USDT equivalent</div>
        </div>
      </div>
    </div>
  );
}
