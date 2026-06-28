import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Coffee, Code2, BookOpen, Music, Mail, MapPin, Train, Sparkles,
  ExternalLink, Send, Heart, Cloud, Leaf, Camera,
} from "lucide-react";
import { Petals } from "@/components/cozy/Petals";
import { ThemeToggle } from "@/components/cozy/ThemeToggle";
import { TypeCycle } from "@/components/cozy/TypeCycle";
import { LoadingScreen } from "@/components/cozy/LoadingScreen";
import { CustomCursor } from "@/components/cozy/CustomCursor";
import { Reveal } from "@/components/cozy/Reveal";
import { ScrollMarquee } from "@/components/cozy/ScrollMarquee";
import { ScrollProgress } from "@/components/cozy/ScrollProgress";
import { PaperPlane } from "@/components/cozy/PaperPlane";
import { TeacupGauge } from "@/components/cozy/TeacupGauge";
import { MeowEgg } from "@/components/cozy/MeowEgg";
import { VinylPlayer } from "@/components/cozy/VinylPlayer";
import { BlossomBranch } from "@/components/cozy/BlossomBranch";
import { ShootingStar } from "@/components/cozy/ShootingStar";
import { WavyDivider } from "@/components/cozy/WavyDivider";
import { petalBurst } from "@/components/cozy/confetti";
import { ProjectModal, type ProjectDetail } from "@/components/cozy/ProjectModal";
import { CursorLantern } from "@/components/cozy/CursorLantern";
import { CatBubble } from "@/components/cozy/CatBubble";
import { Fireflies } from "@/components/cozy/Fireflies";
import { InkSplash } from "@/components/cozy/InkSplash";
import { ScrollTilt3D } from "@/components/cozy/ScrollTilt3D";
import { SmoothScroll } from "@/components/cozy/SmoothScroll";
import { CursorTrail } from "@/components/cozy/CursorTrail";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Corner — A Cozy Slice-of-Life Portfolio" },
      { name: "description", content: "A warm, hand-drawn portfolio. Coffee, code, and quiet afternoons." },
      { property: "og:title", content: "My Corner — A Cozy Slice-of-Life Portfolio" },
      { property: "og:description", content: "Coffee, code, and quiet afternoons. Step into my corner." },
    ],
  }),
  component: Index,
});

