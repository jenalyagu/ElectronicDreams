"use client";

import { ArrowRight, KeyRound, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { PATHS, type PathIntent } from "@/lib/content";
import { prefillLeadForm } from "@/lib/lead-bus";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Wrench,
  KeyRound,
};

/** Pre-fill the form based on which path the visitor picked. */
const PREFILL: Record<PathIntent, Parameters<typeof prefillLeadForm>[0]> = {
  "new-project": { issue: "new-project", supportType: "consult" },
  "fix-system": { supportType: "unsure" },
  walkthrough: { issue: "inherited-system", supportType: "walkthrough" },
};

/**
 * CHOOSE YOUR PATH — the conversion splitter. Routes every visitor
 * into one of three funnels within the first scroll.
 */
export default function ChoosePath() {
  return (
    <section aria-labelledby="choose-path-heading" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Start here</p>
          <h2 id="choose-path-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What brings you in today?
          </h2>
          <p className="mt-4 text-ink-dim">
            Pick your situation and we&rsquo;ll take you straight to the right
            place — no phone tag required.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PATHS.map((path, i) => {
            const Icon = ICONS[path.icon] ?? Sparkles;
            return (
              <Reveal key={path.intent} delay={i * 80} className="h-full">
                <TiltCard className="h-full rounded-2xl">
                  <a
                    href={path.href}
                    onClick={() => prefillLeadForm(PREFILL[path.intent])}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-glow/40 hover:bg-panel-2"
                  >
                  <span className="grid size-12 place-items-center rounded-xl bg-glow/10 text-glow">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug">
                    {path.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
                    {path.description}
                  </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-glow">
                      {path.cta}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
