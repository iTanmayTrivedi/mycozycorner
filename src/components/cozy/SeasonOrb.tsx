import { useEffect, useState } from "react";

const SEASONS = [
  { id: "spring", label: "spring", icon: "🌸" },
  { id: "summer", label: "summer", icon: "🌻" },
  { id: "autumn", label: "autumn", icon: "🍁" },
  { id: "winter", label: "winter", icon: "❄️" },
] as const;

type Season = (typeof SEASONS)[number]["id"];

/** Floating orb (top-right under nav) that cycles ambient seasons. */
export function SeasonOrb() {
  const [i, setI] = useState(0);
  const s = SEASONS[i];

  useEffect(() => {
    document.documentElement.setAttribute("data-season", s.id);
  }, [s.id]);

  const next = (e: React.MouseEvent) => {
    setI((v) => (v + 1) % SEASONS.length);
    import("./confetti").then(({ petalBurst }) => {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + r.height / 2, 12);
    });
  };

  return (
    <button
      type="button"
      onClick={next}
      className="season-orb"
      aria-label={`season: ${s.label}, click to change`}
      title={`season: ${s.label}`}
    >
      <span key={s.id} className="season-orb-icon">{s.icon}</span>
      <span className="season-orb-label font-hand">{s.label}</span>
    </button>
  );
}

export type { Season };
