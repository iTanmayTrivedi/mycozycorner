import { useEffect, useState } from "react";

/** Ambient drifting fireflies — only visible in night theme. CSS-driven, ~14 nodes. */
export function Fireflies() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOk(true);
  }, []);
  if (!ok) return null;
  const flies = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="firefly-field" aria-hidden>
      {flies.map((i) => {
        const left = (i * 137) % 100;
        const top = (i * 53) % 100;
        const dur = 9 + ((i * 7) % 11);
        const delay = (i * 0.7) % 6;
        const size = 4 + ((i * 3) % 5);
        return (
          <span
            key={i}
            className="firefly"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s, ${2 + (i % 3)}s`,
              animationDelay: `${delay}s, ${delay / 2}s`,
            }}
          />
        );
      })}
    </div>
  );
}
