"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Wrench } from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content";

/**
 * CINEMATIC JOURNEY — an Apple-style scroll-scrubbed film.
 * The section is tall (SCROLL_LENGTH); a pinned full-screen canvas
 * scrubs through a 172-frame dusk flythrough of a real install:
 * exterior lighting → shades/kitchen → dedicated theater →
 * Control4 wall panel → pull back out. Copy beats fade in over
 * the matching scene.
 *
 * Frames live in /public/sequence/hero/frame-NNN.webp (1920×1080).
 * They load in two tiers (every 8th frame first, then the rest) so
 * scrubbing works almost immediately and sharpens as frames arrive;
 * missing frames fall back to the nearest loaded one.
 *
 * Reduced-motion users get a single still + the closing CTA instead
 * of a pinned scrub.
 */

const FRAME_COUNT = 172;
const SCROLL_LENGTH = "420vh";
/* Two encodes of the same frames: hero/ is 1920px, hero-sm/ is 960px.
   Small screens scrub the -sm set (2.8MB vs 6.1MB total). */
const framePath = (i: number, dir: "hero" | "hero-sm" = "hero") =>
  `/sequence/${dir}/frame-${String(i).padStart(3, "0")}.webp`;

/** Copy beats — sourced from the "What we do" section (Services header
    + lib/content.ts SERVICES) so the film and the grid never drift.
    Each service is timed to the footage that shows it. */
const service = (icon: string) => SERVICES.find((s) => s.icon === icon);

/** Each film service beat links to its matching service (or rescue) page.
    Keyed by the SERVICES icon name the beat is built from. */
const SERVICE_LINKS: Record<string, { href: string; label: string }> = {
  House: { href: "/whole-home-automation", label: "Explore Smart Home Automation" },
  Clapperboard: { href: "/home-theater", label: "Explore Home Theater" },
  Music4: { href: "/multi-room-audio", label: "Explore Whole-Home Audio" },
  ShieldCheck: { href: "/safety-security", label: "Explore Security & Cameras" },
  Router: { href: "/networking", label: "Explore Networking & Wi-Fi" },
  LifeBuoy: { href: "/rescue-desk", label: "Explore Support & Rescue" },
};

/** Builds a beat from a SERVICES entry (found by its icon name). */
const serviceBeat = (icon: string, from: number, to: number) => {
  const s = service(icon);
  const link = SERVICE_LINKS[icon];
  return {
    from,
    to,
    title: s?.title ?? icon,
    sub: s?.description,
    bullets: s?.bullets,
    logos: s?.logos,
    href: link?.href,
    linkLabel: link?.label,
  };
};

const BEATS: {
  from: number;
  to: number;
  eyebrow?: string;
  title: string;
  sub?: string;
  bullets?: string[];
  logos?: { src: string; alt: string }[];
  href?: string;
  linkLabel?: string;
  cta?: boolean;
}[] = [
  {
    // Opening title card — a transitional beat (the slogan CTA lives in
    // the hero above), exits quickly so all six services fit.
    from: 0,
    to: 14,
    // Name dropped from the eyebrow — the headline says it
    eyebrow: "Houston · Control4 Gold Dealer",
    title: "Electronic Dreams do come true",
    sub: `Movie nights that start with one tap. Music that follows you room to room. Lights that know it's bedtime. For over ${SITE.yearsInBusiness} years we've designed and built Control4 smart homes and theaters across Houston — scroll through a home we built.`,
    cta: true,
  },
  serviceBeat("Router", 18, 34), // exterior approach — the invisible foundation
  serviceBeat("House", 42, 58), // motorized shades / kitchen walkthrough
  serviceBeat("Music4", 62, 76), // moving room to room
  serviceBeat("Clapperboard", 80, 104), // dedicated theater reveal
  serviceBeat("ShieldCheck", 118, 140), // Control4 wall panel closeup
  {
    // Night exterior pull-back, holds to end — CTAs return for the close
    ...serviceBeat("LifeBuoy", 154, FRAME_COUNT - 1),
    cta: true,
  },
];

