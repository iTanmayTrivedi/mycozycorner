import { useEffect, useState } from "react";

/** Soft floating bokeh light orbs — depth in the background. ~10 elements, CSS-only animation. */
export function BokehLayer() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOk(true);
  }, []);
  if (!ok) return null;

  const orbs = Array.from({ length: 10 }, (_, i) => {
    const colors = ["var(--lamp)", "var(--blossom)", "var(--sky-soft)", "var(--sage)"];
    const size = 90 + ((i * 47) % 160);
    return {
      i,
      left: (i * 67) % 100,
      top: (i * 41) % 100,
      size,
      color: colors[i % colors.length],
      dur: 18 + ((i * 7) % 22),
      delay: (i * 1.3) % 8,
    };
  });

  return (
    <div className="bokeh-layer" aria-hidden>
      {orbs.map((o) => (
        <span
          key={o.i}
          className="bokeh-orb"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${o.color} 80%, white), transparent 70%)`,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
