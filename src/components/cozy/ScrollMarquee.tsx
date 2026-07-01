type Props = {
  items: string[];
  direction?: "left" | "right";
  className?: string;
  tilt?: number;
};

/** Lightweight compositor-only running banner. No scroll listener. */
export function ScrollMarquee({ items, direction = "left", className = "" }: Props) {
  const loop = [...items, ...items, ...items];

  return (
    <div
      className={`scroll-marquee ${className}`}
      aria-hidden
    >
      <div
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
