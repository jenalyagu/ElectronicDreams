"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowRight,
  Flame,
  Snowflake,
  Sparkles,
  Thermometer,
  Wind,
  Wrench,
} from "lucide-react";
import Magnetic from "@/components/fx/Magnetic";
import { prefillLeadForm } from "@/lib/lead-bus";
import {
  CONTROL_META,
  DEFAULT_CONTROLS,
  ROOM_SIMS,
  type ControlId,
  type RoomControls,
  type RoomId,
} from "@/components/RoomSim";
import { SITE } from "@/lib/site";

/**
 * HERO — the first screen. Left: the conversion split (design vs. fix).
 * Right: a live-feeling Control4-style glass touch panel floating over
 * full-bleed photography of the active room. The panel is the demo:
 * picking a room or flipping its lights/shades crossfades the photo
 * behind everything, so the page itself behaves like a room we
 * installed. Still cosmetic-only — no backend.
 */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 170, damping: 26 },
  },
};

/* Headline lines rise out of an overflow-hidden mask, like a screen
   powering on. Slower than fadeUp on purpose — it's the marquee move. */
const lineReveal: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Room cards + their simulated views live in components/RoomSim.tsx */

type ClimateMode = "heat" | "cool" | "auto" | "off";

const CLIMATE_MODES: Record<ClimateMode, { icon: typeof Flame; tone: string }> = {
  heat: { icon: Flame, tone: "text-glow" },
  cool: { icon: Snowflake, tone: "text-signal" },
  auto: { icon: Wind, tone: "text-signal" },
  off: { icon: Thermometer, tone: "text-gray-400" },
};

