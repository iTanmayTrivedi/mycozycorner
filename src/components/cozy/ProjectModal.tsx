import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink } from "lucide-react";

export type ProjectDetail = {
  title: string;
  tag: string;
  desc: string;
  color: string;
  rotate: string;
  emoji: string;
  longDesc?: string;
  stack?: string[];
  shots?: { emoji: string; color: string; caption: string }[];
};

type Props = {
  project: ProjectDetail | null;
  originRect: DOMRect | null;
  onClose: () => void;
};

export function ProjectModal({ project, originRect, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "opening" | "open" | "closing">("idle");
  const [shotIdx, setShotIdx] = useState(0);

  useEffect(() => {
    if (!project || !originRect) return;
    setShotIdx(0);
    setPhase("opening");
    document.body.style.overflow = "hidden";
    // double rAF so the start transform paints before transitioning to open
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setPhase("open"));
      (close as unknown as { _r2?: number })._r2 = r2;
    });
    return () => {
      cancelAnimationFrame(r1);
      document.body.style.overflow = "";
    };
  }, [project, originRect]);

  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nextShot();
      if (e.key === "ArrowLeft") prevShot();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, project]);

  if (!project || !originRect) return null;

  const shots =
    project.shots && project.shots.length > 0
      ? project.shots
      : [
          { emoji: project.emoji, color: project.color, caption: "Overview" },
          { emoji: "✨", color: project.color, caption: "Details" },
          { emoji: "🌿", color: project.color, caption: "In context" },
        ];

  function close() {
    setPhase("closing");
    window.setTimeout(() => {
      setPhase("idle");
      onClose();
    }, 480);
  }

  function nextShot() {
    setShotIdx((i) => (i + 1) % shots.length);
  }
  function prevShot() {
    setShotIdx((i) => (i - 1 + shots.length) % shots.length);
  }

  // Compute FLIP transform from origin rect to centered target
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const targetW = Math.min(960, vw - 48);
  const targetH = Math.min(640, vh - 80);
  const targetLeft = (vw - targetW) / 2;
  const targetTop = (vh - targetH) / 2;

  const collapsed = phase === "opening" || phase === "closing";
  const style: React.CSSProperties = collapsed
    ? {
        position: "fixed",
        left: originRect.left,
        top: originRect.top,
        width: originRect.width,
        height: originRect.height,
        transform: `rotate(${project.rotate})`,
        borderRadius: 18,
      }
    : {
        position: "fixed",
        left: targetLeft,
        top: targetTop,
        width: targetW,
        height: targetH,
        transform: "rotate(0deg)",
        borderRadius: 22,
      };

  return (
    <div
      className="fixed inset-0 z-[120]"
      aria-modal
      role="dialog"
      aria-label={`${project.title} project details`}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: phase === "open" ? 1 : 0,
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--ink) 55%, transparent), color-mix(in oklab, var(--ink) 80%, transparent))",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      {/* Expanding polaroid card */}
      <div
        ref={cardRef}
        className="overflow-hidden shadow-2xl will-change-transform"
        style={{
          ...style,
          background: "var(--card)",
          border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
          boxShadow:
            "0 30px 80px -20px color-mix(in oklab, var(--ink) 45%, transparent), 0 8px 20px -8px color-mix(in oklab, var(--ink) 30%, transparent)",
          transition:
            "left 520ms cubic-bezier(0.22,1,0.36,1), top 520ms cubic-bezier(0.22,1,0.36,1), width 520ms cubic-bezier(0.22,1,0.36,1), height 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1), border-radius 520ms ease",
        }}
      >
        {/* tape */}
        <span
          className="absolute left-1/2 -top-3 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg]"
          style={{
            background: "color-mix(in oklab, var(--lamp) 60%, white)",
            opacity: 0.85,
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        />

        {phase === "open" ? (
          <div className="relative flex h-full flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-hand text-base shadow-paper transition hover:-translate-x-0.5 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" /> back to grid
              </button>
              <p className="hidden font-hand text-muted-foreground sm:block">
                a closer look ~ {project.tag}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="close"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card shadow-paper transition hover:rotate-90 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="grid min-h-0 flex-1 gap-0 md:grid-cols-[1.4fr_1fr]">
              {/* Carousel */}
              <div className="relative min-h-[260px] overflow-hidden bg-muted/30 p-5">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  {shots.map((s, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 grid place-items-center transition-all duration-500"
                      style={{
                        transform: `translateX(${(i - shotIdx) * 100}%)`,
                        background: `linear-gradient(135deg, color-mix(in oklab, ${s.color} 75%, white), color-mix(in oklab, ${s.color} 25%, white))`,
                      }}
                      aria-hidden={i !== shotIdx}
                    >
                      <span
                        className="text-[7rem] md:text-[9rem]"
                        style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.18))" }}
                      >
                        {s.emoji}
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/80 px-3 py-1 font-hand text-sm shadow-paper backdrop-blur">
                        {s.caption}
                      </span>
                    </div>
                  ))}

                  {/* prev/next */}
                  <button
                    type="button"
                    onClick={prevShot}
                    aria-label="previous screenshot"
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-paper transition hover:-translate-x-0.5 hover:bg-card"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextShot}
                    aria-label="next screenshot"
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow-paper transition hover:translate-x-0.5 hover:bg-card"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* dots */}
                  <div className="absolute bottom-3 right-4 flex gap-1.5">
                    {shots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setShotIdx(i)}
                        aria-label={`go to slide ${i + 1}`}
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: i === shotIdx ? 22 : 8,
                          background:
                            i === shotIdx
                              ? "var(--primary)"
                              : "color-mix(in oklab, var(--ink) 30%, transparent)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex min-h-0 flex-col gap-4 overflow-auto p-6">
                <div>
                  <p className="font-hand text-lg text-primary">{project.tag}</p>
                  <h3 className="mt-1 font-serif text-3xl">{project.title}</h3>
                </div>
                <p className="font-hand text-lg leading-relaxed text-muted-foreground">
                  {project.longDesc ?? project.desc}
                </p>
                {project.stack && project.stack.length > 0 && (
                  <div>
                    <p className="font-hand text-sm uppercase tracking-widest text-muted-foreground">
                      brewed with
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-card px-3 py-1 text-sm shadow-paper"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-hand text-lg text-primary-foreground shadow-paper transition hover:-translate-y-0.5"
                    style={{ borderRadius: "999px 22px 999px 22px / 999px" }}
                  >
                    visit project <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 font-hand text-lg shadow-paper transition hover:-translate-y-0.5"
                    style={{ borderRadius: "999px 22px 999px 22px / 999px" }}
                  >
                    <ArrowLeft className="h-4 w-4" /> back to grid
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // collapsed placeholder mimicking the polaroid look during the FLIP
          <div className="grid h-full w-full place-items-center text-5xl" style={{
            background: `linear-gradient(135deg, color-mix(in oklab, ${project.color} 70%, white), color-mix(in oklab, ${project.color} 30%, white))`,
          }}>
            <span style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))" }}>{project.emoji}</span>
          </div>
        )}
      </div>
    </div>
  );
}
