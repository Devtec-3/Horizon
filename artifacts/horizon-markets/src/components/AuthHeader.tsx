import { Link, useLocation } from "wouter";
import { LogOut, Menu, Search, Wallet, BarChart2, TrendingUp, LayoutDashboard, Bot, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

interface AuthHeaderProps {
  onMenuClick: () => void;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trade",     label: "Trade",     icon: TrendingUp },
  { href: "/markets",   label: "Markets",   icon: BarChart2 },
  { href: "/deposit",   label: "Deposit",   icon: ArrowUpRight },
  { href: "/withdraw",  label: "Withdraw",  icon: ArrowDownLeft },
  { href: "/bots",      label: "Bots",      icon: Bot },
];

export function AuthHeader({ onMenuClick }: AuthHeaderProps) {
  const { logout } = useAuth();
  const [location, navigate] = useLocation();

  return (
    <header className="sticky top-0 z-50 h-14 sm:h-16 border-b border-border bg-black/90 backdrop-blur-lg flex-shrink-0">
      <div className="flex h-full items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4">

        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/dashboard" className="flex items-center cursor-pointer shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = location === href;
              return (
                <Link key={href} href={href}>
                  <button
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#00e676]/10 text-[#00e676]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Search — lg only */}
        <div className="hidden lg:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search markets…"
              className="w-full pl-9 pr-3 py-1.5 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00e676] transition-colors"
            />
          </div>
        </div>

        {/* Right: Balance + icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md bg-card border border-border">
            <Wallet className="h-4 w-4 text-[#00e676]" />
            <span className="text-xs sm:text-sm font-medium font-mono text-foreground">$0.00</span>
          </div>

          {/* Profile — WHITE icon */}
          <button
            onClick={() => navigate("/profile")}
            className="h-9 w-9 flex items-center justify-center rounded-md text-white hover:text-white/80 hover:bg-white/10 transition-colors"
            data-testid="btn-profile"
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {/* Logout — RED */}
          <button
            onClick={logout}
            className="h-9 w-9 flex items-center justify-center rounded-md transition-colors hover:bg-[#ef4444]/10"
            style={{ color: "#ef4444" }}
            data-testid="btn-logout"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuClick}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            data-testid="btn-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
