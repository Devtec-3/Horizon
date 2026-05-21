import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle top accent */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <h2 className="text-foreground text-xl font-bold mb-1">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-6">Sign in to your Horizon Markets account</p>

          <form onSubmit={handleSubmit(() => login())} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-foreground text-sm font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-foreground text-sm font-medium">Password</label>
                <a href="#" className="text-primary text-xs hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                required
                className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold h-10 rounded-md hover:bg-primary/90 transition-colors text-sm mt-2"
              data-testid="btn-login"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
