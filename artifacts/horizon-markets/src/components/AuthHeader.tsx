import { Link, useLocation } from "wouter";
import { User, LogOut, Menu, Search, Wallet, BarChart2, TrendingUp, LayoutDashboard, Bot, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

interface AuthHeaderProps {
  onMenuClick: () => void;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trade", label: "Trade", icon: TrendingUp },
  { href: "/markets", label: "Markets", icon: BarChart2 },
  { href: "/deposit", label: "Deposit", icon: ArrowUpRight },
  { href: "/withdraw", label: "Withdraw", icon: ArrowDownLeft },
  { href: "/bots", label: "Bots", icon: Bot },
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

          {/* Horizontal nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = location === href;
              return (
                <Link key={href} href={href}>
                  <button
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
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

        {/* Center: Search bar — hidden until lg */}
        <div className="hidden lg:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search markets…"
              className="w-full pl-9 pr-3 py-1.5 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Right: Balance + icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Balance — hidden on tiny screens */}
          <div className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md bg-card border border-border">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium font-mono text-foreground">$0.00</span>
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="h-9 w-9 flex items-center justify-center rounded-md text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
            data-testid="btn-profile"
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="h-9 w-9 flex items-center justify-center rounded-md text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
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
