import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  X, Search, Wallet, LayoutDashboard, TrendingUp, BarChart2,
  ArrowUpRight, ArrowDownLeft, Bot, User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Trade", href: "/trade", icon: TrendingUp },
  { label: "Markets", href: "/markets", icon: BarChart2 },
  { label: "Deposit", href: "/deposit", icon: ArrowUpRight },
  { label: "Withdraw", href: "/withdraw", icon: ArrowDownLeft },
  { label: "Trading Bots", href: "/bots", icon: Bot },
  { label: "Profile", href: "/profile", icon: User },
];

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const [location, navigate] = useLocation();
  const { username } = useAuth();

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-72 bg-card z-50 flex flex-col border-l border-border md:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-border">
              <div>
                <p className="text-foreground font-semibold text-sm">{username}</p>
                <p className="text-muted-foreground text-xs mt-0.5">Active Trader</p>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                data-testid="btn-close-menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Balance */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium font-mono text-foreground">$0.00</span>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-full pl-9 bg-secondary border-border rounded-md py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 border transition-colors"
                />
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="pt-4 border-t border-border px-4 pb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-[10px] font-bold">{username[0]?.toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium font-mono text-foreground">{username}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
