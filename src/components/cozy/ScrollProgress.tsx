import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let pending = false;
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max <= 0 ? 0 : window.scrollY / max;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[90] h-[3px]">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, var(--blossom), var(--lamp), var(--primary))",
          boxShadow: "0 0 10px color-mix(in oklab, var(--lamp) 60%, transparent)",
          transition: "none",
        }}
      />
    </div>
  );
}
