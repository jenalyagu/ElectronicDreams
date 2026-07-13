"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Clapperboard, MoonStar, Palette, Sun, type LucideIcon } from "lucide-react";

/**
 * LIGHTING SCENE SWITCHER — full-bleed interactive demo for the Smart
 * Lighting page. A Control4-style engraved keypad floats over a
 * screen-filling photo of one Electronic Dreams living room; tap a key
 * and the whole room changes scene, cross-fading real photography.
 * Dramatizes the page's promise — "scenes, not switches." A gentle
 * auto-cycle plays once on first view; any tap (or reduced-motion)
 * hands control to the visitor.
 */

type Scene = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  src: string;
  caption: string;
};

const SCENES: Scene[] = [
  {
    id: "warm",
    label: "Warm",
    sub: "Everyday",
    icon: Sun,
    src: "/rooms/living-active.webp",
    caption: "One tap warms the whole room — cove lighting, lamps, and the fireplace glow.",
  },
  {
    id: "party",
    label: "Party",
    sub: "Entertain",
    icon: Palette,
    src: "/rooms/living-rgb.webp",
    caption: "Color washes the coves and the landscape for a night with friends.",
  },
  {
    id: "movie",
    label: "Movie",
    sub: "Watch",
    icon: Clapperboard,
    src: "/rooms/living-movie-night.webp",
    caption: "Lights dim, shades drop, the screen takes over — all from one button.",
  },
  {
    id: "goodnight",
    label: "Goodnight",
    sub: "Sleep",
    icon: MoonStar,
    src: "/rooms/living-goodnight.webp",
    caption: "Everything eases off to a soft path glow on your way to bed.",
  },
];

export default function LightingSceneSwitcher() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const scene = SCENES[active];

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  /* Auto-cycle through the scenes once when it scrolls into view. */
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        [1, 2, 3, 0].forEach((i, step) => {
          timers.push(
            setTimeout(() => {
              if (!touched.current) setActive(i);
            }, 1400 * (step + 1)),
          );
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  const eased = reduceMotion ? "" : "transition-all duration-700 ease-out";

  const panel = (
    <div className="w-full rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Scene Keypad
        </span>
        <span className="font-mono text-[11px] tabular-nums text-signal">
          LIVING&nbsp;ROOM
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
        {SCENES.map((s, i) => {
          const on = i === active;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={on}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                on
                  ? "border-glow/50 bg-glow/[0.1] shadow-[0_0_20px_-6px_rgba(251,191,36,0.5)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span
                aria-hidden
                className={`size-2.5 shrink-0 rounded-full ${eased} ${
                  on
                    ? "bg-glow shadow-[0_0_9px_2px_rgba(251,191,36,0.7)]"
                    : "bg-gray-600 group-hover:bg-gray-500"
                }`}
              />
              <Icon
                className={`size-5 shrink-0 ${on ? "text-glow" : "text-ink-dim"}`}
                aria-hidden
              />
              <span className="min-w-0">
                <span
                  className={`block font-display text-[15px] font-semibold leading-tight ${on ? "text-ink" : "text-ink-dim"}`}
                >
                  {s.label}
                </span>
                <span className="block text-[11px] uppercase tracking-wide text-ink-dim/70">
                  {s.sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3.5 text-sm leading-snug text-ink-dim">
        <span className="font-semibold text-ink">{scene.label}.</span>{" "}
        {scene.caption}
      </p>
    </div>
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* Full-bleed room */}
      <div className="relative h-[52vh] min-h-[380px] w-full md:h-[82vh] md:min-h-[620px]">
        {SCENES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.id}
            src={s.src}
            alt=""
            aria-hidden
            loading="lazy"
            className={`absolute inset-0 h-full w-full scale-[1.04] object-cover ${eased}`}
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}

        {/* Scrims — right-side wash for the floating panel, bottom fade */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-night/90 via-night/30 via-[42%] to-transparent to-[72%] md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent md:via-[18%]" />

        {/* Active scene chip, top-left over the photo */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 backdrop-blur-md sm:left-6 sm:top-6">
          <span
            aria-hidden
            className="size-2 rounded-full bg-glow shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">
            {scene.label}
          </span>
        </div>

        {/* Desktop: keypad hugs the right edge of the image */}
        <div className="absolute inset-y-0 right-0 hidden items-center pr-5 md:flex lg:pr-8">
          <div className="w-full max-w-sm">{panel}</div>
        </div>
      </div>

      {/* Mobile: keypad rides up over the photo's bottom fade */}
      <div className="relative z-10 -mt-14 px-4 md:hidden">{panel}</div>
    </div>
  );
}
