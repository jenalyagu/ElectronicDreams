import {
  PhoneOff,
  Puzzle,
  TimerReset,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { CALL_REASONS } from "@/lib/content";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  PhoneOff,
  TimerReset,
  Puzzle,
  TrendingUp,
};

/** WHY CUSTOMERS CALL — mirrors the visitor's pain back to them. */
export default function WhyCall() {
  return (
    <section aria-labelledby="why-call-heading" className="border-y border-line/60 bg-abyss/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="eyebrow mb-3">Sound familiar?</p>
            <h2 id="why-call-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Why Houston homeowners call us
            </h2>
            <p className="mt-4 leading-relaxed text-ink-dim">
              Most of our customers didn&rsquo;t plan to call a smart home
              company. They just wanted the TV to turn on, the music to play,
              and the cameras to record. When that stops happening — that&rsquo;s
              where we come in.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {CALL_REASONS.map((reason, i) => {
              const Icon = ICONS[reason.icon] ?? PhoneOff;
              return (
                <Reveal key={reason.title} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-line bg-panel p-6">
                    <span className="grid size-10 place-items-center rounded-lg bg-signal/10 text-signal">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">{reason.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
