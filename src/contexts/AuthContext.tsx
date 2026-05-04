import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => false,
  logout: () => {},
});

// SHA-256 hash van het admin-wachtwoord. Het wachtwoord zelf staat NIET in de code.
// Let op: dit is obfuscatie, geen echte beveiliging. Voor sterke beveiliging is
// een backend met server-side authenticatie (Lovable Cloud) nodig.
const ADMIN_PASSWORD_HASH =
  "1e6ee8e39beea1b2bc48e4aa15f986823a52f5d89b0543244c73fa1eb195f4bb";

async function sha256(message: string): Promise<string> {
  const buffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_logged_in");
    if (stored === "true") setIsLoggedIn(true);
  }, []);

  const login = async (password: string) => {
    const hash = await sha256(password);
    if (hash === ADMIN_PASSWORD_HASH) {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_logged_in", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_logged_in");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
