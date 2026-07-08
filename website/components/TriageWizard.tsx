"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Cctv,
  Home,
  KeyRound,
  Layers,
  LifeBuoy,
  Lightbulb,
  MonitorSmartphone,
  RotateCcw,
  Sparkles,
  Speaker,
  Stethoscope,
  Truck,
  Volume2,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { ISSUES, TRIAGE, type TriageVerdict, type TriageVerdictKind } from "@/lib/content";
import { prefillLeadForm } from "@/lib/lead-bus";
import Reveal from "@/components/Reveal";

const ISSUE_ICONS: Record<string, LucideIcon> = {
  MonitorSmartphone,
  Volume2,
  WifiOff,
  Cctv,
  Speaker,
  Lightbulb,
  Layers,
  Home,
};

/** Verdict framing: what it means + how urgent it looks. */
const VERDICT_META: Record<
  TriageVerdictKind,
  { badge: string; icon: LucideIcon; tone: string; toneBg: string }
> = {
  remote: {
    badge: "Likely a remote fix — no truck roll",
    icon: Wifi,
    tone: "text-ok",
    toneBg: "bg-ok/10",
  },
  visit: {
    badge: "Best solved with a service visit",
    icon: Truck,
    tone: "text-signal",
    toneBg: "bg-signal/10",
  },
  project: {
    badge: "This is an upgrade project",
    icon: Sparkles,
    tone: "text-glow",
    toneBg: "bg-glow/10",
  },
  walkthrough: {
    badge: "Start with a walkthrough",
    icon: KeyRound,
    tone: "text-glow",
    toneBg: "bg-glow/10",
  },
};

const stepMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25 },
};

/**
 * TRIAGE WIZARD — a 3-step diagnosis: symptom → one clarifying
 * question → instant verdict with an expectation ("usually remote,
 * no truck roll") BEFORE asking for contact info. The verdict CTA
 * pre-fills the form with issue, support type, and a triage summary.
 * Question/verdict content lives in lib/content.ts (TRIAGE).
 */
export default function TriageWizard() {
  const [slug, setSlug] = useState<string | null>(null);
  const [picked, setPicked] = useState<{ label: string; verdict: TriageVerdict } | null>(null);

  const issue = slug ? ISSUES.find((i) => i.slug === slug) : null;
  const triage = slug ? TRIAGE[slug] : null;
  const step = picked ? 2 : slug ? 1 : 0;

  const reset = () => {
    setSlug(null);
    setPicked(null);
  };

  const sendResult = () => {
    if (!issue || !picked) return;
    prefillLeadForm({
      issue: issue.slug,
      supportType: picked.verdict.supportType,
      message:
        `Rescue Desk triage — ${issue.title}. ` +
        `Answer: "${picked.label}". ` +
        `Suggested: ${picked.verdict.headline}.`,
    });
  };

  return (
    <section
      aria-labelledby="triage-heading"
      className="spotlight relative overflow-hidden py-20 sm:py-24"
    >
      <div className="circuit-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <Stethoscope className="size-4" aria-hidden />
            60-second diagnosis
          </p>
          <h1
            id="triage-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            What&rsquo;s wrong with your system?
          </h1>
          <p className="mt-4 leading-relaxed text-ink-dim">
            Answer two quick questions and we&rsquo;ll tell you what it probably
            is, whether it needs a truck — and what happens next.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* progress dots */}
            <div
              className="flex items-center gap-1.5 border-b border-line/60 px-6 py-4"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i <= step ? "w-8 bg-glow" : "w-4 bg-line"
                  }`}
                />
              ))}
              <span className="ml-3 text-xs font-medium text-ink-dim">
                {step === 0 ? "Pick your symptom" : step === 1 ? "One quick question" : "Your result"}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {/* ---------- STEP 1: symptom ---------- */}
                {step === 0 && (
                  <motion.div key="symptoms" {...stepMotion}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {ISSUES.map(({ slug: s, title, icon }) => {
                        const Icon = ISSUE_ICONS[icon] ?? LifeBuoy;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSlug(s)}
                            className="group flex min-h-14 items-center gap-3 rounded-xl border border-line bg-night px-4 py-3.5 text-left text-sm font-medium transition-colors hover:border-signal/50 hover:bg-panel-2"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-signal/10 text-signal">
                              <Icon className="size-4.5" aria-hidden />
                            </span>
                            {title}
                            <ArrowRight
                              className="ml-auto size-4 shrink-0 text-ink-dim opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden
                            />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ---------- STEP 2: clarifying question ---------- */}
                {step === 1 && issue && triage && (
                  <motion.div key="question" {...stepMotion}>
                    <p className="text-sm font-medium text-ink-dim">{issue.title}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                      {triage.question}
                    </h3>
                    <div className="mt-6 grid gap-3">
                      {triage.options.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setPicked(opt)}
                          className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-night px-5 py-4 text-left text-base font-medium transition-colors hover:border-glow/50 hover:bg-panel-2"
                        >
                          {opt.label}
                          <ArrowRight
                            className="size-4 shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSlug(null)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-dim transition-colors hover:text-ink"
                    >
                      <ArrowLeft className="size-4" aria-hidden />
                      Different symptom
                    </button>
                  </motion.div>
                )}

                {/* ---------- STEP 3: verdict ---------- */}
                {step === 2 && issue && picked && (
                  <motion.div key="verdict" {...stepMotion} role="status">
                    {(() => {
                      const meta = VERDICT_META[picked.verdict.kind];
                      const Badge = meta.icon;
                      return (
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${meta.tone} ${meta.toneBg}`}
                        >
                          <Badge className="size-4" aria-hidden />
                          {meta.badge}
                        </span>
                      );
                    })()}
                    <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                      {picked.verdict.headline}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-ink-dim">
                      {picked.verdict.body}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#service-request"
                        onClick={sendResult}
                        className="glow-cta inline-flex items-center justify-center gap-2 rounded-xl bg-glow px-7 py-4 text-base font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Get this fixed — start my request
                        <ArrowRight className="size-5" aria-hidden />
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold text-ink-dim transition-colors hover:text-ink"
                      >
                        <RotateCcw className="size-4" aria-hidden />
                        Start over
                      </button>
                    </div>
                    <p className="mt-4 text-xs text-ink-dim">
                      Your answers ride along with the request, so we arrive
                      already knowing the symptom.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
