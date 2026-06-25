import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y; // ring (follows with lag)
    let tx = x, ty = y; // trail (more lag)
    let raf = 0;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const onDown = () => ringRef.current?.style.setProperty("--s", "0.7");
    const onUp = () => ringRef.current?.style.setProperty("--s", "1");

    const hoverables = "a, button, [role='button'], input, textarea, label, .polaroid, summary";
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(hoverables);
      if (t && ringRef.current) {
        ringRef.current.dataset.hover = "1";
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(hoverables);
      if (t && ringRef.current) {
        delete ringRef.current.dataset.hover;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      tx += (x - tx) * 0.08;
      ty += (y - ty) * 0.08;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(var(--s, 1))`;
      if (trailRef.current) trailRef.current.style.transform = `translate3d(${tx - 12}px, ${ty - 12}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.classList.add("has-cozy-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-cozy-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={trailRef} className="cozy-trail" aria-hidden>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2 C16 6, 20 10, 12 22 C4 10, 8 6, 12 2 Z" fill="color-mix(in oklab, var(--blossom) 90%, white)" opacity="0.85" />
        </svg>
      </div>
      <div ref={ringRef} className="cozy-ring" aria-hidden />
      <div ref={dotRef} className="cozy-dot" aria-hidden />
    </>
  );
}
