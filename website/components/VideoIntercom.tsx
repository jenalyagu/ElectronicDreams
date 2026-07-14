"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Bell, Lamp, Lock, LockOpen, Mic, PhoneOff, Video } from "lucide-react";

/**
 * VIDEO INTERCOM — full-bleed "answer the door from anywhere" demo for
 * the Intercom Anywhere page. A doorbell-camera view of a courier at
 * the front door with an incoming-call panel: Talk opens two-way audio
 * (animated waveform), Porch Light crossfades the photo to the lit
 * shot, Unlock flips the door tile, Dismiss resets the call. An auto
 * demo plays ring → answer → light → unlock once on first view.
 */

const SHOT_DARK = "/rooms/intercom-door.webp";
const SHOT_LIT = "/rooms/intercom-door-lit.webp";

/* Animated mic waveform while two-way audio is "live" */
function Waveform({ animate }: { animate: boolean }) {
  return (
    <span className="flex h-3.5 items-center gap-[2.5px]" aria-hidden>
      {[0.5, 0.9, 0.6, 1, 0.7, 0.45, 0.8].map((h, i) => (
        <span
          key={i}
          className="w-[2.5px] rounded-full bg-scene"
          style={
            animate
              ? { height: "100%", animation: `wave-bounce 0.9s ease-in-out ${i * 0.11}s infinite`, transformOrigin: "center" }
              : { height: `${h * 100}%` }
          }
        />
      ))}
      <style jsx>{`
        @keyframes wave-bounce {
          0%, 100% { transform: scaleY(0.3); }
          45% { transform: scaleY(1); }
          70% { transform: scaleY(0.5); }
        }
      `}</style>
    </span>
  );
}

