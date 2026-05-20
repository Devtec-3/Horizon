import { Link } from "wouter";
import { User, LogOut, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

interface AuthHeaderProps {
  onMenuClick: () => void;
}

export function AuthHeader({ onMenuClick }: AuthHeaderProps) {
  const { logout } = useAuth();

  return (
    <div className="bg-black px-4 py-3 flex justify-between items-center sticky top-0 z-30 border-b border-[#1e1e1e]">
      <Link href="/dashboard" className="cursor-pointer">
        <Logo />
      </Link>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a]">
          <User className="text-white w-4 h-4" />
        </div>
        <button onClick={logout} data-testid="btn-logout">
          <LogOut className="text-red-500 w-5 h-5" />
        </button>
        <button onClick={onMenuClick} data-testid="btn-menu">
          <Menu className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
