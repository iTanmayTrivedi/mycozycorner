import { useEffect, useState } from "react";

/**
 * Tiny easter-egg: press 'm' to summon a cat "meow!" speech bubble.
 * Lightweight, single-instance, dismisses on its own.
 */
export function MeowEgg() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key.toLowerCase() === "m") {
        setShow(false);
        // re-trigger animation
        requestAnimationFrame(() => setShow(true));
        setTimeout(() => setShow(false), 1800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-24 right-6 z-40 rounded-2xl bg-card px-4 py-2 font-hand text-xl shadow-paper"
      style={{
        borderRadius: "22px 22px 22px 4px",
        animation: "stamp-in 0.5s cubic-bezier(0.22, 1.4, 0.36, 1) both",
      }}
    >
      🐈 meow!
    </div>
  );
}