const projects: ProjectDetail[] = [
  {
    title: "Café Loop", tag: "Web App", desc: "A daily-journaling app that feels like a paper notebook.",
    color: "var(--blossom)", rotate: "-3deg", emoji: "📓",
    longDesc: "A daily-journaling app that feels like a paper notebook — soft pages, ink that dries, and a quiet reminder each evening to write just one line.",
    stack: ["React", "TypeScript", "IndexedDB", "Framer Motion"],
    shots: [
      { emoji: "📓", color: "var(--blossom)", caption: "Today's page" },
      { emoji: "✒️", color: "var(--lamp)", caption: "Ink that dries" },
      { emoji: "🌙", color: "var(--sky-soft)", caption: "Evening prompt" },
    ],
  },
  {
    title: "Lo-fi Garden", tag: "Music Player", desc: "A tiny browser radio that grows plants while you listen.",
    color: "var(--sage)", rotate: "2deg", emoji: "🌱",
    longDesc: "A tiny browser radio. Every minute of listening waters a little plant on your desk — by the end of the week, you've grown a garden of focus.",
    stack: ["Web Audio", "Canvas", "SVG", "PWA"],
    shots: [
      { emoji: "🌱", color: "var(--sage)", caption: "Sprout" },
      { emoji: "🎧", color: "var(--sky-soft)", caption: "Lo-fi player" },
      { emoji: "🪴", color: "var(--sage)", caption: "Your garden" },
    ],
  },
  {
    title: "Train Window", tag: "Generative Art", desc: "Scenery that scrolls by, gently, while you think.",
    color: "var(--sky-soft)", rotate: "-1deg", emoji: "🚃",
    longDesc: "Procedural scenery that drifts past at the speed of a country train. Soft hills, paper clouds, and the occasional shrine — all generated, never the same twice.",
    stack: ["WebGL", "Perlin Noise", "GLSL"],
    shots: [
      { emoji: "🚃", color: "var(--sky-soft)", caption: "Leaving the station" },
      { emoji: "⛰️", color: "var(--sage)", caption: "Rolling hills" },
      { emoji: "⛩️", color: "var(--blossom)", caption: "Passing shrine" },
    ],
  },
  {
    title: "Pen Pal", tag: "iOS Concept", desc: "Slow messaging — letters that arrive tomorrow.",
    color: "var(--lamp)", rotate: "4deg", emoji: "✉️",
    longDesc: "Slow messaging, on purpose. Letters take a day to travel. You write longer, you read carefully, and you wait — like the mail used to feel.",
    stack: ["SwiftUI", "CloudKit", "Figma"],
    shots: [
      { emoji: "✉️", color: "var(--lamp)", caption: "Compose a letter" },
      { emoji: "📮", color: "var(--blossom)", caption: "In transit" },
      { emoji: "📬", color: "var(--sage)", caption: "Tomorrow's mail" },
    ],
  },
  {
    title: "Kotatsu Kit", tag: "Design System", desc: "Warm, soft tokens for cozy product interfaces.",
    color: "var(--blossom)", rotate: "1deg", emoji: "🍵",
    longDesc: "A small design system of warm tokens, gentle shadows, and hand-drawn components — for teams who want their product to feel like a cup of tea.",
    stack: ["Tokens", "Tailwind", "Storybook"],
    shots: [
      { emoji: "🍵", color: "var(--blossom)", caption: "Tokens" },
      { emoji: "🎨", color: "var(--lamp)", caption: "Palette" },
      { emoji: "🧶", color: "var(--sage)", caption: "Components" },
    ],
  },
  {
    title: "Sunbeam", tag: "CLI Tool", desc: "Tiny terminal companion that wishes you a good morning.",
    color: "var(--sage)", rotate: "-2deg", emoji: "☀️",
    longDesc: "Open the terminal, get a warm hello. Sunbeam greets you with the weather, your three small tasks, and a haiku someone wrote last night.",
    stack: ["Rust", "Ratatui"],
    shots: [
      { emoji: "☀️", color: "var(--lamp)", caption: "Good morning" },
      { emoji: "📝", color: "var(--sky-soft)", caption: "Three tasks" },
      { emoji: "🍃", color: "var(--sage)", caption: "Today's haiku" },
    ],
  },
];

const timeline = [
  { year: "2019", stop: "Kettle Station", title: "First job, first deploy", desc: "Built dashboards, drank a lot of tea.", icon: Coffee },
  { year: "2021", stop: "Notebook Junction", title: "Design + Code crossover", desc: "Started shipping my own little apps.", icon: BookOpen },
  { year: "2023", stop: "Studio Lane", title: "Joined a tiny studio", desc: "Worked on cozy products for kind people.", icon: Sparkles },
  { year: "2025", stop: "Garden Terminal", title: "Independent maker", desc: "Slow craft. Long walks. Better code.", icon: Leaf },
];

const favorites = [
  { label: "Coffee consumed", value: 87, max: 100, icon: Coffee, suffix: " cups / mo" },
  { label: "Lines coded", value: 64, max: 100, icon: Code2, suffix: " (well, mostly)" },
  { label: "Books read", value: 42, max: 100, icon: BookOpen, suffix: " this year" },
  { label: "Lo-fi listened", value: 91, max: 100, icon: Music, suffix: " always on" },
];

