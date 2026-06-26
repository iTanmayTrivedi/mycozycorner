import { useEffect, useRef } from "react";

/** A hand-drawn cherry-blossom branch that sways with scroll + cursor. Fixed top-right. */
export function BlossomBranch() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, pending = false;
    let targetX = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 6;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--sway", `${targetX}deg`);
        pending = false;
      });
    };
    const onScroll = () => {
      const s = Math.min(1, window.scrollY / 800);
      ref.current?.style.setProperty("--bend", `${s * 4}deg`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 320 280"
      className="blossom-branch"
    >
      <g className="branch-sway">
        <path
          d="M310 -10 Q230 40 200 90 Q170 140 150 200 Q140 230 120 260"
          stroke="color-mix(in oklab, var(--ink) 65%, transparent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M230 70 Q210 60 180 70" stroke="color-mix(in oklab, var(--ink) 60%, transparent)"
          strokeWidth="2.5" strokeLinecap="round" fill="none"
        />
        <path
          d="M180 150 Q205 145 230 160" stroke="color-mix(in oklab, var(--ink) 60%, transparent)"
          strokeWidth="2.5" strokeLinecap="round" fill="none"
        />
        {[
          { cx: 230, cy: 65, r: 14, d: "0s" },
          { cx: 190, cy: 95, r: 11, d: "0.4s" },
          { cx: 170, cy: 140, r: 13, d: "0.8s" },
          { cx: 225, cy: 165, r: 10, d: "1.1s" },
          { cx: 150, cy: 200, r: 12, d: "1.4s" },
          { cx: 130, cy: 240, r: 9, d: "1.8s" },
          { cx: 200, cy: 50, r: 9, d: "2.1s" },
        ].map((b, i) => (
          <g key={i} style={{ transformOrigin: `${b.cx}px ${b.cy}px`, animation: `bloom-puff 4.5s ease-in-out ${b.d} infinite` }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx={b.cx + Math.cos((a * Math.PI) / 180) * b.r * 0.6}
                cy={b.cy + Math.sin((a * Math.PI) / 180) * b.r * 0.6}
                rx={b.r * 0.55}
                ry={b.r * 0.75}
                fill="color-mix(in oklab, var(--blossom) 85%, white)"
                stroke="color-mix(in oklab, var(--primary) 30%, transparent)"
                strokeWidth="1"
                transform={`rotate(${a} ${b.cx} ${b.cy})`}
              />
            ))}
            <circle cx={b.cx} cy={b.cy} r={b.r * 0.25} fill="color-mix(in oklab, var(--lamp) 80%, white)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
