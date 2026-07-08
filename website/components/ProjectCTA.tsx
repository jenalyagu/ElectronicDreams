"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Clapperboard, Lightbulb, Music4, Sparkles } from "lucide-react";
import { prefillLeadForm } from "@/lib/lead-bus";
import { gsap } from "@/components/fx/gsap";

/**
 * NEW PROJECT / INSTALL CTA — the "design" funnel destination.
 * The hero's "Design my smart home" button lands here.
 * The panel scales/fades in with a GSAP scroll scrub for a
 * cinematic entrance (static for reduced-motion users).
 */
export default function ProjectCTA() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel,
        { scale: 0.94, opacity: 0.5, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 92%",
            end: "top 52%",
            scrub: 1,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    /* id was "new-project" — that anchor now belongs to <SceneBuilder /> */
    <section id="consultation" aria-labelledby="new-project-heading" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={panelRef}>
          <div className="spotlight relative overflow-hidden rounded-3xl border border-line bg-panel px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="circuit-grid pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <Sparkles className="size-4" aria-hidden />
                New projects & installations
              </p>
              {/* Their long-running slogan, kept from the original site */}
              <h2 id="new-project-heading" className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Get the smart home of your{" "}
                <span className="text-glow">dreams.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-dim">
                Movie nights that start with one tap. Music that follows you
                room to room. Lights that know it&rsquo;s bedtime. For over 27
                years we&rsquo;ve designed and built Control4 smart homes and
                theaters across Houston — start with a free in-home
                consultation.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-dim">
                <span className="inline-flex items-center gap-2">
                  <Clapperboard className="size-4 text-signal" aria-hidden />
                  Dedicated theaters
                </span>
                <span className="inline-flex items-center gap-2">
                  <Music4 className="size-4 text-signal" aria-hidden />
                  Whole-home audio
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lightbulb className="size-4 text-signal" aria-hidden />
                  Lighting & shades
                </span>
              </div>

              <a
                href="#service-request"
                onClick={() => prefillLeadForm({ issue: "new-project", supportType: "consult" })}
                className="glow-cta mt-9 inline-flex items-center gap-2 rounded-xl bg-glow px-8 py-4 text-base font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Book my free consultation
                <ArrowRight className="size-5" aria-hidden />
              </a>
              <p className="mt-4 text-xs text-ink-dim">
                No pressure, no obligation — just a plan and a number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
