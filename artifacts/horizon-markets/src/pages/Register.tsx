import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="bg-[#111] rounded-2xl p-8 w-full max-w-md border border-[#1e1e1e] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00e676] to-transparent opacity-50" />
        
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="mb-8 text-center">
          <h2 className="text-white text-2xl font-bold">Create an account</h2>
          <p className="text-gray-400 text-sm mt-2">Start trading crypto with Horizon Markets</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
              required
            />
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
              required
            />
          </div>
          
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
            required
          />
          
          <div className="flex gap-2">
            <select 
              className="w-24 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-2 text-white focus:outline-none focus:border-[#00e676] transition-colors appearance-none"
            >
              <option>🇺🇸 +1</option>
              <option>🇬🇧 +44</option>
              <option>🇯🇵 +81</option>
            </select>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone number"
              className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
            />
          </div>
          
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
            required
          />
          
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-11 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00e676] transition-colors"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#00e676] text-black font-bold h-12 rounded-lg hover:bg-green-400 transition-colors mt-2"
            data-testid="btn-register"
          >
            Create account
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Already have account? </span>
          <Link href="/login" className="text-[#00e676] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
