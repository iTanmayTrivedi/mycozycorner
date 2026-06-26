type Props = {
  from?: string;
  to?: string;
  flip?: boolean;
  variant?: "wave" | "torn";
  height?: number;
};

export function WavyDivider({
  from = "transparent",
  to = "color-mix(in oklab, var(--blossom) 25%, transparent)",
  flip = false,
  variant = "wave",
  height = 90,
}: Props) {
  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden"
      style={{ height, transform: flip ? "scaleY(-1)" : undefined, background: from }}
    >
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {variant === "wave" ? (
          <path
            d="M0,40 C200,100 400,0 600,50 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill={to}
          />
        ) : (
          <path
            d="M0,30 L60,60 L120,20 L180,70 L240,30 L300,80 L360,40 L420,70 L480,20 L540,60 L600,30 L660,75 L720,40 L780,70 L840,20 L900,60 L960,30 L1020,75 L1080,40 L1140,70 L1200,30 L1200,120 L0,120 Z"
            fill={to}
          />
        )}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "color-mix(in oklab, var(--foreground) 8%, transparent)" }} />
    </div>
  );
}
