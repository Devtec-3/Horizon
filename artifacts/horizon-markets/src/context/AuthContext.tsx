import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { customFetch } from "@workspace/api-client-react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    customFetch<{ user: User }>("/api/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const data = await customFetch<{ user: User }>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setUser(data.user);
      setLocation("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setError(null);
    try {
      const data = await customFetch<{ user: User }>("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      setUser(data.user);
      setLocation("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    }
  };

  const logout = async () => {
    await customFetch("/api/logout", { method: "POST" });
    setUser(null);
    setLocation("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        username: user?.username ?? "",
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
