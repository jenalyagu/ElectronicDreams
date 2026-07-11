import Link from "next/link";
import {
  Activity,
  Armchair,
  ArrowRight,
  AudioLines,
  BadgeCheck,
  BellRing,
  Blinds,
  Blocks,
  Boxes,
  Cable,
  CalendarClock,
  Cctv,
  Check,
  Clapperboard,
  DoorOpen,
  EyeOff,
  Flame,
  Globe,
  House,
  Lamp,
  Leaf,
  LifeBuoy,
  Lightbulb,
  ListMusic,
  Lock,
  Megaphone,
  MessageSquare,
  Mic,
  MonitorPlay,
  Music4,
  PackageCheck,
  PenTool,
  Phone,
  PhoneCall,
  Plug,
  Power,
  Projector,
  Rows3,
  Ruler,
  ServerCog,
  ShieldCheck,
  ShieldHalf,
  Smartphone,
  Sparkles,
  Speaker,
  SquareStack,
  SunMoon,
  Theater,
  Thermometer,
  TreePalm,
  Wand2,
  Waves,
  Wifi,
  type LucideIcon,
  Router,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICE_PAGES, type ServicePage as ServicePageData } from "@/lib/service-pages";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";

const ICONS: Record<string, LucideIcon> = {
  Activity, Armchair, AudioLines, BadgeCheck, BellRing, Blinds, Blocks, Boxes,
  Cable, CalendarClock, Cctv, Clapperboard, DoorOpen, EyeOff, Flame, Globe,
  House, Lamp, Leaf, LifeBuoy, Lightbulb, ListMusic, Lock, Megaphone,
  MessageSquare, Mic, MonitorPlay, Music4, PackageCheck, PenTool, PhoneCall,
  Plug, Power, Projector, Router, Rows3, Ruler, ServerCog, ShieldCheck,
  ShieldHalf, Smartphone, Sparkles, Speaker, SquareStack, SunMoon, Theater,
  Thermometer, TreePalm, Wand2, Waves, Wifi,
};

/**
 * Shared template for the eight service pillar pages.
 * All copy comes from lib/service-pages.ts — edit content there.
 */
export default function ServicePage({ page }: { page: ServicePageData }) {
  const related = SERVICE_PAGES.filter((s) => page.related.includes(s.slug));

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="spotlight relative overflow-hidden">
        <div className="circuit-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="eyebrow mb-4">{page.eyebrow}</p>
            <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#service-request"
                className="glow-cta rounded-lg bg-glow px-6 py-3 text-sm font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a free consultation
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-glow/40"
              >
                <Phone className="size-4 text-glow" aria-hidden />
                {SITE.phone}
              </a>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-ink-dim">
              Control4 Gold Dealer · {SITE.yearsInBusiness}+ years in Houston · Licensed &amp;
              insured · Free estimates
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Feature grid ---- */}
      <section aria-labelledby="features-heading" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="features-heading" className="sr-only">
            What you get
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature, i) => {
              const Icon = ICONS[feature.icon] ?? Sparkles;
              return (
                <Reveal key={feature.title} delay={(i % 3) * 80} className="h-full">
                  <TiltCard className="h-full rounded-2xl">
                    <article className="flex h-full flex-col rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-glow/30">
                      <span className="grid size-11 place-items-center rounded-xl bg-glow/10 text-glow">
                        <Icon className="size-5.5" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">{feature.text}</p>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- What a project includes ---- */}
      <section aria-labelledby="includes-heading" className="border-y border-line/60 bg-panel/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">The full scope</p>
            <h2 id="includes-heading" className="font-display text-3xl font-bold tracking-tight">
              What a project includes
            </h2>
            <p className="mt-4 leading-relaxed text-ink-dim">
              Every project starts with a free consultation and ends with a written proposal —
              you&rsquo;ll know exactly what&rsquo;s included and what it costs before any work
              begins. And we&rsquo;re not just here for the sale: support continues long after
              installation day.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-line/60 bg-panel p-4 text-sm text-ink-dim"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Brands strip ---- */}
      <section aria-labelledby="brands-heading" className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 id="brands-heading" className="eyebrow">
              Brands we trust for this work
            </h2>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {page.brands.map((brand) => (
                <li
                  key={brand}
                  className="font-display text-lg font-semibold tracking-wide text-ink-dim"
                >
                  {brand}
                </li>
              ))}
            </ul>
            {/* /brands link hidden for now — restore when the page returns:
            <Link href="/brands" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline">
              See every brand we carry <ArrowRight className="size-4" aria-hidden />
            </Link> */}
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="service-faq-heading" className="border-t border-line/60 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="eyebrow mb-3">Good questions</p>
            <h2 id="service-faq-heading" className="font-display text-3xl font-bold tracking-tight">
              Asked before every {page.navLabel.toLowerCase()} project
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {page.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 80}>
                <details className="group rounded-2xl border border-line bg-panel p-6 open:border-glow/30">
                  <summary className="cursor-pointer list-none font-display text-base font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related services ---- */}
      <section aria-labelledby="related-heading" className="border-t border-line/60 bg-abyss/60 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="related-heading" className="eyebrow text-center">
            Pairs well with
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((service) => {
              const Icon = ICONS[service.icon] ?? House;
              return (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-glow/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-glow/10 text-glow">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-sm font-semibold group-hover:text-glow-soft">
                    {service.navLabel}
                  </span>
                  <ArrowRight
                    className="ml-auto size-4 text-ink-dim transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
