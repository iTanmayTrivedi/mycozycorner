import { useEffect, useState } from "react";

/** Occasional shooting star that arcs across the hero. CSS-driven. */
export function ShootingStar() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setN((x) => x + 1), 9000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <span key={n} className="shooting-star" />
    </div>
  );
}
