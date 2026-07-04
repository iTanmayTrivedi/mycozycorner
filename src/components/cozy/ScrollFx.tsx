import { useEffect } from "react";

/**
 * Ultra-light scroll effects using a single IntersectionObserver.
 * - No scroll listeners, no per-frame work.
 * - Elements opt in via `data-sf="rise|fade|tilt|zoom|slide-l|slide-r|blur"`.
 * - Optional `data-sf-delay` (ms) staggers the reveal.
 * All motion is transform/opacity only → compositor friendly.
 */
export function ScrollFx() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-sf]").forEach((el) => {
        el.classList.add("sf-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.sfDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("sf-visible");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>("[data-sf]:not(.sf-visible)").forEach((el) => {
        io.observe(el);
      });
    };
    observe();

    // Watch for late-mounted nodes (modals, dynamic content).
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
