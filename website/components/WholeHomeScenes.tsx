"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  Blinds,
  Clapperboard,
  Flame,
  Lightbulb,
  MoonStar,
  Music2,
  Palette,
  ShieldCheck,
  Sun,
  Thermometer,
  Wine,
  type LucideIcon,
} from "lucide-react";

/**
 * WHOLE-HOME SCENES — full-bleed demo for the Whole-Home Automation
 * page. One Control4-style scene keypad over a locked-off open-plan
 * shot; tapping a scene crossfades the whole house AND flips a six-tile
 * systems board (lights, shades, climate, audio, security, fireplace)
 * with a staggered ripple — the point is watching every system respond
 * to one button. Auto-plays the scene cycle once on first view.
 */

type SystemId = "lights" | "shades" | "climate" | "audio" | "security" | "fire";

const SYSTEM_META: { id: SystemId; label: string; icon: LucideIcon }[] = [
  { id: "lights", label: "Lights", icon: Lightbulb },
  { id: "shades", label: "Shades", icon: Blinds },
  { id: "climate", label: "Climate", icon: Thermometer },
  { id: "audio", label: "Audio", icon: Music2 },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "fire", label: "Fireplace", icon: Flame },
];

type Scene = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  src: string;
  caption: string;
  /** value + lit flag per system tile */
  board: Record<SystemId, { value: string; on?: boolean }>;
};

const SCENES: Scene[] = [
  {
    id: "morning",
    label: "Good Morning",
    sub: "Start the day",
    icon: Sun,
    src: "/rooms/home-morning.webp",
    caption: "Shades open to the daylight, the house warms up, and the alarm stands down — before your coffee's ready.",
    board: {
      lights: { value: "Soft · 40%", on: true },
      shades: { value: "Open", on: true },
      climate: { value: "72° · Day" },
      audio: { value: "Morning news", on: true },
      security: { value: "Disarmed" },
      fire: { value: "Off" },
    },
  },
  {
    id: "entertain",
    label: "Entertain",
    sub: "Guests arriving",
    icon: Wine,
    src: "/rooms/home-entertain.webp",
    caption: "Accent lighting comes up, the fireplace lights, and dinner music follows the sunset — one tap before the doorbell.",
    board: {
      lights: { value: "Accent · 60%", on: true },
      shades: { value: "Open", on: true },
      climate: { value: "71° · Auto" },
      audio: { value: "Dinner jazz", on: true },
      security: { value: "Home" },
      fire: { value: "On", on: true },
    },
  },
  {
    id: "rgb",
    label: "RGB",
    sub: "Color the night",
    icon: Palette,
    src: "/rooms/home-rgb.webp",
    caption: "Every cove, kick, and the pool shift to full color — the same house, in party mode.",
    board: {
      lights: { value: "RGB · Party", on: true },
      shades: { value: "Privacy" },
      climate: { value: "70° · Auto" },
      audio: { value: "Party mix", on: true },
      security: { value: "Home" },
      fire: { value: "On", on: true },
    },
  },
  {
    id: "movie",
    label: "Movie Night",
    sub: "Lights down, sound up",
    icon: Clapperboard,
    src: "/rooms/home-movie.webp",
    caption: "Shades drop, lights fade to 10%, and surround sound takes over — the room becomes a theater.",
    board: {
      lights: { value: "Dim · 10%" },
      shades: { value: "Closed", on: true },
      climate: { value: "69° · Quiet" },
      audio: { value: "Surround 5.1", on: true },
      security: { value: "Home" },
      fire: { value: "Off" },
    },
  },
  {
    id: "goodnight",
    label: "Goodnight",
    sub: "One tap, all off",
    icon: MoonStar,
    src: "/rooms/home-goodnight.webp",
    caption: "Path lights only, doors locked, alarm set, thermostat eased down — the whole house tucked in from one button.",
    board: {
      lights: { value: "Path · 5%" },
      shades: { value: "Closed", on: true },
      climate: { value: "68° · Sleep" },
      audio: { value: "Off" },
      security: { value: "Armed · Night", on: true },
      fire: { value: "Off" },
    },
  },
];

