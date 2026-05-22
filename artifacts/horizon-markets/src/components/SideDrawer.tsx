import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  X, Search, Wallet, LayoutDashboard, TrendingUp, BarChart2,
  ArrowUpRight, ArrowDownLeft, Bot,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard",  href: "/dashboard", icon: LayoutDashboard },
  { label: "Trade",      href: "/trade",      icon: TrendingUp      },
  { label: "Markets",    href: "/markets",    icon: BarChart2       },
  { label: "Deposit",    href: "/deposit",    icon: ArrowUpRight    },
  { label: "Withdraw",   href: "/withdraw",   icon: ArrowDownLeft   },
  { label: "Bots",       href: "/bots",       icon: Bot             },
];

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const [location, navigate] = useLocation();

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
            {/* Header: "Menu" title + X */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <span className="text-foreground font-bold text-lg tracking-tight">Menu</span>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                data-testid="btn-close-menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    style={isActive ? { background: "#00e676" } : {}}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-muted-foreground"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Wallet balance */}
            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium font-mono text-foreground">$0.00</span>
              </div>
            </div>

            {/* Search input */}
            <div className="px-4 pb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-full pl-9 bg-secondary border border-border rounded-md py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
