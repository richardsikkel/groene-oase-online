import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Training", path: "/training" },
  { label: "Actueel", path: "/actueel" },
  { label: "Agenda", path: "/agenda" },
  { label: "Sponsors", path: "/sponsors" },
  { label: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">GO</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground hidden sm:inline">
              De Groene Oase
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {location.pathname === item.path && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
                <LogOut className="h-4 w-4 mr-1" /> Uitloggen
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="ml-2">
                  <LogIn className="h-4 w-4 mr-1" /> Admin
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t bg-background p-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block px-4 py-2 text-sm text-muted-foreground">
                Uitloggen
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-muted-foreground">
                Admin Login
              </Link>
            )}
          </motion.nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-forest text-primary-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">De Groene Oase</h3>
              <p className="text-sm opacity-80">
                Touwtrekvereniging met passie voor de sport en een gezellige sfeer.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Navigatie</h4>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Contact</h4>
              <p className="text-sm opacity-80">info@degroeneoase.nl</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
            © {new Date().getFullYear()} Touwtrekvereniging De Groene Oase. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </div>
  );
}
