"use client";

import { useState } from "react";
import {
  ArrowRight,
  Cctv,
  ChevronDown,
  Home,
  Layers,
  LifeBuoy,
  Lightbulb,
  MonitorSmartphone,
  Speaker,
  Volume2,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { ISSUES } from "@/lib/content";
import { prefillLeadForm } from "@/lib/lead-bus";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  MonitorSmartphone,
  Volume2,
  WifiOff,
  Cctv,
  Speaker,
  Lightbulb,
  Layers,
  Home,
};

/**
 * SMART HOME RESCUE DESK — the phone-call deflector.
 * Each card: symptom → one self-help quick check → guided form CTA
 * (pre-filled with the issue). Escalation happens through the form,
 * not through a phone call to the owner.
 */
export default function RescueDesk() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section
      id="rescue-desk"
      aria-labelledby="rescue-desk-heading"
      className="border-y border-line/60 bg-abyss/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <LifeBuoy className="size-4" aria-hidden />
            Smart Home Rescue Desk
          </p>
          <h2 id="rescue-desk-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Prefer to browse? Every symptom, with a quick fix to try.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-dim">
            Each card includes the same first check our technicians run — many
            fixes take two minutes and zero phone calls. Still stuck? Every
            card routes into the guided request form.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ISSUES.map((issue, i) => {
            const Icon = ICONS[issue.icon] ?? LifeBuoy;
            const isOpen = openSlug === issue.slug;
            return (
              <Reveal key={issue.slug} delay={(i % 4) * 60}>
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-panel p-5 transition-colors ${
                    isOpen ? "border-signal/50 bg-panel-2" : "border-line hover:border-signal/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-signal/10 text-signal">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="pt-1 font-display text-base font-semibold leading-snug">
                      {issue.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {issue.symptom}
                  </p>

                  {/* Progressive disclosure: quick self-check first */}
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : issue.slug)}
                    aria-expanded={isOpen}
                    aria-controls={`quickfix-${issue.slug}`}
                    className="mt-4 flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-line/70 px-3 py-2 text-left text-sm font-medium text-signal transition-colors hover:bg-signal/5"
                  >
                    Try this first
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <p
                      id={`quickfix-${issue.slug}`}
                      className="mt-3 rounded-lg bg-night/60 p-3 text-sm leading-relaxed text-ink-dim"
                    >
                      {issue.quickCheck}
                    </p>
                  )}

                  <a
                    href="#service-request"
                    onClick={() => prefillLeadForm({ issue: issue.slug })}
                    className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-glow"
                  >
                    Still broken? Get help
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-ink-dim">
            Don&rsquo;t see your issue?{" "}
            <a
              href="#service-request"
              className="font-semibold text-signal underline-offset-4 hover:underline"
            >
              Describe it in the service request form
            </a>{" "}
            and we&rsquo;ll route it for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
