"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PhoneMissed } from "lucide-react";
import { SUPPORT_FLOW } from "@/lib/content";
import { gsap } from "@/components/fx/gsap";
import Reveal from "@/components/Reveal";

/**
 * HOW THE SUPPORT SYSTEM WORKS — scroll-driven storytelling.
 * As the section scrolls into view, a cyan→violet progress line
 * draws itself across the three steps (Identify → Route → Resolve)
 * while the step cards rise in sequence, scrubbed to the scrollbar.
 * Reduced-motion users see the static final state.
 */
export default function SupportSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Progress line draws left → right while steps are in view
      gsap.fromTo(
        section.querySelectorAll("[data-fx='progress']"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
            end: "center 42%",
            scrub: 1,
          },
        }
      );
      // Step cards rise in sequence, tied to scroll position
      gsap.from(section.querySelectorAll("[data-fx='step']"), {
        y: 56,
        opacity: 0,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "top 30%",
          scrub: 1,
        },
      });
      // Closing banner eases in last
      const banner = section.querySelector("[data-fx='banner']");
      if (banner) {
        gsap.from(banner, {
          y: 32,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: banner,
            start: "top 92%",
            end: "top 68%",
            scrub: 1,
          },
        });
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="support-system-heading"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Support, systemized</p>
          <h2 id="support-system-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Skip the phone tag. Get fixed faster.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-dim">
            Calling means voicemail, callbacks, and describing your system from
            memory. The Rescue Desk gets your issue in front of the right
            person with the right details — the first time.
          </p>
        </Reveal>

        {/* Scroll-drawn progress line (decorative) */}
        <div aria-hidden className="relative mx-auto mt-12 mb-5 hidden h-px max-w-4xl md:block">
          <div className="absolute inset-0 bg-line/60" />
          <div
            data-fx="progress"
            className="absolute inset-0 origin-left bg-gradient-to-r from-[#4cc3ff] via-[#8b5cf6] to-glow shadow-[0_0_12px_rgba(76,195,255,0.5)]"
          />
        </div>

        <div className="mt-8 grid gap-5 md:mt-0 md:grid-cols-3">
          {SUPPORT_FLOW.map((item) => (
            <div
              key={item.step}
              data-fx="step"
              className="relative h-full overflow-hidden rounded-2xl border border-line bg-panel p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-5 font-display text-[5.5rem] font-bold leading-none text-line/40 select-none"
              >
                {item.step}
              </span>
              <h3 className="relative font-display text-lg font-semibold">{item.title}</h3>
              <p className="relative mt-3 max-w-[42ch] text-sm leading-relaxed text-ink-dim">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div data-fx="banner" className="mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-glow/25 bg-glow/5 px-6 py-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden size-11 shrink-0 place-items-center rounded-xl bg-glow/15 text-glow sm:grid">
                <PhoneMissed className="size-5" aria-hidden />
              </span>
              <p className="text-sm leading-relaxed text-ink-dim">
                <strong className="font-semibold text-ink">
                  The result: fewer calls, faster fixes.
                </strong>{" "}
                Most requests get a same-day response with a clear next step —
                remote fix, scheduled visit, or a two-minute answer.
              </p>
            </div>
            <Link
              href="/rescue-desk"
              className="shrink-0 rounded-lg border border-glow/40 px-5 py-2.5 text-sm font-semibold text-glow transition-colors hover:bg-glow/10"
            >
              Try the Rescue Desk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
