import { useState } from "react";
import { User, Mail, Phone, Shield, Hash, ArrowLeft, Edit2, Check } from "lucide-react";
import { useLocation } from "wouter";
import { AuthHeader } from "@/components/AuthHeader";
import { SideDrawer } from "@/components/SideDrawer";
import { TickerBar } from "@/components/TickerBar";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, navigate] = useLocation();
  const { username } = useAuth();

  const infoRows = [
    { icon: User,   label: "Full Name",  value: username, editable: true  },
    { icon: Mail,   label: "Email",      value: "abdulwadud@horizonmarkets.com", editable: false },
    { icon: Phone,  label: "Phone",      value: "+1 (555) 000-0000", editable: true  },
    { icon: Hash,   label: "User ID",    value: "563d0625-435a-467d-b1fd-d5c92e4a…", editable: false },
  ];

  const securityRows = [
    { label: "Password",              status: "Updated 30 days ago",     done: true  },
    { label: "Two-Factor Auth (2FA)", status: "Not enabled",             done: false },
    { label: "Anti-Phishing Code",   status: "Not set",                  done: false },
    { label: "Login History",        status: "Last login: just now",     done: true  },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <TickerBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
          data-testid="btn-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Avatar + balance */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <User className="w-9 h-9 text-primary" />
              </div>
              <h2 className="text-foreground font-bold text-lg">{username}</h2>
              <p className="text-muted-foreground text-sm mb-4">Active Trader</p>

              {/* Verified badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "#16532d", border: "1px solid #00ff88", color: "#00ff88" }}>
                <Shield className="w-3 h-3" />
                Verified
              </div>
            </div>

            {/* Balance card */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-muted-foreground text-xs mb-1">Total Portfolio</p>
              <p className="text-foreground font-bold text-3xl font-mono">$0.00</p>
              <p className="text-muted-foreground text-xs mt-1">USDT equivalent</p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => navigate("/deposit")}
                  className="py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Deposit
                </button>
                <button
                  onClick={() => navigate("/withdraw")}
                  className="py-2 rounded-md text-sm font-medium bg-secondary border border-border text-foreground hover:bg-card transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Right: Info + security */}
          <div className="lg:col-span-2 space-y-4">
            {/* Personal info */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-foreground font-semibold">Personal Information</h3>
                <button className="flex items-center gap-1.5 text-primary text-sm hover:text-primary/80 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
              <div>
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center px-5 py-4 border-b border-border last:border-0">
                      <Icon className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
                      <span className="text-muted-foreground text-sm w-32 shrink-0">{row.label}</span>
                      <span className="text-foreground text-sm font-medium flex-1 truncate">{row.value}</span>
                      {row.editable && (
                        <button className="text-primary text-xs hover:text-primary/80 transition-colors shrink-0 ml-2">Edit</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Security settings */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-foreground font-semibold">Security Settings</h3>
              </div>
              <div>
                {securityRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${row.done ? "bg-success/10" : "bg-secondary"}`}>
                        {row.done
                          ? <Check className="w-3.5 h-3.5 text-success" />
                          : <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                        }
                      </div>
                      <div>
                        <div className="text-foreground text-sm font-medium">{row.label}</div>
                        <div className={`text-xs ${row.done ? "text-muted-foreground" : "text-warning"}`}>{row.status}</div>
                      </div>
                    </div>
                    <button className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      row.done
                        ? "text-muted-foreground bg-secondary hover:bg-card"
                        : "text-primary-foreground bg-primary hover:bg-primary/90"
                    }`}>
                      {row.done ? "Manage" : "Enable"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