function ControlPanel({
  room,
  onRoomChange,
  controls,
  onToggleControl,
  activeSceneId,
  onSceneToggle,
  reduceMotion,
}: {
  /** Active room + its toggles live in <Hero /> — they drive the
      full-bleed room photo behind this panel. */
  room: RoomId;
  onRoomChange: (room: RoomId) => void;
  controls: RoomControls;
  onToggleControl: (control: ControlId) => void;
  /** One-tap scene photos (Goodnight…) — state lives in <Hero /> too */
  activeSceneId: string | null;
  onSceneToggle: (sceneId: string) => void;
  reduceMotion: boolean;
}) {
  const [climate, setClimate] = useState<ClimateMode>("auto");
  const [temp, setTemp] = useState(73);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m} ${now.getHours() >= 12 ? "PM" : "AM"}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ActiveClimateIcon = CLIMATE_MODES[climate].icon;

  return (
    <div
      style={{ boxShadow: "0 0 90px -24px rgba(251, 191, 36, 0.3)" }}
      className="relative rounded-3xl border border-white/15 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6"
    >
      {/* Glass sheen — kept faint so the room photo reads through */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-signal/5"
      />
      {/* Horizontal bar: title/clock · rooms + controls · climate.
          Falls back to stacked groups below lg. */}
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-7">
        {/* Title + clock */}
        <div className="flex items-center justify-between gap-6 lg:block lg:shrink-0">
          <h3 className="text-lg font-bold text-white">
            Smart Home
            <br className="hidden lg:block" /> Control
          </h3>
          <motion.div
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-mono text-lg tabular-nums text-signal"
          >
            {time || "—:—"}
          </motion.div>
        </div>

        <div aria-hidden className="hidden h-16 w-px shrink-0 bg-white/10 lg:block" />

        {/* Rooms + room controls, stacked rows filling the middle */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Room selector — switching rooms swaps the photo behind the panel.
              One row of four at every width: buttons share the row and
              compress (smaller text, icons hidden) on small screens. */}
          <div className="sm:flex sm:items-center sm:gap-2">
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 sm:mb-0 sm:w-24 sm:shrink-0">
              Rooms
            </h4>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
            {ROOM_SIMS.map(({ id, name, icon: Icon, temp: roomTemp }, index) => {
              const active = room === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  onClick={() => {
                    onRoomChange(id);
                    setTemp(roomTemp);
                  }}
                  aria-pressed={active}
                  className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-1 py-2 text-left transition-all duration-300 sm:min-h-0 sm:flex-initial sm:justify-start sm:px-3 ${
                    active
                      ? "border-2 border-signal bg-signal/20 text-signal"
                      : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="hidden size-4 shrink-0 sm:block" aria-hidden />
                  <span className="truncate text-[11px] font-medium sm:text-sm">{name}</span>
                </motion.button>
              );
            })}
            </div>
          </div>

          {/* Room controls — toggles change the room photo behind the panel.
              Also a single non-wrapping row on small screens. */}
          <div className="sm:flex sm:items-center sm:gap-2">
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 sm:mb-0 sm:w-24 sm:shrink-0">
              Room Controls
            </h4>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:flex-wrap sm:gap-2">
            {(ROOM_SIMS.find((r) => r.id === room)?.controls ?? []).map((id) => {
              const meta = CONTROL_META[id];
              const active = controls[id];
              const Icon = meta.icon;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onToggleControl(id)}
                  aria-pressed={active}
                  className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-1 py-2 text-[11px] font-medium transition-all duration-300 sm:min-h-0 sm:flex-initial sm:px-3.5 sm:text-xs ${
                    active
                      ? "border border-signal bg-signal/25 text-signal"
                      : "border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="hidden size-3.5 shrink-0 sm:block" aria-hidden />
                  <span className="truncate">{meta.label}</span>
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${active ? "bg-ok" : "bg-gray-500"}`}
                  />
                </button>
              );
            })}

            {/* One-tap scenes — amber "scene" styling by default; scenes
                with accent "signal" match the standard control chips */}
            {(ROOM_SIMS.find((r) => r.id === room)?.scenes ?? []).map((scene) => {
              const active = activeSceneId === scene.id;
              const Icon = scene.icon;
              const cls =
                scene.accent === "signal"
                  ? active
                    ? "border border-signal bg-signal/25 text-signal"
                    : "border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"
                  : active
                    ? "border border-glow bg-glow/25 text-glow shadow-[0_0_16px_rgba(251,191,36,0.25)]"
                    : "border border-glow/30 bg-white/5 text-glow-soft/80 hover:bg-glow/10";
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => onSceneToggle(scene.id)}
                  aria-pressed={active}
                  className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-1 py-2 text-[11px] font-medium transition-all duration-300 sm:min-h-0 sm:flex-initial sm:px-3.5 sm:text-xs ${cls}`}
                >
                  <Icon className="hidden size-3.5 shrink-0 sm:block" aria-hidden />
                  <span className="truncate">{scene.label}</span>
                </button>
              );
            })}
            </div>
          </div>
        </div>

        <div aria-hidden className="hidden h-16 w-px shrink-0 bg-white/10 lg:block" />

        {/* Climate — compact horizontal group */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="shrink-0 space-y-2"
        >
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Climate Control
            </h4>
            <ActiveClimateIcon className={`size-4 ${CLIMATE_MODES[climate].tone}`} aria-hidden />
            <span className="text-xs uppercase text-gray-400">{climate}</span>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.6 }}
              className="text-4xl font-bold tabular-nums text-white"
            >
              {temp}&deg;
            </motion.div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setTemp((t) => Math.min(t + 1, 85))}
                aria-label="Increase temperature"
                className="flex size-8 items-center justify-center rounded-full bg-glow/20 text-xs text-glow transition-colors hover:bg-glow/40 sm:size-6"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setTemp((t) => Math.max(t - 1, 60))}
                aria-label="Decrease temperature"
                className="flex size-8 items-center justify-center rounded-full bg-signal/20 text-xs text-signal transition-colors hover:bg-signal/40 sm:size-6"
              >
                &minus;
              </button>
            </div>
            <div className="grid max-w-40 grid-cols-2 gap-1.5">
              {(Object.keys(CLIMATE_MODES) as ClimateMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setClimate(mode)}
                  aria-pressed={climate === mode}
                  className={`min-h-11 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 sm:min-h-0 ${
                    climate === mode
                      ? "border border-signal bg-signal/30 text-signal"
                      : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Design/fix CTAs + consultation link + service area. Rendered under
    the copy on desktop and under the control panel on small screens. */
function HeroCtas() {
  return (
    <div>
      {/* Primary split: design vs. fix (magnetic on desktop) */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <Magnetic className="w-full sm:w-auto">
          <motion.a
            href="#new-project"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glow-cta flex w-full items-center justify-center gap-2 rounded-xl bg-glow px-7 py-4 text-base font-semibold text-glow-ink sm:w-auto"
          >
            <Sparkles className="size-5" aria-hidden />
            Design my smart home
          </motion.a>
        </Magnetic>
        <Magnetic className="w-full sm:w-auto">
          <motion.a
            href="/rescue-desk"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glass flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-ink hover:border-signal/50 sm:w-auto"
          >
            <Wrench className="size-5 text-signal" aria-hidden />
            Fix my system
          </motion.a>
        </Magnetic>
      </div>

      {/* Consultation CTA + service area, from the retired
          "New projects & installations" panel */}
      <a
        href="#service-request"
        onClick={() => prefillLeadForm({ issue: "new-project", supportType: "consult" })}
        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
      >
        Book my free consultation — no pressure, just a plan and a number
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </a>

      <p className="mt-2.5 text-sm text-ink-dim">
        Serving {SITE.serviceAreas.slice(0, 5).join(", ")} &amp; the greater
        Houston area
      </p>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  /* Active room + toggles — they drive the full-bleed photo behind
     everything, so the whole hero IS the room being controlled. */
  const [room, setRoom] = useState<RoomId>("kitchen");
  const [roomControls, setRoomControls] = useState<Record<RoomId, RoomControls>>(
    () =>
      Object.fromEntries(
        ROOM_SIMS.map((r) => [r.id, { ...DEFAULT_CONTROLS }]),
      ) as Record<RoomId, RoomControls>,
  );
  /* One-tap scenes (Goodnight, Entertain…) override the state matrix;
     touching any toggle exits the scene. */
  const [sceneByRoom, setSceneByRoom] = useState<Record<RoomId, string | null>>({
    living: null,
    kitchen: null,
    theater: null,
    backyard: null,
  });
  const activeRoom = ROOM_SIMS.find((r) => r.id === room) ?? ROOM_SIMS[0];
  const rc = roomControls[room];
  const lit = room === "backyard" ? rc.path : rc.lights;
  const activeScene =
    activeRoom.scenes?.find((s) => s.id === sceneByRoom[room]) ?? null;
  /* Photo for the current control combination — key built per the
     room's photoControls (see RoomSim.tsx) */
  const stateKey = activeRoom.photoControls
    ?.map((c) => (rc[c] ? "on" : "off"))
    .join("-");
  const activeSrc = activeScene
    ? activeScene.src
    : (activeRoom.states && stateKey && activeRoom.states[stateKey]) ||
      activeRoom.frame;
  /* Every possible background, stacked once (deduped — some states
     share a photo) so changes crossfade with no loading flash. */
  const allBackgrounds = [
    ...new Set(
      ROOM_SIMS.flatMap((r) => [
        ...(r.states ? Object.values(r.states) : [r.frame]),
        ...(r.scenes?.map((s) => s.src) ?? []),
      ]),
    ),
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
      {/* The room itself — full-bleed photography behind the panel.
          md and up: small screens get a letterboxed photo band in the
          flow instead (Option A), so nothing covers the scene. */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        {allBackgrounds.map((src) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            /* Backyard shots carry a lot of sky — scale up slightly and
               lift the frame so more house, less sky */
            style={src.includes("backyard") ? { scale: 1.15, y: "-5%" } : undefined}
            fetchPriority={src === activeSrc ? "high" : "low"}
            initial={false}
            animate={{
              opacity: src === activeSrc ? 1 : 0,
              filter:
                src === activeSrc && !activeRoom.states && !lit
                  ? "brightness(0.38) saturate(0.7)"
                  : "brightness(1) saturate(1)",
            }}
            transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeInOut" }}
          />
        ))}
        {/* Two overlays only, both fading to nothing so the open area of
            the photo stays untouched: a copy-side scrim that ends by 55%
            of the width, and a bottom fade that starts below the CTAs */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/25 via-[32%] to-transparent to-[55%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[75%] to-night" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <motion.div variants={stagger} initial={initial} animate="visible">
            <motion.p variants={fadeUp} className="eyebrow mb-4 inline-flex items-center gap-2">
              <Sparkles className="size-3.5" aria-hidden />
              Houston · Control4 Gold Dealer · {SITE.yearsInBusiness}+ Years
            </motion.p>

            {/* Each line rises out of a mask — the "screen powering on" moment.
                (The slogan headline lives on the film's title card above.) */}
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineReveal} className="block">
                  Imagine your
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span variants={lineReveal} className="text-glow-gradient block">
                  smart home.
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-dim"
            >
              From the first design sketch to the service call years later,
              one Houston team owns the whole system —{" "}
              <strong className="font-semibold text-ink">
                and we&rsquo;ll take yours over, even if someone else installed
                it.
              </strong>
            </motion.p>

            {/* md and up: CTAs under the copy. On small screens they
                render below the panel instead (Option A stack). */}
            <motion.div variants={fadeUp} className="mt-7 hidden md:block">
              <HeroCtas />
            </motion.div>
          </motion.div>

          {/* Small screens: the room as a letterboxed live view. The
              container is 12.8:9 — object-cover trims 10% from each
              side of the 16:9 photo so it renders larger, while the
              action (windows, shades, screen) stays in frame */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-7 overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:hidden"
          >
            <div className="relative aspect-[64/45] w-full">
              {allBackgrounds.map((src) => (
                <motion.img
                  key={src}
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  fetchPriority={src === activeSrc ? "high" : "low"}
                  initial={false}
                  animate={{
                    opacity: src === activeSrc ? 1 : 0,
                    filter:
                      src === activeSrc && !activeRoom.states && !lit
                        ? "brightness(0.38) saturate(0.7)"
                        : "brightness(1) saturate(1)",
                  }}
                  transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>

          {/* Horizontal control bar below the copy — keeps the room
              photography visible across the full hero */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.15 }}
            className="mt-6 md:mt-10"
          >
            <ControlPanel
              room={room}
              onRoomChange={setRoom}
              controls={rc}
              onToggleControl={(control) => {
                /* touching a manual control exits any running scene */
                setSceneByRoom((prev) => ({ ...prev, [room]: null }));
                setRoomControls((prev) => ({
                  ...prev,
                  [room]: { ...prev[room], [control]: !prev[room][control] },
                }));
              }}
              activeSceneId={sceneByRoom[room]}
              onSceneToggle={(sceneId) => {
                const engaging = sceneByRoom[room] !== sceneId;
                /* Engaging a scene also sets the toggles it implies
                   (e.g. Goodnight turns the Lights chip off) */
                const sets = engaging
                  ? activeRoom.scenes?.find((s) => s.id === sceneId)?.sets
                  : undefined;
                if (sets) {
                  setRoomControls((prev) => ({
                    ...prev,
                    [room]: { ...prev[room], ...sets },
                  }));
                }
                setSceneByRoom((prev) => ({
                  ...prev,
                  [room]: engaging ? sceneId : null,
                }));
              }}
              reduceMotion={!!reduceMotion}
            />
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-4 text-center text-sm text-ink-dim"
            >
              This panel is live — pick a room and flip its lights and shades;
              the house <span className="md:hidden">above</span>
              <span className="hidden md:inline">behind it</span> follows, the
              way your home would.
            </motion.p>
          </motion.div>

          {/* Small screens: CTAs below the panel, on the solid night
              background (Option A stack) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 md:hidden"
          >
            <HeroCtas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
