import { useEffect, useState } from "react";

const phrases = ["nyaa~", "have a cookie ♡", "stay a while", "did you hydrate?", "purr…", "psst — press M", "you're sweet"];
const KEY = "cozy-pets";

export function CatBubble() {
  const [idx, setIdx] = useState<number | null>(null);
  const [pets, setPets] = useState(0);

  useEffect(() => {
    try { setPets(parseInt(localStorage.getItem(KEY) || "0", 10) || 0); } catch {}
  }, []);

  const pet = (x: number, y: number) => {
    setIdx(Math.floor(Math.random() * phrases.length));
    setPets((p) => {
      const n = p + 1;
      try { localStorage.setItem(KEY, String(n)); } catch {}
      return n;
    });
    import("./confetti").then(({ petalBurst }) => petalBurst(x, y, 8));
  };

  return (
    <button
      type="button"
      className="cat-walker cat-walker-button"
      aria-label="pet the cat"
      onMouseEnter={() => setIdx(Math.floor(Math.random() * phrases.length))}
      onMouseLeave={() => setIdx(null)}
      onClick={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        pet(r.left + r.width / 2, r.top);
      }}
    >
      <div className="cat-bob text-3xl select-none">🐈</div>
      {pets > 0 && <span className="cat-pet-count" aria-label={`${pets} pets`}>♡ {pets}</span>}
      {idx !== null && <span className="cat-bubble">{phrases[idx]}</span>}
    </button>
  );
}