export default function WholeHomeScenes() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const scene = SCENES[active];

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  /* Auto-cycle the scenes once when scrolled into view. */
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const order = SCENES.map((_, i) => i).slice(1).concat(0); // 1,2,…,0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        order.forEach((i, step) => {
          timers.push(
            setTimeout(() => {
              if (!touched.current) setActive(i);
            }, 2000 * (step + 1)),
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

  /* Desktop: slim horizontal command bar overlaid along the bottom of
     the photo — scene keys on one row, the systems board on the next —
     so the whole house stays visible. */
  const bar = (
    <div className="rounded-2xl border border-white/15 bg-night/60 p-3.5 shadow-2xl backdrop-blur-lg backdrop-saturate-150">
      <div className="mb-2.5 flex items-center justify-between px-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-dim">
          Whole-Home Scenes
        </span>
        <span className="font-mono text-[10px] uppercase tabular-nums text-signal">
          One tap · 6 systems
        </span>
      </div>

      {/* Scene keys — one row */}
      <div className="grid grid-cols-5 gap-2">
        {SCENES.map((s, i) => {
          const on = i === active;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={on}
              className={`group flex items-center justify-center gap-2 rounded-xl border px-2 py-2.5 transition-all duration-300 ${
                on
                  ? "border-scene/50 bg-scene/[0.1] shadow-[0_0_18px_-6px_rgba(251,191,36,0.5)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span
                aria-hidden
                className={`size-1.5 shrink-0 rounded-full ${eased} ${
                  on
                    ? "bg-scene shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]"
                    : "bg-gray-600 group-hover:bg-gray-500"
                }`}
              />
              <Icon className={`size-4 shrink-0 ${on ? "text-scene" : "text-ink-dim"}`} aria-hidden />
              <span className={`truncate font-display text-[13px] font-semibold ${on ? "text-ink" : "text-ink-dim"}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Systems board — one row, ripples on every scene change */}
      <div className="mt-2 grid grid-cols-6 gap-2">
        {SYSTEM_META.map(({ id, label, icon: Icon }, i) => {
          const st = scene.board[id];
          return (
            <div
              key={id}
              className={`rounded-xl border px-2.5 py-1.5 transition-colors duration-300 ${
                st.on ? "border-scene/30 bg-scene/[0.06]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`size-3 ${st.on ? "text-scene" : "text-ink-dim"}`} aria-hidden />
                <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-dim">
                  {label}
                </span>
              </div>
              <p
                key={`${scene.id}-${id}`}
                className={`mt-0.5 truncate font-display text-xs font-semibold text-ink ${
                  reduceMotion ? "" : "animate-[tile-in_0.45s_ease-out_both]"
                }`}
                style={reduceMotion ? undefined : { animationDelay: `${i * 90}ms` }}
              >
                {st.value}
              </p>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes tile-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  const panel = (
    <div className="w-full rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Whole-Home Scenes
        </span>
        <span className="font-mono text-[11px] uppercase tabular-nums text-signal">
          One tap · 6 systems
        </span>
      </div>

      {/* Scene keys */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-1.5">
        {SCENES.map((s, i) => {
          const on = i === active;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={on}
              className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 ${
                on
                  ? "border-scene/50 bg-scene/[0.1] shadow-[0_0_18px_-6px_rgba(251,191,36,0.5)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span
                aria-hidden
                className={`size-2 shrink-0 rounded-full ${eased} ${
                  on
                    ? "bg-scene shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]"
                    : "bg-gray-600 group-hover:bg-gray-500"
                }`}
              />
              <Icon className={`size-4.5 shrink-0 ${on ? "text-scene" : "text-ink-dim"}`} aria-hidden />
              <span className="min-w-0">
                <span className={`block font-display text-sm font-semibold leading-tight ${on ? "text-ink" : "text-ink-dim"}`}>
                  {s.label}
                </span>
                <span className="hidden text-[10px] uppercase tracking-wide text-ink-dim/70 md:block">
                  {s.sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Systems board — every tile flips on a scene change, staggered
          so the "one tap ripples through the house" story is visible */}
      <div className="mt-3.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-2">
        {SYSTEM_META.map(({ id, label, icon: Icon }, i) => {
          const st = scene.board[id];
          return (
            <div
              key={id}
              className={`rounded-xl border px-3 py-2 transition-colors duration-300 ${
                st.on ? "border-scene/30 bg-scene/[0.06]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`size-3.5 ${st.on ? "text-scene" : "text-ink-dim"}`} aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-dim">
                  {label}
                </span>
              </div>
              {/* key on scene+value re-runs the enter animation per change */}
              <p
                key={`${scene.id}-${id}`}
                className={`mt-0.5 truncate font-display text-[13px] font-semibold text-ink ${
                  reduceMotion ? "" : "animate-[tile-in_0.45s_ease-out_both]"
                }`}
                style={reduceMotion ? undefined : { animationDelay: `${i * 90}ms` }}
              >
                {st.value}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-3.5 text-sm leading-snug text-ink-dim">
        <span className="font-semibold text-ink">{scene.label}.</span>{" "}
        {scene.caption}
      </p>

      <style jsx>{`
        @keyframes tile-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* Full-bleed house */}
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

        {/* Scrims — bottom fade only, so the whole house stays visible
            behind the horizontal command bar */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent md:from-night/75 md:via-[32%]" />

        {/* Active scene chip, top-left over the photo */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 backdrop-blur-md sm:left-6 sm:top-6">
          <span
            aria-hidden
            className="size-2 rounded-full bg-scene shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">
            {scene.label}
          </span>
        </div>

        {/* Desktop: horizontal command bar along the bottom of the image */}
        <div className="absolute inset-x-0 bottom-0 hidden px-5 pb-5 md:block lg:px-8 lg:pb-6">
          <div className="mx-auto max-w-4xl">{bar}</div>
        </div>
      </div>

      {/* Mobile: panel rides up over the photo's bottom fade */}
      <div className="relative z-10 -mt-14 px-4 md:hidden">{panel}</div>
    </div>
  );
}
