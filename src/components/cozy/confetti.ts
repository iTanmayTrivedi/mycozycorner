/** Spawns a tiny burst of blossom petals at (x, y). Pure DOM, no React rerenders. */
export function petalBurst(x: number, y: number, count = 10) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = document.getElementById("petal-burst-host") ?? (() => {
    const h = document.createElement("div");
    h.id = "petal-burst-host";
    h.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9998;";
    document.body.appendChild(h);
    return h;
  })();

  const symbols = ["✿", "❀", "✦", "♡", "✧"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "petal-burst-piece";
    el.textContent = symbols[i % symbols.length];
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 20;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--dy", `${dy}px`);
    el.style.setProperty("--rot", `${(Math.random() - 0.5) * 540}deg`);
    el.style.color = ["var(--primary)", "var(--lamp)", "var(--blossom)", "var(--sage)"][i % 4];
    host.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}
