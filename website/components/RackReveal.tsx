"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronsLeftRight } from "lucide-react";

/**
 * RACK REVEAL — before/after wipe for the Networking & Wi-Fi page.
 * The same structured-wiring closet photographed twice from the same
 * spot: the tangled builder-grade "before" and the Electronic Dreams
 * rack "after". Drag the handle to wipe between them. A gentle sweep
 * plays once on first view; any interaction (or reduced-motion) hands
 * control to the visitor.
 */

const BEFORE = "/rooms/rack-before.webp";
const AFTER = "/rooms/rack-after.webp";

export default function RackReveal() {
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState(50); // % of width where the divider sits
  const wrapRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const dragging = useRef(false);
  const rafRef = useRef<number | null>(null);

  const posFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  /* pointer drag anywhere on the image */
  const onPointerDown = (e: React.PointerEvent) => {
    touched.current = true;
    dragging.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    posFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) posFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  /* auto-sweep once on first view: show the before, then the after,
     then settle in the middle */
  useEffect(() => {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || touched.current) return;
        io.disconnect();
        const KEYS: [number, number][] = [
          // [time ms, position %]
          [0, 50], [900, 88], [2300, 12], [3700, 50],
        ];
        const DUR = 3700;
        let start: number | null = null;
        const step = (ts: number) => {
          if (touched.current) return;
          if (start === null) start = ts;
          const t = Math.min(ts - start, DUR);
          // find segment
          let i = 0;
          while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++;
          const [t0, p0] = KEYS[i];
          const [t1, p1] = KEYS[i + 1];
          const f = Math.min(Math.max((t - t0) / (t1 - t0), 0), 1);
          const ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
          setPos(p0 + (p1 - p0) * ease);
          if (t < DUR) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative h-[52vh] min-h-[380px] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-abyss md:h-[82vh] md:min-h-[620px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* BEFORE — full bleed underneath */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BEFORE}
          alt="The builder-grade network closet before: a consumer router and a tangle of unlabeled cable"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* AFTER — clipped to the right of the divider */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AFTER}
          alt="The same closet after: a labeled Electronic Dreams rack with patch panel, PoE switch, and battery backup"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          draggable={false}
        />

        {/* corner labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm sm:left-6 sm:top-6">
          Before · what we inherited
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-md border border-glow/40 bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-glow-soft backdrop-blur-sm sm:right-6 sm:top-6">
          After · the ED rack
        </span>

        {/* divider + handle (keyboard accessible) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          role="slider"
          aria-label="Reveal slider — drag or use arrow keys to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              touched.current = true;
              if (rafRef.current) cancelAnimationFrame(rafRef.current);
              setPos((p) => Math.max(2, Math.min(98, p + (e.key === "ArrowLeft" ? -4 : 4))));
            }
          }}
          className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-night bg-glow text-glow-ink shadow-[0_0_0_1px_rgba(251,191,36,0.5),0_0_20px_rgba(251,191,36,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
          style={{ left: `${pos}%` }}
        >
          <ChevronsLeftRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
