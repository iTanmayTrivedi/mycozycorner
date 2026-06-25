import { useEffect, useRef } from "react";

/**
 * A chibi tea cup pinned bottom-right that fills as the user scrolls.
 * The tea level represents scroll progress; steam wisps above.
 */
export function TeacupGauge() {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pending = false;
    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      ref.current?.style.setProperty("--fill", p.toFixed(3));
      pending = false;
    };
    const onScroll = () => { if (pending) return; pending = true; requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg className="teacup-gauge" viewBox="0 0 64 72" aria-hidden>
      {/* steam */}
      <g opacity="0.7">
        <path className="teacup-steam" d="M22 14 q4 -6 0 -12" stroke="color-mix(in oklab, var(--ink) 30%, transparent)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path className="teacup-steam delay-1" d="M32 14 q4 -6 0 -12" stroke="color-mix(in oklab, var(--ink) 30%, transparent)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path className="teacup-steam delay-2" d="M42 14 q4 -6 0 -12" stroke="color-mix(in oklab, var(--ink) 30%, transparent)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
      {/* cup */}
      <g>
        <path d="M8 22 H48 V52 a10 10 0 0 1 -10 10 H18 a10 10 0 0 1 -10 -10 Z" fill="color-mix(in oklab, var(--card) 95%, white)" stroke="color-mix(in oklab, var(--ink) 60%, transparent)" strokeWidth="1.6" />
        {/* handle */}
        <path d="M48 28 q12 4 0 18" fill="none" stroke="color-mix(in oklab, var(--ink) 60%, transparent)" strokeWidth="1.6" />
        {/* tea clipping mask */}
        <clipPath id="cupClip">
          <path d="M10 24 H46 V52 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8 Z" />
        </clipPath>
        <g clipPath="url(#cupClip)">
          <g ref={ref} className="teacup-fill" style={{ transform: "scaleY(var(--fill, 0))", transformOrigin: "center bottom" } as React.CSSProperties}>
            <rect x="10" y="24" width="36" height="36" fill="color-mix(in oklab, var(--lamp) 70%, var(--primary))" />
            <path d="M10 28 q9 -3 18 0 t18 0 v6 h-36 z" fill="color-mix(in oklab, var(--lamp) 90%, white)" opacity="0.5" />
          </g>
        </g>
        {/* face */}
        <circle cx="24" cy="44" r="1.5" fill="var(--ink)" />
        <circle cx="34" cy="44" r="1.5" fill="var(--ink)" />
        <path d="M26 48 q3 3 6 0" stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* saucer */}
        <ellipse cx="28" cy="66" rx="22" ry="3.5" fill="color-mix(in oklab, var(--card) 95%, white)" stroke="color-mix(in oklab, var(--ink) 50%, transparent)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
