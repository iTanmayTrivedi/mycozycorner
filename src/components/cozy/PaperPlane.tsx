import { useEffect, useRef } from "react";

/**
 * A paper plane that flies across the viewport as the user scrolls.
 * Pure transform-based; throttled via rAF; respects reduced motion.
 */
export function PaperPlane() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrapRef.current;
    if (!el) return;

    let pending = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      el.style.setProperty("--pp", p.toString());
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="paper-plane-track" aria-hidden>
      <div className="paper-plane-trail" />
      <svg className="paper-plane" viewBox="0 0 48 48" fill="none">
        <path d="M4 24 L44 6 L30 44 L24 28 Z" fill="color-mix(in oklab, var(--card) 90%, white)" stroke="color-mix(in oklab, var(--ink) 70%, transparent)" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 24 L24 28 L30 44" stroke="color-mix(in oklab, var(--ink) 50%, transparent)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
