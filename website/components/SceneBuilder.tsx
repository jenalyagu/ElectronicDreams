"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BedDouble,
  Blinds,
  Cctv,
  Check,
  Clapperboard,
  Cpu,
  Gamepad2,
  Laptop,
  Lightbulb,
  Music4,
  Router,
  Sofa,
  Thermometer,
  Trees,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  BUILDER_CORE,
  BUILDER_ROOMS,
  BUILDER_UPGRADES,
  type BuilderUpgrade,
} from "@/lib/content";
import { prefillLeadForm } from "@/lib/lead-bus";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Laptop,
  Gamepad2,
  Trees,
  Lightbulb,
  Music4,
  Blinds,
  Thermometer,
  Cctv,
  Router,
  Clapperboard,
};

/** "$4,500" under 10k, "$18k" over — ballparks should read like ballparks. */
const fmt = (n: number) =>
  n >= 10000 ? `$${Math.round(n / 1000)}k` : `$${n.toLocaleString("en-US")}`;

/**
 * SCENE BUILDER — the "design" funnel's interactive estimator.
 * Pick rooms → pick upgrades → watch a live investment range build.
 * The payoff CTA pre-fills the service request form with the whole
 * plan, so the lead arrives with room list, upgrades, and budget
 * expectations already set. Ranges live in lib/content.ts.
 */
