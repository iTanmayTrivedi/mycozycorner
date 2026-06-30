import { useEffect, useRef, type ReactNode } from "react";

/** Wraps a section so it tilts gently in 3D based on its position in viewport. */
export function ScrollTilt3D({ children, intensity = 6, className = "" }: { children: ReactNode; intensity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;
    let raf = 0, pending = false;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const p = Math.max(-1, Math.min(1, (center - vh / 2) / (vh / 2)));
      el.style.setProperty("--tilt", `${-p * intensity}deg`);
      el.style.setProperty("--lift", `${Math.abs(p) * 12}px`);
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [intensity]);

  return (
    <div ref={ref} className={`scroll-tilt-3d ${className}`}>
      <div className="scroll-tilt-3d-inner">{children}</div>
    </div>
  );
}
