import { useEffect } from "react";

/** Spawns a soft ghost-trail of pastel dots that fade behind the cursor. */
export function CursorTrail() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const host = document.createElement("div");
    host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9996;";
    document.body.appendChild(host);

    const colors = ["var(--blossom)", "var(--sky-soft)", "var(--lamp)", "var(--sage)"];
    let last = 0;
    let i = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      const dot = document.createElement("span");
      dot.className = "cursor-ghost-dot";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.background = colors[i++ % colors.length];
      host.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      host.remove();
    };
  }, []);
  return null;
}
