import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling + exposes scroll velocity as a CSS var (--scroll-vel)
 * on <html>, which other effects can react to.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const root = document.documentElement;
    const onScroll = ({ velocity }: { velocity: number }) => {
      const v = Math.max(-1, Math.min(1, velocity / 40));
      root.style.setProperty("--scroll-vel", v.toString());
      root.style.setProperty("--scroll-vel-abs", Math.abs(v).toString());
    };
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      root.style.removeProperty("--scroll-vel");
      root.style.removeProperty("--scroll-vel-abs");
    };
  }, []);

  return null;
}