export default function VideoIntercom() {
  const reduceMotion = useReducedMotion();
  const [ringing, setRinging] = useState(true);
  const [talking, setTalking] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [clock, setClock] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  /* live timestamp on the camera chrome */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Auto-demo once on first view: answer → porch light → unlock */
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        const step = (ms: number, fn: () => void) =>
          timers.push(setTimeout(() => { if (!touched.current) fn(); }, ms));
        step(1600, () => { setRinging(false); setTalking(true); });
        step(3400, () => setLightOn(true));
        step(5000, () => setUnlocked(true));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduceMotion]);

  function handleAction(id: string) {
    touched.current = true;
    if (id === "talk") {
      setRinging(false);
      setTalking(true);
    } else if (id === "unlock") {
      setRinging(false);
      setUnlocked(true);
    } else if (id === "light") {
      setLightOn((v) => !v);
    } else {
      // dismiss — the courier tries again, so the demo resets
      setTalking(false);
      setUnlocked(false);
      setLightOn(false);
      setRinging(true);
    }
  }

  const eased = reduceMotion ? "" : "transition-all duration-700 ease-out";

  const actions: {
    id: string;
    label: string;
    icon: typeof Mic;
    on: boolean;
  }[] = [
    { id: "talk", label: talking ? "Talking" : "Talk", icon: Mic, on: talking },
    { id: "unlock", label: unlocked ? "Unlocked" : "Unlock", icon: unlocked ? LockOpen : Lock, on: unlocked },
    { id: "light", label: "Porch Light", icon: Lamp, on: lightOn },
    { id: "dismiss", label: "Dismiss", icon: PhoneOff, on: false },
  ];

  const panel = (
    <div className="w-full rounded-3xl border border-white/15 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-lg backdrop-saturate-150 sm:p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-dim">
          Intercom Anywhere
        </span>
        <span className="font-mono text-[11px] uppercase tabular-nums text-signal">
          4Sight · Connected
        </span>
      </div>

      {/* Incoming call card */}
      <div
        className={`rounded-2xl border p-4 transition-colors duration-300 ${
          ringing
            ? "border-scene/50 bg-scene/[0.08] shadow-[0_0_20px_-6px_rgba(251,191,36,0.5)]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl border ${
              ringing ? "border-scene/50 bg-night/60" : "border-white/10 bg-night/60"
            }`}
          >
            <Bell
              className={`size-5 ${ringing ? "text-scene" : "text-ink-dim"} ${
                ringing && !reduceMotion ? "animate-[ring-shake_1.1s_ease-in-out_infinite]" : ""
              }`}
              aria-hidden
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[15px] font-semibold leading-tight text-ink">
              Front Door
            </span>
            <span className="block text-[11px] uppercase tracking-wide text-ink-dim/80">
              {ringing ? "Visitor at the door · ringing" : talking ? "Two-way audio live" : "Call ended"}
            </span>
          </span>
          {talking ? (
            <Waveform animate={!reduceMotion} />
          ) : (
            ringing && (
              <span
                aria-hidden
                className={`size-2.5 rounded-full bg-scene shadow-[0_0_9px_2px_rgba(251,191,36,0.7)] ${
                  reduceMotion ? "" : "animate-pulse"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* Call actions */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {actions.map(({ id, label, icon: Icon, on }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleAction(id)}
            aria-pressed={on}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
              on
                ? "border-scene/50 bg-scene/[0.12] text-scene shadow-[0_0_16px_-6px_rgba(251,191,36,0.5)]"
                : "border-white/10 bg-white/[0.03] text-ink-dim hover:border-white/25 hover:bg-white/[0.06] hover:text-ink"
            }`}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {/* Door + porch status */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className={`rounded-xl border px-3 py-2 transition-colors duration-300 ${unlocked ? "border-scene/30 bg-scene/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-dim">Front door</span>
          <span className={`font-display text-[13px] font-semibold ${unlocked ? "text-scene" : "text-ink"}`}>
            {unlocked ? "Unlocked ✓" : "Locked"}
          </span>
        </div>
        <div className={`rounded-xl border px-3 py-2 transition-colors duration-300 ${lightOn ? "border-scene/30 bg-scene/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-dim">Porch light</span>
          <span className={`font-display text-[13px] font-semibold ${lightOn ? "text-scene" : "text-ink"}`}>
            {lightOn ? "On" : "Off"}
          </span>
        </div>
      </div>

      <p className="mt-3.5 text-sm leading-snug text-ink-dim">
        Answer from your phone, a touch screen, or the TV — at work, at
        dinner, or at 30,000 feet.
      </p>

      <style jsx>{`
        @keyframes ring-shake {
          0%, 100% { transform: rotate(0); }
          10% { transform: rotate(12deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(7deg); }
          40% { transform: rotate(-5deg); }
          50% { transform: rotate(0); }
        }
      `}</style>
    </div>
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* Full-bleed doorbell camera view */}
      <div className="relative h-[52vh] min-h-[380px] w-full md:h-[82vh] md:min-h-[620px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHOT_DARK}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHOT_LIT}
          alt=""
          aria-hidden
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${eased}`}
          style={{ opacity: lightOn ? 1 : 0 }}
        />

        {/* Scrims — right wash for the floating panel, bottom fade */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-night/90 via-night/30 via-[42%] to-transparent to-[72%] md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent md:via-[18%]" />

        {/* Doorbell-cam chrome */}
        <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 backdrop-blur-md sm:left-6 sm:top-6">
          <Video className="size-3.5 text-signal" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wide text-ink">
            Front Door · Live
          </span>
          <span className="font-mono text-[10px] tabular-nums text-white/80">{clock}</span>
        </div>
        {/* subtle scanlines to sell the camera feed */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ background: "repeating-linear-gradient(180deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)" }}
        />

        {/* Desktop: call panel hugs the right edge of the image */}
        <div className="absolute inset-y-0 right-0 hidden items-center pr-5 md:flex lg:pr-8">
          <div className="w-full max-w-sm">{panel}</div>
        </div>
      </div>

      {/* Mobile: panel rides up over the photo's bottom fade */}
      <div className="relative z-10 -mt-14 px-4 md:hidden">{panel}</div>
    </div>
  );
}
