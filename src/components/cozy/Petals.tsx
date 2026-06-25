import { useEffect, useState } from "react";

type Petal = { id: number; left: number; delay: number; duration: number; drift: number; size: number; rotate: number };

export function Petals({ count = 12 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 240,
      size: 10 + Math.random() * 14,
      rotate: Math.random() * 360,
    }));
    setPetals(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 20 20"
          width={p.size}
          height={p.size}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            top: 0,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom prop
            "--drift": `${p.drift}px`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <path
            d="M10 2 C13 5, 16 8, 10 18 C4 8, 7 5, 10 2 Z"
            fill="color-mix(in oklab, var(--blossom) 80%, white)"
            opacity="0.85"
          />
        </svg>
      ))}
      {/* dust motes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={`m-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${20 + ((i * 27) % 60)}%`,
            width: 4,
            height: 4,
            background: "color-mix(in oklab, var(--lamp) 80%, white)",
            opacity: 0.5,
            filter: "blur(1px)",
            animation: `mote ${6 + i}s ease-in-out ${i * 0.7}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
