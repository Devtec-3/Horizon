import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#111] rounded-2xl p-8 w-full max-w-md border border-[#1e1e1e] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00e676] to-transparent opacity-50" />
        
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="mb-8 text-center">
          <h2 className="text-white text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to your trading account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
              required
            />
          </div>
          
          <div className="space-y-1">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-[#00e676] text-sm hover:underline">Forgot password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#00e676] text-black font-bold h-12 rounded-lg hover:bg-green-400 transition-colors mt-2"
            data-testid="btn-login"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link href="/register" className="text-[#00e676] hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
