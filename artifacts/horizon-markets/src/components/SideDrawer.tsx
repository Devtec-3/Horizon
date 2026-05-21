import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { X, Search, Wallet, LayoutGrid, TrendingUp, BarChart2, ArrowUpRight, ArrowDownLeft, Bot } from "lucide-react";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const [location, navigate] = useLocation();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Trade", href: "/trade", icon: TrendingUp },
    { label: "Markets", href: "/markets", icon: BarChart2 },
    { label: "Deposit", href: "/deposit", icon: ArrowUpRight },
    { label: "Withdraw", href: "/withdraw", icon: ArrowDownLeft },
    { label: "Trading Bots", href: "/bots", icon: Bot },
  ];

  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 40,
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: 288,
              background: "#111111",
              zIndex: 50,
              borderLeft: "1px solid #1e1e1e",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 16 }}>Menu</span>
              <button
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                data-testid="btn-close-menu"
              >
                <X size={20} color="#9ca3af" />
              </button>
            </div>

            <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Wallet Balance */}
              <div
                style={{
                  background: "#111111",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                  border: "1px solid #1e1e1e",
                }}
              >
                <Wallet size={16} color="#00e676" />
                <span style={{ color: "#ffffff", fontWeight: 600, fontSize: 14 }}>$0.00</span>
              </div>

              {/* Search */}
              <div
                style={{
                  background: "#111111",
                  borderRadius: 10,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                  border: "1px solid #1e1e1e",
                }}
              >
                <Search size={14} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: 13,
                    width: "100%",
                  }}
                  className="placeholder:text-gray-500"
                />
              </div>

              <div style={{ borderTop: "1px solid #2a2a2a", margin: "12px 0" }} />

              {/* Nav items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNav(item.href)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 10,
                        cursor: "pointer",
                        background: isActive ? "#0d2b15" : "transparent",
                        color: isActive ? "#00e676" : "#ffffff",
                        border: "none",
                        textAlign: "left",
                        width: "100%",
                        transition: "background 0.15s",
                      }}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      <Icon
                        size={16}
                        color={isActive ? "#00e676" : "#9ca3af"}
                      />
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
