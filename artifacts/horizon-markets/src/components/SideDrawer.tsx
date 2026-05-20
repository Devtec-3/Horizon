import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { X, Search, Wallet, LayoutGrid, TrendingUp, BarChart2, ArrowUpRight, ArrowDownLeft, Bot } from "lucide-react";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const [location] = useLocation();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Trade", href: "/trade", icon: TrendingUp },
    { label: "Markets", href: "/markets", icon: BarChart2 },
    { label: "Deposit", href: "/deposit", icon: ArrowUpRight },
    { label: "Withdraw", href: "/withdraw", icon: ArrowDownLeft },
    { label: "Trading Bots", href: "/bots", icon: Bot },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-72 bg-[#111] z-50 flex flex-col border-l border-[#1e1e1e]"
          >
            <div className="flex justify-between items-center px-4 py-4 border-b border-[#1e1e1e]">
              <span className="text-white font-bold">Menu</span>
              <button onClick={onClose} data-testid="btn-close-menu">
                <X className="text-gray-400 hover:text-white w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00e676]"
                />
              </div>

              <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2 border border-[#2a2a2a] mb-4">
                <Wallet className="w-4 h-4 text-[#00e676]" />
                <span className="text-white font-bold text-sm">$0.00</span>
              </div>

              <div className="border-t border-[#2a2a2a] my-2" />

              <div className="flex flex-col gap-1 mt-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                          isActive
                            ? "bg-[#0f2a0f] text-[#00e676]"
                            : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </Link>
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
