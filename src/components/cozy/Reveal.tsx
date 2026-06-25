import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Variant = "fade-up" | "fade" | "slide-left" | "slide-right" | "zoom" | "tilt-in";

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    willChange: shown ? "auto" : "transform, opacity",
  };

  return (
    // @ts-expect-error dynamic tag
    <As
      ref={ref as never}
      data-reveal={variant}
      data-shown={shown ? "1" : "0"}
      style={style}
      className={className}
    >
      {children}
    </As>
  );
}