function Index() {
  useParallax();
  const [openProject, setOpenProject] = useState<ProjectDetail | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const openProjectAt = (p: ProjectDetail, rect: DOMRect) => {
    setOriginRect(rect);
    setOpenProject(p);
  };
  return (
    <div className="relative min-h-screen text-foreground">
      <SmoothScroll />
      <CursorTrail />
      <LoadingScreen />
      <ScrollProgress />
      <CursorLantern />
      <CustomCursor />
      <div className="paper-grain" aria-hidden />
      <Petals />
      <FloatingNotes />
      <SunbeamLayer />
      <PaperPlane />
      <TeacupGauge />
      <MeowEgg />
      <BlossomBranch />
      <ShootingStar />
      <Fireflies />
      <InkSplash />
      <VinylPlayer />
      <button
        type="button"
        className="ribbon"
        onClick={() => document.getElementById("hello")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="jump to contact"
      >
        ✿ say hi →
      </button>


      {/* Nav */}
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-paper" style={{ animation: "gentle-bounce 5s ease-in-out infinite" }}>
            <Cloud className="h-5 w-5 text-primary" />
          </span>
          <span className="font-display text-2xl">my corner</span>
        </a>
        <nav className="hidden gap-6 font-hand text-xl md:flex">
          <a href="#about" className="cozy-link">about</a>
          <a href="#work" className="cozy-link">work</a>
          <a href="#journey" className="cozy-link">journey</a>
          <a href="#hello" className="cozy-link">say hi</a>
        </nav>
        <ThemeToggle />
      </header>

      {/* HERO */}
      <section id="top" className="relative z-10 mx-auto max-w-6xl px-5 pt-6 pb-20">
        <svg aria-hidden viewBox="0 0 600 400" className="parallax pointer-events-none absolute -left-10 -top-10 h-[420px] w-[420px] opacity-30 dark:opacity-20" data-speed="0.06">
          <path d="M40 380 Q60 280 120 240 Q90 200 130 160 Q120 110 170 100 Q170 60 220 70 Q240 30 280 60 Q320 40 330 90 Q380 90 380 140 Q420 160 400 210 Q440 250 400 290 Q420 360 360 380 Z" fill="color-mix(in oklab, var(--blossom) 80%, transparent)" />
          <rect x="170" y="240" width="14" height="160" fill="color-mix(in oklab, var(--foreground) 30%, transparent)" />
        </svg>

        <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal variant="slide-right">
            <p className="font-hand text-2xl text-muted-foreground">~ a quiet portfolio ~</p>
            <h1 className="mt-3 font-serif text-5xl leading-[1.05] md:text-7xl">
              Welcome to <span className="ink-underline"><MagneticLetters text="My Corner" /></span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Pull up a chair. The kettle's on. I make small, careful things on the internet —
              somewhere between a sketchbook and a software studio.
            </p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-hand text-3xl md:text-4xl text-muted-foreground">today, I'm</span>
              <TypeCycle words={["Designing.", "Coding.", "Daydreaming.", "Sketching.", "Brewing tea."]} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CozyButton href="#work">See the gallery</CozyButton>
              <CozyButton href="#hello" variant="ghost">Send a letter</CozyButton>
            </div>
          </Reveal>

          <Reveal variant="slide-left" delay={120}>
            <TrainWindow />
          </Reveal>
        </div>
      </section>

      {/* MARQUEE — drifts with scroll */}
      <WavyDivider from="transparent" to="color-mix(in oklab, var(--blossom) 30%, transparent)" variant="wave" height={70} />
      <div className="relative z-10 py-4" style={{ background: "color-mix(in oklab, var(--blossom) 30%, transparent)" }}>
        <ScrollMarquee
          items={["slow mornings", "warm tea", "soft pixels", "kind code", "quiet pages", "long walks"]}
          direction="left"
        />
      </div>
      <WavyDivider from="color-mix(in oklab, var(--blossom) 30%, transparent)" to="transparent" variant="wave" height={70} flip />

      {/* ABOUT */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Reveal><SectionTitle kicker="chapter 1" title="A little about me" n="1" /></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal variant="tilt-in">
            <div className="paper-card lift peel relative p-6 md:rotate-[-1.5deg]" style={{ background: "color-mix(in oklab, var(--blossom) 25%, var(--card))" }}>
              <span className="tape -top-3 left-8" />
              <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-4xl shadow-paper" style={{ background: "color-mix(in oklab, var(--sage) 60%, white)", animation: "gentle-bounce 4s ease-in-out infinite" }}>
                  🐈
                </div>
                <div className="min-w-0">
                  <p className="font-hand text-lg text-muted-foreground">student ID · class of forever</p>
                  <h3 className="truncate font-serif text-2xl">Sora Tanaka</h3>
                  <p className="text-sm text-muted-foreground">designer · maker · daydreamer</p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Field label="club" value="Coffee & Code" />
                <Field label="city" value="A small one" />
                <Field label="weather" value="Always 21°C" />
                <Field label="now" value="Reading a book" />
              </dl>
              <p className="mt-5 font-hand text-lg leading-relaxed">
                "I like the in-between hours — the soft glow before evening, the hush after rain.
                Most of my best ideas arrive then."
              </p>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <div className="paper-card lift peel p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">Daily routine</h3>
                <span className="font-hand text-muted-foreground">~ a typical week ~</span>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {favorites.map((f, i) => (
                  <Reveal key={f.label} variant="fade-up" delay={i * 90}>
                    <ProgressCard f={f} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Reveal><SectionTitle kicker="chapter 2" title="Things from the desk" n="2" /></Reveal>
        <Reveal delay={80}>
          <p className="mt-2 max-w-xl font-hand text-xl text-muted-foreground">
            a few projects, scattered like polaroids on a corkboard. hover to tidy them up.
          </p>
        </Reveal>

        <ScrollTilt3D intensity={5}>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} variant="tilt-in" delay={i * 90}>
                <div className="sd-tilt-in"><Polaroid project={p} onOpen={openProjectAt} /></div>
              </Reveal>
            ))}
          </div>
        </ScrollTilt3D>
      </section>

      {/* MARQUEE — reverse direction, sage band */}
      <WavyDivider from="transparent" to="color-mix(in oklab, var(--sage) 35%, transparent)" variant="torn" height={60} />
      <div className="relative z-10 py-4" style={{ background: "color-mix(in oklab, var(--sage) 35%, transparent)" }}>
        <ScrollMarquee
          items={["design", "code", "music", "tea", "books", "naps", "rain"]}
          direction="right"
          tilt={10}
        />
      </div>
      <WavyDivider from="color-mix(in oklab, var(--sage) 35%, transparent)" to="transparent" variant="torn" height={60} flip />

      {/* JOURNEY */}
      <section id="journey" className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Reveal><SectionTitle kicker="chapter 3" title="The route I've taken" n="3" /></Reveal>
        <Reveal delay={80}><p className="mt-2 font-hand text-xl text-muted-foreground">a slow train, with kind stops along the way.</p></Reveal>

        <Reveal variant="fade-up" delay={100}>
          <div className="paper-card mt-10 overflow-hidden p-6 md:p-10">
            <div className="relative">
              <div className="absolute left-6 top-2 bottom-2 w-[3px] rounded-full md:left-1/2 md:-translate-x-1/2"
                style={{ background: "repeating-linear-gradient(180deg, var(--primary) 0 10px, transparent 10px 18px)" }}
              />
              <ul className="space-y-10">
                {timeline.map((t, i) => (
                  <li key={t.year} className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <Reveal variant={i % 2 ? "slide-left" : "slide-right"} delay={i * 80}>
                      <div className={`pl-16 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                        <p className="font-hand text-2xl text-primary">{t.year}</p>
                        <h4 className="font-serif text-xl">{t.title}</h4>
                        <p className="text-muted-foreground">{t.desc}</p>
                      </div>
                    </Reveal>
                    <div className={`relative ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <span
                        className="absolute left-6 top-1 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 bg-card shadow-paper md:left-1/2"
                        style={{ borderColor: "var(--primary)", animation: "gentle-bounce 4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
                      >
                        <t.icon className="h-5 w-5 text-primary" />
                      </span>
                      <div className="pl-16 md:pl-0">
                        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
                          <Train className="h-4 w-4" /> {t.stop}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="hello" className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Reveal><SectionTitle kicker="chapter 4" title="Say hello" n="4" /></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <Reveal variant="slide-right"><Postcard /></Reveal>
          <Reveal variant="slide-left" delay={120}><Letterbox /></Reveal>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-5 py-12 text-center overflow-hidden">
        <p className="font-hand text-xl text-muted-foreground">
          made with <Heart className="inline h-4 w-4 -translate-y-0.5" /> and a warm cup of something
        </p>
        <p className="mt-1 text-xs text-muted-foreground">© {new Date().getFullYear()} my corner. take your time. <span className="ml-2 opacity-70">psst — press <kbd className="rounded border border-border px-1.5 py-0.5 font-hand">m</kbd></span></p>
        <CatBubble />
      </footer>

      <ProjectModal
        project={openProject}
        originRect={originRect}
        onClose={() => setOpenProject(null)}
      />
    </div>
  );
}

function useParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".parallax"));
    if (!els.length) return;
    let raf = 0;
    let pending = false;
    const tick = () => {
      const y = window.scrollY;
      for (const el of els) {
        const speed = parseFloat(el.dataset.speed || "0.1");
        el.style.setProperty("--py", `${y * speed * -1}px`);
      }
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
}

function SunbeamLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="parallax absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full" data-speed="0.04"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--lamp) 35%, transparent), transparent 65%)" }} />
      <div className="parallax absolute -left-32 top-1/2 h-[360px] w-[360px] rounded-full" data-speed="0.08"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--blossom) 35%, transparent), transparent 65%)" }} />
    </div>
  );
}

