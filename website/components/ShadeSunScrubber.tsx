"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  Blinds,
  Droplets,
  Flame,
  Lightbulb,
  Thermometer,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * WHOLE-HOME SCRUBBER — interactive demo for the Climate & Shades page.
 *
 * Drag through an evening on a real Electronic Dreams install: the
 * motorized shades track the setting sun, then the pool, spa, fireplace,
 * landscape lighting, and interior scenes come alive on schedule — all
 * from one timeline. Real photography of the same house is cross-faded
 * (and lightly graded per moment); a live readout shows each system
 * responding. A gentle auto-sweep plays once on first view; any
 * interaction (or reduced-motion) hands control to the visitor.
 *
 * NOTE: photos are placeholders from the existing backyard set (all
 * dusk→night). A true midday frame would need a daytime photo of the
 * same house — swap `src`/`filter` per stop when that exists.
 */

type SystemState = { value: string; on: boolean };

type Stop = {
  t: number; // position along the evening, 0 (afternoon) → 1 (night)
  label: string;
  time: string;
  src: string;
  filter: string; // per-photo grade to sell the time of day
  caption: string;
  systems: {
    shades: SystemState;
    pool: SystemState;
    spa: SystemState;
    fireplace: SystemState;
    lights: SystemState;
    thermostat: SystemState;
  };
};

const P = (name: string) => `/rooms/${name}.webp`;

const STOPS: Stop[] = [
  {
    t: 0,
    label: "Golden hour",
    time: "6:20 PM",
    src: P("backyard-lights-off-shades-open"),
    filter: "brightness(1.5) saturate(1.15) contrast(1.02) sepia(0.12) hue-rotate(-8deg)",
    caption: "Low sun, shades easing down — the pool circulates for later.",
    systems: {
      shades: { value: "20% closed", on: false },
      pool: { value: "Circulating", on: true },
      spa: { value: "Off", on: false },
      fireplace: { value: "Off", on: false },
      lights: { value: "Off", on: false },
      thermostat: { value: "74°F", on: true },
    },
  },
  {
    t: 0.25,
    label: "Sunset",
    time: "7:15 PM",
    src: P("backyard-lights-off-shades-closed"),
    filter: "brightness(1.22) saturate(1.2) sepia(0.14) hue-rotate(-6deg)",
    caption: "Western glare blocked — shades to 60% as the sky turns.",
    systems: {
      shades: { value: "60% closed", on: true },
      pool: { value: "Warming", on: true },
      spa: { value: "Heating", on: true },
      fireplace: { value: "Off", on: false },
      lights: { value: "Path lights", on: true },
      thermostat: { value: "73°F", on: true },
    },
  },
  {
    t: 0.5,
    label: "Dusk",
    time: "8:10 PM",
    src: P("backyard-lights-on-shades-open"),
    filter: "brightness(1.05) saturate(1.1)",
    caption: "Shades reopen for the skyline; landscape lighting layers in.",
    systems: {
      shades: { value: "40% closed", on: true },
      pool: { value: "86°F · lit", on: true },
      spa: { value: "Heating", on: true },
      fireplace: { value: "On", on: true },
      lights: { value: "Landscape", on: true },
      thermostat: { value: "72°F", on: true },
    },
  },
  {
    t: 0.75,
    label: "Evening",
    time: "9:00 PM",
    src: P("backyard-house-lights"),
    filter: "brightness(1.02) saturate(1.1)",
    caption: "“Evening” scene: architectural facade lit, pool and spa warm, fireplace on.",
    systems: {
      shades: { value: "30% closed", on: true },
      pool: { value: "88°F · lit", on: true },
      spa: { value: "102°F", on: true },
      fireplace: { value: "On", on: true },
      lights: { value: "Architectural", on: true },
      thermostat: { value: "72°F", on: true },
    },
  },
  {
    t: 1,
    label: "Goodnight",
    time: "11:00 PM",
    src: P("backyard-lights-on-shades-closed"),
    filter: "brightness(0.9) saturate(1.03)",
    caption: "Goodnight: shades close and the bright exterior dims to security lighting.",
    systems: {
      shades: { value: "100% closed", on: true },
      pool: { value: "Idle", on: false },
      spa: { value: "Off", on: false },
      fireplace: { value: "Off", on: false },
      lights: { value: "Security path", on: true },
      thermostat: { value: "70°F", on: true },
    },
  },
];

const SYSTEMS: { key: keyof Stop["systems"]; label: string; icon: LucideIcon }[] = [
  { key: "shades", label: "Shades", icon: Blinds },
  { key: "pool", label: "Pool", icon: Waves },
  { key: "spa", label: "Spa", icon: Droplets },
  { key: "fireplace", label: "Fireplace", icon: Flame },
  { key: "lights", label: "Lights", icon: Lightbulb },
  { key: "thermostat", label: "Thermostat", icon: Thermometer },
];

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

