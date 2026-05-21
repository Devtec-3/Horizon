import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, Search } from "lucide-react";

const COUNTRIES = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+225", flag: "🇨🇮", name: "Ivory Coast" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
];

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

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = () => {
    login();
  };

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-4 py-8"
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
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="mb-6 text-center">
          <h2 style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>
            Create an account
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 6 }}>
            Start trading crypto with Horizon Markets
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-first-name"
            />
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-last-name"
            />
          </div>

          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#00e676")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            data-testid="input-email"
          />

          <div className="flex gap-2 relative">
            <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => { setCountryOpen(!countryOpen); setCountrySearch(""); }}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 10,
                  padding: "13px 10px",
                  color: "#ffffff",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  height: "100%",
                }}
                data-testid="btn-country-dropdown"
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
                <ChevronDown size={12} color="#9ca3af" />
              </button>

              {countryOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    width: 240,
                    background: "#111111",
                    border: "1px solid #2a2a2a",
                    borderRadius: 10,
                    zIndex: 50,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      borderBottom: "1px solid #222",
                      padding: "10px 14px",
                      background: "#0f0f0f",
                    }}
                  >
                    <Search size={14} color="#6b7280" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#ffffff",
                        fontSize: 13,
                        width: "100%",
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: 220, overflowY: "auto" }}>
                    {filteredCountries.map((c, i) => (
                      <div
                        key={`${c.name}-${i}`}
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 14px",
                          borderBottom: "1px solid #1a1a1a",
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.background = "#222")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.background = "transparent")
                        }
                      >
                        <span style={{ fontSize: 18 }}>{c.flag}</span>
                        <span style={{ color: "#ffffff", flex: 1 }}>{c.name}</span>
                        <span style={{ color: "#6b7280" }}>{c.code}</span>
                      </div>
                    ))}
                    {filteredCountries.length === 0 && (
                      <div style={{ color: "#6b7280", fontSize: 13, padding: "12px 14px" }}>
                        No results
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone number"
              style={{ ...inputStyle, flex: 1 }}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
              data-testid="input-phone"
            />
          </div>

          <input
            {...register("password")}
            type="password"
            placeholder="Create a password"
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#00e676")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            data-testid="input-password"
          />

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm your password"
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#00e676")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            data-testid="input-confirm-password"
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#00e676",
              color: "#000000",
              fontWeight: 700,
              fontSize: 16,
              padding: 14,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              marginTop: 4,
            }}
            data-testid="btn-register"
          >
            Create account
          </button>
        </form>

        <div className="mt-5 text-center" style={{ fontSize: 13 }}>
          <span style={{ color: "#9ca3af" }}>Already have an account? </span>
          <Link href="/login" style={{ color: "#00e676", fontWeight: 500 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
