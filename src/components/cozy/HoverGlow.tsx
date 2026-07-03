import { useEffect } from "react";

/**
 * Global cursor tracker: sets --mx/--my (in px, relative to element) on the
 * currently hovered .paper-card, .scribble-border, .cozy-link. Uses ONE
 * delegated pointermove listener with rAF throttling — cheap, compositor-only.
 * Enables cursor-following sheens, spotlights, and gradient rotations in CSS.
 */
export function HoverGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sel = ".paper-card, .scribble-border, .cozy-link, .lift, .polaroid";
    let raf = 0, px = 0, py = 0, target: HTMLElement | null = null;

    const apply = () => {
      raf = 0;
      if (!target) return;
      const r = target.getBoundingClientRect();
      const x = ((px - r.left) / r.width) * 100;
      const y = ((py - r.top) / r.height) * 100;
      target.style.setProperty("--mx", `${x}%`);
      target.style.setProperty("--my", `${y}%`);
    };

    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest(sel) as HTMLElement | null;
      if (t !== target) {
        if (target) target.removeAttribute("data-glow");
        target = t;
        if (target) target.setAttribute("data-glow", "1");
      }
      if (!target) return;
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (target) { target.removeAttribute("data-glow"); target = null; }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