const toProgress = (frame: number) => frame / (FRAME_COUNT - 1);

function Beat({
  progress,
  from,
  to,
  children,
  interactive = false,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: ReactNode;
  interactive?: boolean;
}) {
  const a = toProgress(from);
  const b = toProgress(to);
  const fade = Math.min(0.045, (b - a) / 3);
  const holdToEnd = to >= FRAME_COUNT - 1;
  /* A beat starting at frame 0 is the hero title — visible on load. */
  const startsVisible = from === 0;
  const opacity = useTransform(
    progress,
    startsVisible
      ? [0, b - fade, b]
      : holdToEnd
        ? [a, a + fade, 1]
        : [a, a + fade, b - fade, b],
    startsVisible ? [1, 1, 0] : holdToEnd ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(opacity, [0, 1], [28, 0]);
  const pointerEvents = useTransform(opacity, (o) =>
    interactive && o > 0.5 ? ("auto" as const) : ("none" as const),
  );

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 flex items-center"
    >
      {/* Same column geometry as the hero: max-w-6xl shell, copy in a
          left column capped at max-w-xl */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">{children}</div>
      </div>
    </motion.div>
  );
}

function BeatCopy({
  eyebrow,
  title,
  sub,
  bullets,
  logos,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  bullets?: string[];
  logos?: { src: string; alt: string }[];
  href?: string;
  linkLabel?: string;
}) {
  return (
    <>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      {/* Styled as a display heading but semantically a <p>: these beats
          precede the page h1 and duplicate the Services copy, so keeping
          them out of the heading outline (audit finding) */}
      <p className="text-glow-gradient font-display text-4xl font-bold leading-[1.08] tracking-tight [filter:drop-shadow(0_2px_16px_rgba(0,0,0,0.9))] sm:text-6xl">
        {title}
      </p>
      {sub && (
        <p className="mt-6 max-w-xl text-lg leading-snug text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.9)]">
          {sub}
        </p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-base text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]"
            >
              <Check className="mt-1 size-4.5 shrink-0 text-ok" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      {logos && logos.length > 0 && (
        /* Brand marks from the old site, pre-baked as white-on-transparent
           PNGs (public/brands/white/ — see the script note in README).
           Translucent + drop-shadow so they sit on the film like the text. */
        <div className="mt-7 flex max-w-lg flex-wrap items-center gap-x-7 gap-y-4">
          {logos.map(({ src, alt }) => (
            <img
              key={src}
              src={src}
              alt={alt}
              loading="lazy"
              className="h-6 w-auto max-w-24 object-contain opacity-80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]"
            />
          ))}
        </div>
      )}
      {href && (
        <Link
          href={href}
          className="glass mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-signal/50 sm:text-base"
        >
          {linkLabel ?? "Explore this service"}
          <ArrowRight className="size-4 text-signal" aria-hidden />
        </Link>
      )}
    </>
  );
}

/** Film CTAs. The title card shows only the design CTA (the hero above
    already offers the design/fix split); the closing "Support & Rescue"
    beat keeps both — that's where "Fix my system" belongs. */
function CtaButtons({ fix = true }: { fix?: boolean }) {
  return (
    <div className="mt-9">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <a
          href="#new-project"
          className="glow-cta flex items-center justify-center gap-2 rounded-xl bg-glow px-7 py-4 text-base font-semibold text-glow-ink"
        >
          <Sparkles className="size-5" aria-hidden />
          Design my smart home
        </a>
        {fix && (
          <Link
            href="/rescue-desk"
            className="glass flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-ink hover:border-signal/50"
          >
            <Wrench className="size-5 text-signal" aria-hidden />
            Fix my system
          </Link>
        )}
      </div>
      {/* (Consultation + serving lines moved under the hero's CTA buttons) */}
    </div>
  );
}

export default function CinematicJourney() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const frameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  /* Draw `frame` (or the nearest loaded neighbor) cover-fit. */
  const draw = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let i = frame;
    if (!loadedRef.current[i]) {
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (loadedRef.current[i - d]) { i = i - d; break; }
        if (loadedRef.current[i + d]) { i = i + d; break; }
      }
    }
    const img = imagesRef.current[i];
    if (!img || !loadedRef.current[i]) return;

    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v * (FRAME_COUNT - 1))));
    if (frame !== frameRef.current) {
      frameRef.current = frame;
      draw(frame);
    }
  });

  /* Don't spend ~2.5MB of frames on visitors who never reach the film:
     loading starts when the section is within one viewport of view. */
  const [nearView, setNearView] = useState(false);
  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  /* Load frames: tier 1 = every 8th (scrub works fast), tier 2 = rest. */
  useEffect(() => {
    if (reduceMotion || !nearView) return;
    let cancelled = false;
    const dir = window.innerWidth <= 768 ? "hero-sm" : "hero";

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (imagesRef.current[i]) return resolve();
        const img = new Image();
        img.src = framePath(i, dir);
        imagesRef.current[i] = img;
        img.onload = () => {
          if (cancelled) return resolve();
          loadedRef.current[i] = true;
          if (i === frameRef.current || !loadedRef.current[frameRef.current]) {
            draw(frameRef.current);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

    const tier1 = Array.from({ length: FRAME_COUNT }, (_, i) => i).filter(
      (i) => i % 8 === 0 || i === FRAME_COUNT - 1,
    );
    Promise.all(tier1.map(load)).then(() => {
      if (cancelled) return;
      for (let i = 0; i < FRAME_COUNT; i++) void load(i);
    });

    return () => {
      cancelled = true;
    };
  }, [draw, reduceMotion, nearView]);

  /* Size the canvas to the viewport (device pixels, capped at 2×). */
  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      draw(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw, reduceMotion]);

  const scrollHintOpacity = useTransform(progress, [0, 0.04], [1, 0]);

  /* Reduced motion: one still + the closing pitch, no pinned scrub. */
  if (reduceMotion) {
    return (
      <section
        aria-label="A scroll-through film of a smart home we built"
        className="relative"
      >
        <div className="relative h-[80vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={framePath(0)}
            alt="A modern Houston smart home at dusk with automated landscape and pool lighting"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.38)_38%,transparent_64%)]" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <div className="max-w-xl">
                <BeatCopy
                  eyebrow={BEATS[0].eyebrow}
                  title={BEATS[0].title}
                  sub={BEATS[0].sub}
                />
                <CtaButtons fix={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="A scroll-through film of a smart home we built"
      className="relative bg-abyss"
      style={{ height: SCROLL_LENGTH }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Poster paints immediately; the canvas covers it on first draw */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={framePath(0)}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Flythrough of a Houston smart home at dusk: exterior lighting scenes, motorized shades, a dedicated home theater, and a Control4 touch panel"
          className="relative size-full"
        />

        {/* Scrims keep the hero-position copy readable on bright frames:
            a left-edge gradient behind the text column, plus soft top
            (header) and bottom (scroll hint) fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.38)_38%,transparent_64%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"
        />

        {BEATS.map((beat) => (
          <Beat
            key={beat.from}
            progress={progress}
            from={beat.from}
            to={beat.to}
            interactive={beat.cta || !!beat.href}
          >
            <BeatCopy
              eyebrow={beat.eyebrow}
              title={beat.title}
              sub={beat.sub}
              bullets={beat.bullets}
              logos={beat.logos}
              href={beat.cta ? undefined : beat.href}
              linkLabel={beat.linkLabel}
            />
            {beat.cta && <CtaButtons fix={beat.from !== 0} />}
          </Beat>
        ))}

        {/* Scroll hint, fades as the film starts */}
        <motion.div
          aria-hidden
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5 text-white/70"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-white/60"
          />
        </motion.div>
      </div>
    </section>
  );
}
