import { useEffect, useRef } from "react";

/**
 * Draws soft "constellation" lines from the cursor to nearby anchor points
 * on the page (polaroids, paper-cards, buttons). Lines fade with distance.
 * Pure SVG, throttled to rAF — cheap on the GPU.
 */
export function ConstellationCursor({ radius = 240, maxLinks = 5 }: { radius?: number; maxLinks?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = svgRef.current;
    if (!svg) return;

    let mx = -9999, my = -9999;
    let raf = 0;
    let anchors: { x: number; y: number; el: Element }[] = [];
    let lastAnchorScan = 0;

    const scanAnchors = () => {
      const sel = ".polaroid, .paper-card, .magnetic, [data-constellation]";
      const els = Array.from(document.querySelectorAll(sel));
      anchors = els
        .map((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -50 || r.top > window.innerHeight + 50) return null;
          return { x: r.left + r.width / 2, y: r.top + r.height / 2, el };
        })
        .filter(Boolean) as typeof anchors;
    };

    const tick = (t: number) => {
      if (t - lastAnchorScan > 250) {
        scanAnchors();
        lastAnchorScan = t;
      }
      const near = anchors
        .map((a) => ({ ...a, d: Math.hypot(a.x - mx, a.y - my) }))
        .filter((a) => a.d < radius)
        .sort((a, b) => a.d - b.d)
        .slice(0, maxLinks);

      const lines = near
        .map((a) => {
          const o = (1 - a.d / radius) * 0.45;
          return `<line x1="${mx}" y1="${my}" x2="${a.x}" y2="${a.y}" stroke="url(#cg)" stroke-width="1" opacity="${o.toFixed(3)}" />`;
        })
        .join("");
      const dots = near
        .map((a) => `<circle cx="${a.x}" cy="${a.y}" r="2.5" fill="var(--lamp)" opacity="${(1 - a.d / radius) * 0.6}" />`)
        .join("");

      svg.innerHTML = `
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="var(--lamp)" />
            <stop offset="100%" stop-color="var(--blossom)" />
          </linearGradient>
        </defs>
        ${lines}${dots}
      `;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [radius, maxLinks]);

  return (
    <svg
      ref={svgRef}
      className="constellation-cursor"
      width="100%"
      height="100%"
      aria-hidden
    />
  );
}
