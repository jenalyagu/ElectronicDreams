"use client";

import { Check } from "lucide-react";
import { PLANS } from "@/lib/content";
import { prefillLeadForm } from "@/lib/lead-bus";
import Reveal from "@/components/Reveal";

/** PAID SUPPORT TIERS — pricing lives in lib/content.ts (PLANS). */
export default function SupportPlans() {
  return (
    <section
      id="support-plans"
      aria-labelledby="support-plans-heading"
      className="border-y border-line/60 bg-abyss/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Support plans</p>
          {/* h1: this component only renders on /support-plans, where it is
              the page's top heading */}
          <h1 id="support-plans-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your level of calm
          </h1>
          <p className="mt-4 text-ink-dim">
            From one-time rescues to always-on care. Every plan works on
            systems we didn&rsquo;t install.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  plan.featured
                    ? "border-glow/50 bg-panel-2 shadow-[0_16px_48px_rgba(30,168,255,0.08)]"
                    : "border-line bg-panel"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-glow px-3 py-1 text-xs font-bold text-glow-ink">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-ink-dim">{plan.tagline}</p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-ink-dim">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line/60 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-dim">
                      <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#service-request"
                  onClick={() =>
                    prefillLeadForm({
                      supportType: plan.featured ? "remote" : "visit",
                      message: `Interested in the ${plan.name} plan.`,
                    })
                  }
                  className={`mt-7 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                    plan.featured
                      ? "glow-cta bg-glow text-glow-ink"
                      : "border border-line text-ink hover:border-glow/40"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-xs text-ink-dim">
            {/* TODO: confirm final pricing & terms before launch */}
            Pricing shown is a starting point — every home is different. You&rsquo;ll
            get an exact quote before any work begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
