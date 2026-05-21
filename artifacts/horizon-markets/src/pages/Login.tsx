import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: 10,
  padding: "13px 14px",
  color: "#ffffff",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  color: "#ffffff",
  fontWeight: 500,
  fontSize: 14,
  display: "block",
  marginBottom: 6,
};

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = () => {
    login();
  };

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-4"
      style={{ maxWidth: 430, margin: "0 auto" }}
    >
      <div
        style={{
          background: "#111111",
          border: "1px solid #1e1e1e",
          borderRadius: 20,
          padding: "32px 24px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div className="flex justify-center" style={{ marginBottom: 24 }}>
          <Logo />
        </div>

        <div className="text-center" style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>
            Welcome back
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 6 }}>
            Sign in to your Horizon Markets account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-email"
            />
          </div>

          <div style={{ marginBottom: 6 }}>
            <label style={labelStyle}>Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-password"
            />
          </div>

          <div className="text-right" style={{ marginBottom: 20 }}>
            <a
              href="#"
              style={{ color: "#00e676", fontSize: 13, cursor: "pointer" }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#00e676",
              border: "none",
              color: "#000000",
              fontSize: 16,
              fontWeight: 700,
              padding: 14,
              borderRadius: 10,
              cursor: "pointer",
              marginBottom: 16,
            }}
            data-testid="btn-login"
          >
            Sign in
          </button>
        </form>

        <div className="text-center" style={{ fontSize: 13 }}>
          <span style={{ color: "#9ca3af" }}>Don't have an account? </span>
          <Link href="/register" style={{ color: "#00e676", fontWeight: 500 }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
