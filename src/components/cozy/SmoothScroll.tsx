export function SmoothScroll() {
  // Native browser scrolling is fastest for this animation-heavy portfolio.
  // Lenis looked smooth in isolation, but added input latency and extra rAF work
  // while the page already has plenty of compositor animations.
  return null;
}
