import {
  Check,
  Clapperboard,
  House,
  LifeBuoy,
  Music4,
  Router,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/content";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";

const ICONS: Record<string, LucideIcon> = {
  House,
  Clapperboard,
  Music4,
  ShieldCheck,
  Router,
  LifeBuoy,
};

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">What we do</p>
          <h2 id="services-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            One company for the whole system
          </h2>
          <p className="mt-4 text-ink-dim">
            Design, installation, and long-term support for every connected
            layer of your home — from the rack in the closet to the remote on
            the couch.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? House;
            return (
              <Reveal key={service.title} delay={(i % 3) * 80} className="h-full">
                <TiltCard className="h-full rounded-2xl">
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-glow/30">
                  <span className="grid size-11 place-items-center rounded-xl bg-glow/10 text-glow">
                    <Icon className="size-5.5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-line/60 pt-5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink-dim">
                        <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
