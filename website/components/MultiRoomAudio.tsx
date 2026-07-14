"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  Home,
  Music2,
  TreePalm,
  UtensilsCrossed,
  Volume2,
  type LucideIcon,
} from "lucide-react";

/**
 * MULTI-ROOM AUDIO — full-bleed "music follows you" demo. Real install
 * photography of three zones (in-ceiling speakers visible in each);
 * picking a room in the chip rail crossfades the photo and the music
 * "walks" there with you — same track, same beat, new room. An auto
 * walk-through (kitchen → living → patio) plays once on first view;
 * any tap (or reduced-motion) hands control to the visitor.
 */

type Zone = {
  id: string;
  name: string;
  /** short label for the chip rail — the full name lives in Now Playing */
  chip: string;
  icon: LucideIcon;
  src: string;
  /** where the music "is" in the story */
  blurb: string;
};

const ZONES: Zone[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    chip: "Kitchen",
    icon: UtensilsCrossed,
    src: "/rooms/audio-kitchen.webp",
    blurb: "Dinner prep with the playlist overhead — speakers in the ceiling, not on the counter.",
  },
  {
    id: "living",
    name: "Living Room",
    chip: "Living",
    icon: Home,
    src: "/rooms/audio-living.webp",
    blurb: "Carry your drink to the couch — the song never skips a beat on the way.",
  },
  {
    id: "patio",
    name: "Patio",
    chip: "Patio",
    icon: TreePalm,
    src: "/rooms/audio-patio.webp",
    blurb: "Step outside and the music is already there, in sync with every room inside.",
  },
];

const TRACK = { title: "Golden Hour Drive", artist: "The Midnight Coast" };

/* EQ bars — animated when music "plays", frozen under reduced motion */
function EqBars({ animate }: { animate: boolean }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0.9, 0.5, 1, 0.65, 0.8].map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-scene"
          style={
            animate
              ? { height: "100%", animation: `eq-bounce 1.1s ease-in-out ${i * 0.17}s infinite`, transformOrigin: "bottom" }
              : { height: `${h * 100}%` }
          }
        />
      ))}
      <style jsx>{`
        @keyframes eq-bounce {
          0%, 100% { transform: scaleY(0.35); }
          30% { transform: scaleY(1); }
          60% { transform: scaleY(0.55); }
        }
      `}</style>
    </span>
  );
}

export default function MultiRoomAudio() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const zone = ZONES[active];

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  /* Auto walk-through once on first view: kitchen → living → patio */
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        [1, 2].forEach((i, step) => {
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

  const panel = (
    <div className="w-full rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Whole-home Audio
        </span>
        <span className="font-mono text-[11px] uppercase tabular-nums text-signal">
          3 zones · synced
        </span>
      </div>

      {/* Room chip rail — pick a room, the music follows */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {ZONES.map(({ id, name, chip, icon: Icon }, i) => {
          const on = i === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={on}
              aria-label={`Send the music to the ${name}`}
              className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-1 py-2 transition-all duration-300 sm:px-2 ${
                on
                  ? "border-2 border-signal bg-signal/20 text-signal"
                  : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon className="hidden size-4 shrink-0 lg:block" aria-hidden />
              <span className="truncate text-[11px] font-medium sm:text-xs">
                {chip}
              </span>
            </button>
          );
        })}
      </div>

      {/* Now Playing — follows the active room */}
      <div className="mt-3.5 rounded-2xl border border-scene/40 bg-scene/[0.08] p-4 shadow-[0_0_20px_-6px_rgba(251,191,36,0.45)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-scene/40 bg-night/60">
              <Music2 className="size-5 text-scene" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-[15px] font-semibold leading-tight text-ink">
                {TRACK.title}
              </span>
              <span className="block truncate text-[11px] uppercase tracking-wide text-ink-dim/80">
                {TRACK.artist}
              </span>
            </span>
          </div>
          <EqBars animate={!reduceMotion} />
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="font-mono text-[10px] tabular-nums text-ink-dim">1:24</span>
          <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-scene" />
          </span>
          <span className="font-mono text-[10px] tabular-nums text-ink-dim">3:41</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide text-ok">
            <span aria-hidden className="size-1.5 rounded-full bg-ok" />
            Now playing · {zone.name}
          </span>
          <span className="inline-flex items-center gap-1 text-ink-dim">
            <Volume2 className="size-3.5" aria-hidden /> 62%
          </span>
        </div>
      </div>

      <p className="mt-3.5 text-sm leading-snug text-ink-dim">
        <span className="font-semibold text-ink">{zone.name}.</span>{" "}
        {zone.blurb}
      </p>
    </div>
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* Full-bleed room */}
      <div className="relative h-[52vh] min-h-[380px] w-full md:h-[82vh] md:min-h-[620px]">
        {ZONES.map((z, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={z.id}
            src={z.src}
            alt=""
            aria-hidden
            loading="lazy"
            className={`absolute inset-0 h-full w-full scale-[1.04] object-cover ${eased}`}
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}

        {/* Scrims — right wash for the floating panel, bottom fade */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-night/90 via-night/30 via-[42%] to-transparent to-[72%] md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent md:via-[18%]" />

        {/* Active zone chip, top-left over the photo */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 backdrop-blur-md sm:left-6 sm:top-6">
          <EqBars animate={!reduceMotion} />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">
            {zone.name}
          </span>
        </div>

        {/* Desktop: panel hugs the right edge of the image */}
        <div className="absolute inset-y-0 right-0 hidden items-center pr-5 md:flex lg:pr-8">
          <div className="w-full max-w-sm">{panel}</div>
        </div>
      </div>

      {/* Mobile: panel rides up over the photo's bottom fade */}
      <div className="relative z-10 -mt-14 px-4 md:hidden">{panel}</div>
    </div>
  );
}
