import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 650);
    const t2 = setTimeout(() => setGone(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--lamp) 35%, var(--background)) 0%, var(--background) 60%)",
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "auto",
      }}
      aria-hidden={fade}
    >
      <div className="flex flex-col items-center gap-6">
        {/* steaming kettle */}
        <div className="relative">
          {/* steam */}
          <div className="absolute left-1/2 -top-8 flex -translate-x-1/2 gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-6 w-1.5 rounded-full"
                style={{
                  background: "color-mix(in oklab, var(--foreground) 20%, transparent)",
                  filter: "blur(2px)",
                  animation: `steam 2s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>

          <svg width="120" height="100" viewBox="0 0 120 100" className="drop-shadow-lg">
            {/* cup */}
            <path
              d="M20 35 H85 V70 Q85 92 55 92 Q25 92 25 70 Z"
              fill="color-mix(in oklab, var(--primary) 70%, white)"
              stroke="var(--foreground)"
              strokeWidth="2"
            />
            {/* handle */}
            <path
              d="M85 45 Q108 50 108 65 Q108 80 85 80"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* saucer */}
            <ellipse cx="55" cy="95" rx="45" ry="4" fill="color-mix(in oklab, var(--foreground) 18%, transparent)" />
            {/* face */}
            <circle cx="45" cy="60" r="2" fill="var(--foreground)" />
            <circle cx="65" cy="60" r="2" fill="var(--foreground)" />
            <path d="M48 70 Q55 75 62 70" stroke="var(--foreground)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* blush */}
            <circle cx="38" cy="68" r="3" fill="color-mix(in oklab, var(--blossom) 80%, transparent)" />
            <circle cx="72" cy="68" r="3" fill="color-mix(in oklab, var(--blossom) 80%, transparent)" />
          </svg>
        </div>

        <p className="font-display text-3xl" style={{ color: "var(--foreground)" }}>
          brewing your corner<span style={{ animation: "notebook-cursor 1s steps(2) infinite" }}>…</span>
        </p>

        {/* progress */}
        <div className="h-1.5 w-56 overflow-hidden rounded-full" style={{ background: "color-mix(in oklab, var(--foreground) 10%, transparent)" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--lamp), var(--primary))",
              animation: "load-bar 1.6s ease-out forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
