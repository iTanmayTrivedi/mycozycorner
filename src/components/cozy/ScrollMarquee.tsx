import { useEffect, useRef } from "react";

type Props = {
  items: string[];
  direction?: "left" | "right";
  className?: string;
  /** tilt amount in degrees applied at extreme scroll velocity */
  tilt?: number;
};

/**
 * A running banner that:
 *  - scrolls continuously via CSS animation
 *  - tilts (skew + rotate) based on page scroll velocity
 *  - reverses gently when the user scrolls upward
 */
export function ScrollMarquee({ items, direction = "left", className = "", tilt = 8 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let offset = 0; // additive scroll-coupled offset (px)
    let raf = 0;
    let pending = false;

    const tick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      // ease velocity towards dy
      velocity = velocity * 0.8 + dy * 0.2;
      offset += dy * (direction === "left" ? -1.2 : 1.2);

      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (wrap && track) {
        const clamped = Math.max(-1, Math.min(1, velocity / 30));
        wrap.style.setProperty("--mq-skew", `${clamped * tilt * 0.6}deg`);
        wrap.style.setProperty("--mq-rot", `${clamped * tilt * 0.25}deg`);
        track.style.setProperty("--mq-offset", `${offset}px`);
      }
      pending = false;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction, tilt]);

  const loop = [...items, ...items, ...items];

  return (
    <div
      ref={wrapRef}
      className={`scroll-marquee ${className}`}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={`scroll-marquee-track ${direction === "left" ? "mq-left" : "mq-right"}`}
      >
        {loop.map((t, i) => (
          <span key={i} className="scroll-marquee-item">
            <span className="font-display text-5xl md:text-7xl">{t}</span>
            <span className="scroll-marquee-dot">✿</span>
          </span>
        ))}
      </div>
    </div>
  );
}
