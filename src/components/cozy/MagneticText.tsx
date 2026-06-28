import { useRef, type ReactNode } from "react";

/** Per-letter magnetic hover: each letter pulls toward the cursor. */
export function MagneticText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const host = ref.current;
    if (!host) return;
    const letters = host.querySelectorAll<HTMLElement>(".mg-letter");
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - d / 140);
      l.style.transform = `translate(${dx * pull * 0.25}px, ${dy * pull * 0.25}px) rotate(${dx * pull * 0.05}deg)`;
    });
  };
  const onLeave = () => {
    ref.current?.querySelectorAll<HTMLElement>(".mg-letter").forEach((l) => (l.style.transform = ""));
  };

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`magnetic-text ${className}`}>
      {children.split("").map((c, i) => (
        <span key={i} className="mg-letter" style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(.2,.9,.3,1.4)" }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}