export default function SceneBuilder() {
  const [rooms, setRooms] = useState<Set<string>>(new Set());
  const [upgrades, setUpgrades] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const selectedUpgrades = BUILDER_UPGRADES.filter((u) => upgrades.has(u.id));
  const roomCount = rooms.size;
  const ready = roomCount > 0 && selectedUpgrades.length > 0;

  const [low, high] = useMemo(() => {
    if (!ready) return [0, 0];
    let lo = BUILDER_CORE.range[0];
    let hi = BUILDER_CORE.range[1];
    for (const u of selectedUpgrades) {
      const mult = u.per === "room" ? roomCount : 1;
      lo += u.range[0] * mult;
      hi += u.range[1] * mult;
    }
    return [lo, hi];
  }, [ready, selectedUpgrades, roomCount]);

  const sendPlan = () => {
    const roomNames = BUILDER_ROOMS.filter((r) => rooms.has(r.id)).map((r) => r.name);
    prefillLeadForm({
      issue: "new-project",
      supportType: "consult",
      message:
        `Scene Builder plan — Rooms: ${roomNames.join(", ")}. ` +
        `Upgrades: ${selectedUpgrades.map((u) => u.title).join(", ")}. ` +
        `Ballpark shown: ${fmt(low)}–${fmt(high)}.`,
    });
  };

  return (
    <section
      id="new-project"
      aria-labelledby="scene-builder-heading"
      className="border-y border-line/60 bg-abyss/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Scene Builder</p>
          <h2
            id="scene-builder-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Sketch your system in 60 seconds
          </h2>
          <p className="mt-4 leading-relaxed text-ink-dim">
            Pick the rooms, pick the upgrades, and get an honest ballpark on the
            spot — before you ever talk to anyone.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* ---------- pickers ---------- */}
          <div className="space-y-10">
            <Reveal>
              <h3 className="mb-4 flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="grid size-7 place-items-center rounded-full bg-glow text-xs font-bold text-glow-ink">
                  1
                </span>
                Which rooms are we working with?
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BUILDER_ROOMS.map(({ id, name, icon }) => {
                  const Icon = ICONS[icon] ?? Sofa;
                  const active = rooms.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRooms((s) => toggle(s, id))}
                      aria-pressed={active}
                      className={`flex min-h-12 items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-signal bg-signal/15 text-signal"
                          : "border-line bg-panel text-ink-dim hover:border-signal/40 hover:text-ink"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden />
                      <span className="truncate">{name}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="mb-4 flex items-center gap-2.5 font-display text-lg font-semibold">
                <span className="grid size-7 place-items-center rounded-full bg-glow text-xs font-bold text-glow-ink">
                  2
                </span>
                What should they do?
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {BUILDER_UPGRADES.map((u) => {
                  const Icon = ICONS[u.icon] ?? Lightbulb;
                  const active = upgrades.has(u.id);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUpgrades((s) => toggle(s, u.id))}
                      aria-pressed={active}
                      className={`group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-200 ${
                        active
                          ? "border-glow/60 bg-glow/[0.07]"
                          : "border-line bg-panel hover:border-glow/30"
                      }`}
                    >
                      <span
                        className={`absolute right-4 top-4 grid size-5 place-items-center rounded-full border transition-colors ${
                          active
                            ? "border-glow bg-glow text-glow-ink"
                            : "border-line text-transparent"
                        }`}
                        aria-hidden
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span
                        className={`grid size-10 place-items-center rounded-lg transition-colors ${
                          active ? "bg-glow/15 text-glow" : "bg-panel-2 text-ink-dim"
                        }`}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="mt-3 pr-6 font-display text-base font-semibold">
                        {u.title}
                      </span>
                      <span className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                        {u.blurb}
                      </span>
                      <span className="mt-3 text-xs font-medium text-ink-dim">
                        {fmt(u.range[0])}–{fmt(u.range[1])}
                        <span className="text-ink-dim/70">
                          {" "}
                          {u.per === "room" ? "per room" : "whole home"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ---------- live plan summary ---------- */}
          <Reveal delay={140} className="lg:self-start lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
              <h3 className="font-display text-lg font-semibold">Your system plan</h3>

              {!ready ? (
                <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                  Select at least one room and one upgrade and your ballpark
                  builds itself right here.
                </p>
              ) : (
                <>
                  <ul className="mt-5 space-y-2.5 border-t border-line/60 pt-5 text-sm">
                    <li className="flex items-start justify-between gap-3">
                      <span className="text-ink-dim">
                        {roomCount} room{roomCount > 1 ? "s" : ""}
                      </span>
                      <span className="text-right font-medium">
                        {BUILDER_ROOMS.filter((r) => rooms.has(r.id))
                          .map((r) => r.name)
                          .join(" · ")}
                      </span>
                    </li>
                    {selectedUpgrades.map((u) => (
                      <li key={u.id} className="flex items-center justify-between gap-3">
                        <span className="text-ink-dim">{u.title}</span>
                        <span className="shrink-0 font-medium tabular-nums">
                          {rangeFor(u, roomCount)}
                        </span>
                      </li>
                    ))}
                    <li className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-ink-dim">
                        <Cpu className="size-3.5 text-glow" aria-hidden />
                        {BUILDER_CORE.title}
                      </span>
                      <span className="shrink-0 font-medium tabular-nums">included</span>
                    </li>
                  </ul>

                  <div className="mt-6 border-t border-line/60 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-dim">
                      Typical investment
                    </p>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={`${low}-${high}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="mt-1 font-display text-4xl font-bold tracking-tight text-glow-gradient"
                      >
                        {fmt(low)}–{fmt(high)}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <a
                    href="#service-request"
                    onClick={sendPlan}
                    className="glow-cta mt-6 flex items-center justify-center gap-2 rounded-xl bg-glow px-6 py-4 text-base font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send me my system plan
                    <ArrowRight className="size-5" aria-hidden />
                  </a>
                </>
              )}

              <p className="mt-4 text-xs leading-relaxed text-ink-dim">
                Ballparks based on typical Houston projects — every home is
                different. You&rsquo;ll get an exact proposal after a free
                consultation, before any work begins.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function rangeFor(u: BuilderUpgrade, roomCount: number) {
  const mult = u.per === "room" ? roomCount : 1;
  return `${fmt(u.range[0] * mult)}–${fmt(u.range[1] * mult)}`;
}