function ProgressCard({ f }: { f: typeof favorites[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { setW(f.value); io.disconnect(); break; }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [f.value]);
  return (
    <div ref={ref} className="scribble-border lift p-4">
      <div className="flex items-center gap-2">
        <f.icon className="h-5 w-5 text-primary" />
        <span className="font-hand text-xl">{f.label}</span>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full"
          style={{ width: `${w}%`, background: "linear-gradient(90deg, color-mix(in oklab, var(--lamp) 70%, white), var(--primary))", transition: "width 1.6s cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{f.value}%{f.suffix}</p>
    </div>
  );
}

/* ----- small components ----- */

function SectionTitle({ kicker, title, n }: { kicker: string; title: string; n?: string }) {
  return (
    <div className="sd-rise flex items-end gap-4">
      {n && <span className="chapter-sticker wobble-hover">{n}</span>}
      <div>
        <p className="font-hand text-xl text-primary">{kicker}</p>
        <h2 className="mt-1 font-serif text-4xl md:text-5xl scroll-mark chromatic-hover" data-reveal="fade">{title}</h2>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-3">
      <dt className="font-hand text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-serif">{value}</dd>
    </div>
  );
}

function CozyButton({
  href, children, variant = "solid",
}: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const dx = (mx - r.width / 2) * 0.25;
    const dy = (my - r.height / 2) * 0.35;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
    el.style.transform = `translate(${dx}px, ${dy - 2}px)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "";
  };
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    petalBurst(e.clientX, e.clientY, 12);
  };
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={[
        "magnetic group inline-flex items-center gap-2 rounded-full px-6 py-3 font-hand text-xl shadow-paper",
        "transition-transform duration-300 ease-out will-change-transform",
        variant === "solid"
          ? "bg-primary text-primary-foreground"
          : "border-2 border-border bg-card text-foreground",
      ].join(" ")}
      style={{ borderRadius: "999px 22px 999px 22px / 999px" }}
    >
      {children}
      <Sparkles className="h-4 w-4 transition group-hover:rotate-180 group-hover:scale-125 duration-500" />
    </a>
  );
}

function MagneticLetters({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="mag-letter" aria-hidden style={{ transitionDelay: `${i * 12}ms` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}


function Polaroid({ project, onOpen }: { project: ProjectDetail; onOpen: (p: ProjectDetail, rect: DOMRect) => void }) {
  const { title, tag, desc, color, rotate, emoji } = project;
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 12;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const handleOpen = () => {
    const el = ref.current; if (!el) return;
    // reset tilt so the rect we capture is the resting position
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    const r = el.getBoundingClientRect();
    onOpen(project, r);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
      role="button"
      tabIndex={0}
      aria-label={`open ${title} project`}
      className="polaroid paper-card peel group relative cursor-pointer p-4 hover:rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ transform: `rotate(${rotate})`, background: "var(--card)" }}
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2" />
      <div
        className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl text-6xl transition-all duration-500 group-hover:saturate-100 group-hover:brightness-105"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${color} 70%, white), color-mix(in oklab, ${color} 30%, white))`,
          filter: "saturate(0.65) brightness(0.96)",
        }}
      >
        {/* shine sweep */}
        <span className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[60%] -translate-x-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[80%] group-hover:opacity-100" />
        <span
          className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))" }}
        >
          {emoji}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-hand text-sm text-muted-foreground">{tag}</p>
          <h3 className="truncate font-serif text-xl">{title}</h3>
        </div>
        <Camera className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:rotate-12 group-hover:text-primary" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>

      <span
        className="pointer-events-none absolute -bottom-4 right-4 translate-y-2 rotate-[-6deg] rounded-md px-3 py-1 font-hand text-base opacity-0 shadow-paper transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: "color-mix(in oklab, var(--lamp) 60%, white)", color: "var(--ink)", animation: "shimmer-tag 2.4s ease-in-out infinite" }}
      >
        Take a Look <ExternalLink className="inline h-3 w-3" />
      </span>
    </div>
  );
}

