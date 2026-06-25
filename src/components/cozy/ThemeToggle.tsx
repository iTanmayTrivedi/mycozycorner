import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cozy-theme") : null;
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cozy-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day or night"
      className="group relative h-12 w-24 rounded-full border-2 border-border bg-card shadow-paper transition hover:scale-105"
      style={{
        background: dark
          ? "linear-gradient(135deg, oklch(0.3 0.06 270), oklch(0.22 0.04 270))"
          : "linear-gradient(135deg, color-mix(in oklab, var(--sky-soft) 80%, white), color-mix(in oklab, var(--lamp) 40%, white))",
      }}
    >
      <span className="absolute inset-1 rounded-full border border-border/60 pointer-events-none" />
      <span
        className="absolute top-1 grid h-9 w-9 place-items-center rounded-full bg-card shadow-md transition-all duration-500"
        style={{ left: dark ? "calc(100% - 2.5rem)" : "0.25rem" }}
      >
        {dark ? (
          <Moon className="h-5 w-5 text-primary" style={{ animation: "lamp-glow 3s ease-in-out infinite" }} />
        ) : (
          <Sun className="h-5 w-5" style={{ color: "oklch(0.7 0.15 70)" }} />
        )}
      </span>
    </button>
  );
}
