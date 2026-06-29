import { useEffect, useRef } from "react";

/**
 * Soft constellation lines from cursor to nearby anchors.
 * Optimized: persistent SVG nodes (no innerHTML thrash), throttled to ~30fps,
 * skips work when cursor hasn't moved.
 */
export function ConstellationCursor({ radius = 220, maxLinks = 4 }: { radius?: number; maxLinks?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = svgRef.current;
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";

    // One-time defs
    svg.innerHTML = `<defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="var(--lamp)"/><stop offset="100%" stop-color="var(--blossom)"/></linearGradient></defs>`;
    const lines: SVGLineElement[] = [];
    const dots: SVGCircleElement[] = [];
    for (let i = 0; i < maxLinks; i++) {
      const ln = document.createElementNS(NS, "line");
      ln.setAttribute("stroke", "url(#cg)");
      ln.setAttribute("stroke-width", "1");
      ln.setAttribute("opacity", "0");
      svg.appendChild(ln);
      lines.push(ln);
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "2.5");
      c.setAttribute("fill", "var(--lamp)");
      c.setAttribute("opacity", "0");
      svg.appendChild(c);
      dots.push(c);
    }

    let mx = -9999, my = -9999, lmx = mx, lmy = my;
    let raf = 0;
    let anchors: { x: number; y: number }[] = [];
    let lastScan = 0;
    let lastTick = 0;

    const scan = () => {
      const els = document.querySelectorAll(".polaroid, .paper-card");
      const out: { x: number; y: number }[] = [];
      els.forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
        out.push({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      });
      anchors = out;
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - lastTick < 33) return; // ~30fps cap
      lastTick = t;
      if (t - lastScan > 500) { scan(); lastScan = t; }

      const moved = Math.abs(mx - lmx) + Math.abs(my - lmy) > 0.5;
      if (!moved && mx > -9000) return;
      lmx = mx; lmy = my;

      // Pick nearest N
      const picks: { x: number; y: number; d: number }[] = [];
      for (let i = 0; i < anchors.length; i++) {
        const a = anchors[i];
        const dx = a.x - mx, dy = a.y - my;
        const d = Math.hypot(dx, dy);
        if (d < radius) picks.push({ x: a.x, y: a.y, d });
      }
      picks.sort((a, b) => a.d - b.d);

      for (let i = 0; i < maxLinks; i++) {
        const p = picks[i];
        const ln = lines[i], dot = dots[i];
        if (!p) { ln.setAttribute("opacity", "0"); dot.setAttribute("opacity", "0"); continue; }
        const o = (1 - p.d / radius);
        ln.setAttribute("x1", String(mx));
        ln.setAttribute("y1", String(my));
        ln.setAttribute("x2", String(p.x));
        ln.setAttribute("y2", String(p.y));
        ln.setAttribute("opacity", (o * 0.45).toFixed(2));
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
        dot.setAttribute("opacity", (o * 0.6).toFixed(2));
      }
    };

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; for (const l of lines) l.setAttribute("opacity", "0"); for (const d of dots) d.setAttribute("opacity", "0"); };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [radius, maxLinks]);

  return <svg ref={svgRef} className="constellation-cursor" width="100%" height="100%" aria-hidden />;
}