function TrainWindow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current; if (!el) return;
    let pending = false;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const p = Math.max(-1, Math.min(1, (window.innerHeight / 2 - center) / window.innerHeight));
      el.style.setProperty("--tw", p.toFixed(3));
      pending = false;
    };
    const onScroll = () => { if (pending) return; pending = true; requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx-tw", px.toFixed(3));
    el.style.setProperty("--my-tw", py.toFixed(3));
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--mx-tw", "0");
    el.style.setProperty("--my-tw", "0");
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="paper-card train-window relative overflow-hidden p-3 md:rotate-[2deg]"
      style={{ background: "var(--card)" }}
    >
      <span className="tape -top-3 left-6" />
      <span className="tape -top-3 right-6" style={{ transform: "rotate(4deg)" }} />
      <div
        className="relative aspect-[5/4] overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--sky-soft) 90%, white) 0%, color-mix(in oklab, var(--lamp) 50%, white) 55%, color-mix(in oklab, var(--sage) 70%, white) 100%)",
        }}
      >
        {/* sun — drifts on scroll + parallax */}
        <div className="tw-sun absolute right-8 top-8 h-20 w-20 rounded-full"
          style={{ background: "color-mix(in oklab, var(--lamp) 80%, white)", animation: "lamp-glow 4s ease-in-out infinite" }} />
        {/* hills layered */}
        <svg viewBox="0 0 400 300" className="tw-hills-1 absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 220 Q60 170 120 200 T240 200 T400 190 L400 300 L0 300 Z" fill="color-mix(in oklab, var(--sage) 70%, white)" opacity="0.85" />
        </svg>
        <svg viewBox="0 0 400 300" className="tw-hills-2 absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 250 Q80 210 160 240 T320 235 T400 245 L400 300 L0 300 Z" fill="color-mix(in oklab, var(--sage) 90%, var(--ink))" opacity="0.4" />
        </svg>
        {/* a tiny torii arch passing by */}
        <svg viewBox="0 0 60 60" className="tw-torii absolute" aria-hidden>
          <path d="M6 18 H54 M10 14 H50 L46 18 H14 Z M16 18 V52 M44 18 V52 M14 30 H46" stroke="color-mix(in oklab, var(--primary) 80%, var(--ink))" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
        {/* clouds */}
        <Cloud className="tw-cloud-1 absolute left-8 top-10 h-10 w-10 text-white/80" />
        <Cloud className="tw-cloud-2 absolute left-1/3 top-20 h-7 w-7 text-white/70" />
        {/* rain streaks on hover */}
        <div className="tw-rain pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{ left: `${(i * 7 + 3) % 100}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
        {/* window frame + warm bloom */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-8 ring-card" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 80px rgba(255,220,180,0.4)" }} />
        {/* reflection sweep */}
        <div className="tw-reflect pointer-events-none absolute inset-0" aria-hidden />
      </div>
      <div className="mt-3 flex items-center justify-between px-2 font-hand text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> somewhere quiet</span>
        <span>14:27 · clear skies</span>
      </div>
    </div>
  );
}

