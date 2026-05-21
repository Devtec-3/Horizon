import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, Search } from "lucide-react";

const COUNTRIES = [
  { code: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+7",   flag: "🇷🇺", name: "Russia" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+225", flag: "🇨🇮", name: "Ivory Coast" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "+54",  flag: "🇦🇷", name: "Argentina" },
  { code: "+56",  flag: "🇨🇱", name: "Chile" },
  { code: "+57",  flag: "🇨🇴", name: "Colombia" },
  { code: "+51",  flag: "🇵🇪", name: "Peru" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+64",  flag: "🇳🇿", name: "New Zealand" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "+66",  flag: "🇹🇭", name: "Thailand" },
  { code: "+84",  flag: "🇻🇳", name: "Vietnam" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+90",  flag: "🇹🇷", name: "Turkey" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+971", flag: "🇧🇭", name: "Bahrain" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+32",  flag: "🇧🇪", name: "Belgium" },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "+43",  flag: "🇦🇹", name: "Austria" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "+45",  flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48",  flag: "🇵🇱", name: "Poland" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+30",  flag: "🇬🇷", name: "Greece" },
  { code: "+40",  flag: "🇷🇴", name: "Romania" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+36",  flag: "🇭🇺", name: "Hungary" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+1",   flag: "🇯🇲", name: "Jamaica" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
];

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const dropRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setCountryOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <h2 className="text-foreground text-xl font-bold mb-1">Create account</h2>
          <p className="text-muted-foreground text-sm mb-6">Join 4.2M+ traders on Horizon Markets</p>

          <form onSubmit={handleSubmit(() => login())} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                {...register("firstName")}
                type="text"
                placeholder="First name"
                required
                className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-first-name"
              />
              <input
                {...register("lastName")}
                type="text"
                placeholder="Last name"
                required
                className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-last-name"
              />
            </div>

            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              required
              className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-email"
            />

            {/* Phone + country code */}
            <div className="flex gap-2">
              <div ref={dropRef} className="relative">
                <button
                  type="button"
                  onClick={() => { setCountryOpen(!countryOpen); setCountrySearch(""); }}
                  className="flex items-center gap-1.5 h-10 px-2 bg-secondary border border-border rounded-md text-sm text-foreground hover:border-primary/50 transition-colors whitespace-nowrap"
                  data-testid="btn-country-dropdown"
                >
                  <span>{selectedCountry.flag}</span>
                  <span className="text-muted-foreground">{selectedCountry.code}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                {countryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-card border border-border rounded-lg overflow-hidden z-50 shadow-2xl">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary">
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                      {filtered.map((c, i) => (
                        <button
                          key={`${c.name}-${i}`}
                          type="button"
                          onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left border-b border-border/50 last:border-0"
                        >
                          <span className="text-base">{c.flag}</span>
                          <span className="flex-1 truncate">{c.name}</span>
                          <span className="text-muted-foreground text-xs font-mono shrink-0">{c.code}</span>
                        </button>
                      ))}
                      {filtered.length === 0 && (
                        <p className="text-muted-foreground text-xs px-3 py-3">No results</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone number"
                className="flex-1 bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-phone"
              />
            </div>

            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              required
              className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-password"
            />

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              required
              className="w-full bg-secondary border border-border rounded-md h-10 px-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
              data-testid="input-confirm-password"
            />

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold h-10 rounded-md hover:bg-primary/90 transition-colors text-sm mt-1"
              data-testid="btn-register"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm mt-5 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