/** Nearest labeled stop — drives the readout, caption, and time. */
function nearestStop(v: number) {
  return STOPS.reduce((best, s) =>
    Math.abs(s.t - v) < Math.abs(best.t - v) ? s : best,
  );
}

export default function ShadeSunScrubber() {
  const reduceMotion = useReducedMotion();
  const [v, setV] = useState(0.5); // rest on the dusk "everything alive" frame
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const userTouched = useRef(false);

  const stop = nearestStop(v);

  const stopAuto = () => {
    userTouched.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  /* Gentle one-time sweep the first time the demo scrolls into view. */
  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || userTouched.current) return;
        io.disconnect();
        const DURATION = 9000;
        let start: number | null = null;
        const step = (ts: number) => {
          if (userTouched.current) return;
          if (start === null) start = ts;
          const p = Math.min((ts - start) / DURATION, 1);
          // sweep afternoon → night, then settle on the dusk frame
          setV(p < 0.82 ? p / 0.82 : lerp(1, 0.5, (p - 0.82) / 0.18));
          if (p < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const eased = reduceMotion ? "" : "transition-all duration-700 ease-out";

  const panel = (
    <div className="w-full rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Whole-Home Timeline
        </span>
        <span className="font-mono text-[11px] tabular-nums text-signal">
          {stop.time}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {SYSTEMS.map(({ key, label, icon: Icon }) => {
          const st = stop.systems[key];
          return (
            <div
              key={key}
              className={`rounded-xl border p-3 ${eased} ${
                st.on
                  ? "border-glow/30 bg-glow/[0.07]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon
                  className={`size-4 ${st.on ? "text-glow" : "text-ink-dim"}`}
                  aria-hidden
                />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-dim">
                  {label}
                </span>
              </div>
              <p
                className={`mt-1 font-display text-base font-semibold tabular-nums ${
                  st.on ? "text-ink" : "text-ink-dim"
                }`}
              >
                {st.value}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-3.5 text-sm leading-snug text-ink-dim">
        <span className="font-semibold text-ink">{stop.label}.</span>{" "}
        {stop.caption}
      </p>

      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={v}
          onChange={(e) => {
            stopAuto();
            setV(parseFloat(e.target.value));
          }}
          onPointerDown={stopAuto}
          aria-label="Time of evening — drag to move through the day and watch the home respond"
          className="home-scrubber w-full"
        />
        <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-ink-dim">
          {STOPS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => {
                stopAuto();
                setV(s.t);
              }}
              className="transition-colors hover:text-ink"
            >
              {s.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Full-bleed home */}
      <div className="relative h-[52vh] min-h-[380px] w-full md:h-[82vh] md:min-h-[620px]">
        {STOPS.map((s) => {
          const weight = Math.max(0, 1 - Math.abs(v - s.t) / 0.25);
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.label}
              src={s.src}
              alt=""
              aria-hidden
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover ${eased}`}
              style={{
                opacity: weight,
                filter: s.filter,
                transform: "scale(1.08)",
                transformOrigin: "50% 62%",
              }}
            />
          );
        })}

        {/* Scrims — right wash for the floating panel, bottom fade */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-night/90 via-night/30 via-[42%] to-transparent to-[72%] md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent md:via-[18%]" />

        {/* Active moment chip, top-left over the photo */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 backdrop-blur-md sm:left-6 sm:top-6">
          <span
            aria-hidden
            className="size-2 rounded-full bg-glow shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">
            {stop.label}
          </span>
        </div>

        {/* Desktop: panel hugs the right edge of the image */}
        <div className="absolute inset-y-0 right-0 hidden items-center pr-5 md:flex lg:pr-8">
          <div className="w-full max-w-md">{panel}</div>
        </div>
      </div>

      {/* Mobile: panel rides up over the photo's bottom fade */}
      <div className="relative z-10 -mt-14 px-4 md:hidden">{panel}</div>

      {/* Range styling — amber thumb, afternoon→night track */}
      <style jsx>{`
        .home-scrubber {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            #f3b45c 0%,
            #d98a4e 22%,
            #a05a7a 50%,
            #3a3f6b 75%,
            #070c1a 100%
          );
          cursor: pointer;
          outline: none;
        }
        .home-scrubber::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #fbbf24;
          border: 3px solid #0a0f1e;
          box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.5), 0 0 18px rgba(251, 191, 36, 0.5);
        }
        .home-scrubber::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #fbbf24;
          border: 3px solid #0a0f1e;
          box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.5), 0 0 18px rgba(251, 191, 36, 0.5);
        }
      `}</style>
    </div>
  );
}
