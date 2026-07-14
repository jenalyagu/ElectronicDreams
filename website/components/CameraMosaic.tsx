"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Bell, Cctv, Lock, ShieldCheck, Video } from "lucide-react";

/**
 * CAMERA MOSAIC — full-bleed interactive demo for the Safety & Security
 * page. A wall of live-feeling camera feeds (real install photos with
 * security-cam chrome: REC dot, timestamp, label); tap a feed and the
 * wall re-orients NVR-style — the selected camera goes big with the
 * other feeds in a switcher rail beside it. A status panel sits flush
 * beside the wall with system state and a motion-event log.
 */

type Feed = {
  id: string;
  label: string;
  src: string;
  /** grade to sell the "camera" look */
  filter?: string;
};

const FEEDS: Feed[] = [
  { id: "front-door", label: "Front Door", src: "/rooms/camera-front-door.webp" },
  { id: "driveway", label: "Front Driveway", src: "/rooms/camera-front-driveway.webp" },
  { id: "back-porch", label: "Back Porch · Pool", src: "/rooms/camera-back-porch.webp" },
  { id: "living", label: "Living Room", src: "/rooms/camera-living.webp" },
  { id: "kitchen", label: "Kitchen", src: "/rooms/camera-kitchen.webp" },
  {
    id: "theater",
    label: "Media Room · IR",
    src: "/rooms/camera-theater.webp",
    // near-IR night-vision feel for the dark room
    filter: "grayscale(1) brightness(1.6) contrast(1.15) sepia(0.35) hue-rotate(60deg)",
  },
];

const EVENTS = [
  { t: "9:42 PM", msg: "Motion — driveway (person)" },
  { t: "8:15 PM", msg: "Front door locked automatically" },
  { t: "6:03 PM", msg: "Package detected — porch" },
];

export default function CameraMosaic() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string>("living");
  const [clock, setClock] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  /* live timestamp shared by all feeds */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setClock(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* auto-demo: hop to the front-door cam briefly on first view, then
     settle back on the living room */
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        timers.push(setTimeout(() => { if (!touched.current) setExpanded("front-door"); }, 1600));
        timers.push(setTimeout(() => { if (!touched.current) setExpanded("living"); }, 4600));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduceMotion]);

  const eased = reduceMotion ? "" : "transition-all duration-500 ease-out";

  /* One camera tile — the enlarged hero view, or a switcher thumb */
  const tile = (f: Feed, kind: "hero" | "thumb") => {
    const chrome = kind !== "thumb";
    const Tag = (kind === "hero" ? "div" : "button") as "button";
    return (
      <Tag
        key={f.id}
        {...(kind === "thumb"
          ? {
              type: "button" as const,
              onClick: () => {
                touched.current = true;
                setExpanded(f.id);
              },
              "aria-label": `Switch to the ${f.label} camera`,
            }
          : {})}
        className={`group relative w-full overflow-hidden rounded-xl border text-left ${eased} ${
          kind === "hero"
            ? "aspect-video border-glow/50 shadow-[0_0_34px_-8px_rgba(251,191,36,0.4)]"
            : "h-full min-h-0 border-white/15 hover:border-signal/60"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.src}
          alt=""
          aria-hidden
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${eased} ${kind === "thumb" ? "group-hover:scale-[1.03]" : ""}`}
          style={{ filter: f.filter }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />
        {chrome && (
          <>
            <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 backdrop-blur-sm">
              <span aria-hidden className={`size-1.5 rounded-full bg-danger ${reduceMotion ? "" : "led-dot"}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">REC</span>
            </div>
            <div className={`absolute right-2.5 top-2.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] tabular-nums text-white/90 backdrop-blur-sm ${kind === "hero" ? "" : "hidden sm:block"}`}>
              {clock}
            </div>
          </>
        )}
        <div className={`absolute bottom-2 left-2.5 flex items-center gap-1.5 ${kind === "thumb" ? "bottom-1.5" : "bottom-2.5"}`}>
          {chrome && <Video className="size-3.5 text-signal" aria-hidden />}
          <span className={`font-semibold uppercase tracking-wide text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.9)] ${kind === "thumb" ? "text-[9.5px]" : "text-[11px]"}`}>
            {f.label}
          </span>
        </div>
        {/* subtle scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ background: "repeating-linear-gradient(180deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)" }}
        />
      </Tag>
    );
  };

  /* NVR view: the selected camera at its true 16:9 (never cropped)
     beside the panel, with the switcher rail below both */
  const heroFeed = FEEDS.find((f) => f.id === expanded) ?? FEEDS[0];
  const railFeeds = FEEDS.filter((f) => f.id !== heroFeed.id);

  const wall = tile(heroFeed, "hero");

  const rail = (
    <div className="mt-2 grid grid-cols-5 gap-2 md:mt-2.5 md:gap-2.5">
      {railFeeds.map((f) => (
        <div key={f.id} className="aspect-video">
          {tile(f, "thumb")}
        </div>
      ))}
    </div>
  );

  const panel = (
    <div className="flex h-full w-full flex-col rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Security
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-ok/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ok">
          <ShieldCheck className="size-3.5" aria-hidden /> Armed · Home
        </span>
      </div>

      {/* status tiles */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center gap-1.5 text-glow">
            <Cctv className="size-4" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-dim">Cameras</span>
          </div>
          <p className="mt-1 font-display text-base font-semibold text-ink">6 live · 4K</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center gap-1.5 text-glow">
            <Lock className="size-4" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-dim">Doors</span>
          </div>
          <p className="mt-1 font-display text-base font-semibold text-ink">All locked</p>
        </div>
      </div>

      {/* event log — grows to fill the panel so it stays flush with the wall */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <div className="mb-2 flex items-center gap-1.5">
          <Bell className="size-4 text-ink-dim" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">Tonight</span>
        </div>
        <ul className="flex flex-1 flex-col justify-evenly gap-2">
          {EVENTS.map((e) => (
            <li key={e.t} className="flex flex-1 flex-col justify-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3">
              <span className="font-mono text-xs tabular-nums text-signal">{e.t}</span>
              <span className="text-sm leading-snug text-ink">{e.msg}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-center text-xs text-ink-dim">
        Tap a camera below to switch the view — from anywhere on earth.
      </p>
    </div>
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden bg-abyss">
      <div className="relative flex min-h-[58vh] w-full items-center py-6 md:min-h-[82vh]">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-stretch gap-4 lg:gap-6">
            {/* Enlarged feed — the panel stays flush beside it */}
            <div className="min-w-0 flex-1 md:self-stretch">{wall}</div>
            <div className="hidden w-80 shrink-0 md:block">{panel}</div>
          </div>
          {/* Expanded view: switcher rail across the full width, below
              both the enlarged image and the panel */}
          {rail}
        </div>
      </div>

      {/* Mobile: panel below the wall */}
      <div className="relative z-10 px-4 pb-6 md:hidden">{panel}</div>
    </div>
  );
}
