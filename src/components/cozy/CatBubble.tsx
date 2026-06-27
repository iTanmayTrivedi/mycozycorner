import { useState } from "react";

const phrases = ["nyaa~", "have a cookie ♡", "stay a while", "did you hydrate?", "purr…", "psst — press M"];

export function CatBubble() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <button
      type="button"
      className="cat-walker cat-walker-button"
      aria-label="pet the cat"
      onMouseEnter={() => setIdx(Math.floor(Math.random() * phrases.length))}
      onMouseLeave={() => setIdx(null)}
      onClick={(e) => {
        setIdx(Math.floor(Math.random() * phrases.length));
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        import("./confetti").then(({ petalBurst }) => petalBurst(r.left + r.width / 2, r.top, 10));
      }}
    >
      <div className="cat-bob text-3xl select-none">🐈</div>
      {idx !== null && <span className="cat-bubble">{phrases[idx]}</span>}
    </button>
  );
}