function FloatingNotes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {[
        { left: "8%", top: "70%", delay: 0 },
        { left: "85%", top: "55%", delay: 3 },
        { left: "45%", top: "85%", delay: 6 },
      ].map((n, i) => (
        <Music
          key={i}
          className="absolute h-5 w-5 text-primary/60"
          style={{ left: n.left, top: n.top, animation: `float-note 9s ease-in ${n.delay}s infinite` }}
        />
      ))}
    </div>
  );
}

function Postcard() {
  return (
    <div className="paper-card relative overflow-hidden md:rotate-[-1deg]">
      <div className="grid grid-cols-2 gap-0">
        <div className="p-6" style={{ background: "color-mix(in oklab, var(--sky-soft) 30%, var(--card))" }}>
          <p className="font-hand text-2xl">Dear visitor,</p>
          <p className="mt-3 font-hand text-lg leading-relaxed text-muted-foreground">
            Thanks for wandering in. If anything here made you smile, write back. I read every letter
            with a fresh cup of tea, usually on Sunday mornings.
          </p>
          <p className="mt-6 font-hand text-xl">— with care, Sora ♡</p>
        </div>
        <div className="relative p-6">
          <div className="absolute right-5 top-5 h-20 w-16 rotate-3 border-2 border-dashed border-border p-1 text-center">
            <div className="h-full w-full grid place-items-center text-2xl stamp" style={{ background: "color-mix(in oklab, var(--blossom) 50%, white)", border: "2px dashed color-mix(in oklab, var(--primary) 60%, transparent)", borderRadius: "8px" }}>
              🌸
            </div>
          </div>
          <div className="mt-24 space-y-2 font-hand text-lg">
            <p className="border-b border-dashed border-border pb-1">To: someone kind</p>
            <p className="border-b border-dashed border-border pb-1">@: hello@mycorner.cafe</p>
            <p className="border-b border-dashed border-border pb-1">re: a small idea</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Letterbox() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="paper-card p-6 md:rotate-[1deg]"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-paper">
          <Mail className="h-5 w-5" />
        </span>
        <h3 className="font-serif text-2xl">Write me a letter</h3>
      </div>
      <div className="space-y-5">
        <RuledField label="your name" placeholder="e.g. wandering stranger" />
        <RuledField label="how to reach you" type="email" placeholder="you@somewhere.kind" />
        <RuledTextarea label="message" placeholder="say anything — the weather, an idea, a question…" />
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-hand text-xl text-primary-foreground shadow-paper transition hover:-translate-y-0.5 hover:scale-[1.01]"
        style={{ borderRadius: "999px 22px 999px 22px / 999px" }}
      >
        {sent ? "letter posted ♡" : (<>drop it in the letterbox <Send className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}

function RuledField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="font-hand text-sm text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full border-0 border-b-2 border-dashed border-border bg-transparent px-1 py-2 font-hand text-xl outline-none focus:border-primary"
      />
    </label>
  );
}

function RuledTextarea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="font-hand text-sm text-muted-foreground">{label}</span>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="mt-1 w-full resize-none bg-transparent px-1 py-2 font-hand text-xl outline-none"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklab, var(--border) 80%, transparent) 31px, color-mix(in oklab, var(--border) 80%, transparent) 32px)",
          lineHeight: "32px",
        }}
      />
    </label>
  );
}
