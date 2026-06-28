import { useEffect } from "react";

/** Global click handler: spawns an ink-splash + radiating ring at the click point. */
export function InkSplash() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      // Skip when inside form inputs, to keep typing snappy
      const tgt = e.target as HTMLElement;
      if (tgt.closest("input, textarea, select")) return;
      const host = document.getElementById("ink-splash-host") ?? (() => {
        const h = document.createElement("div");
        h.id = "ink-splash-host";
        h.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9997;";
        document.body.appendChild(h);
        return h;
      })();
      const ring = document.createElement("span");
      ring.className = "ink-ring";
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      host.appendChild(ring);
      setTimeout(() => ring.remove(), 900);
    };
    window.addEventListener("click", onClick, { passive: true });
    return () => window.removeEventListener("click", onClick);
  }, []);
  return null;
}
