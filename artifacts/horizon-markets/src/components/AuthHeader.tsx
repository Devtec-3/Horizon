import { useLocation } from "wouter";
import { User, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

interface AuthHeaderProps {
  onMenuClick: () => void;
}

export function AuthHeader({ onMenuClick }: AuthHeaderProps) {
  const { logout } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div
      style={{
        background: "#000000",
        borderBottom: "1px solid #111111",
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        <Logo />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          onClick={() => navigate("/profile")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          data-testid="btn-profile"
        >
          <User size={22} color="#ffffff" strokeWidth={1.75} />
        </button>

        <button
          onClick={logout}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          data-testid="btn-logout"
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>

        <button
          onClick={onMenuClick}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          data-testid="btn-menu"
        >
          <Menu size={22} color="#ffffff" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
