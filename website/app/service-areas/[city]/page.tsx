import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import Header from "@/components/Header";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { CITY_PAGES, getCityPage } from "@/lib/cities";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

/**
 * LOCAL-SEO CITY PAGES — /service-areas/the-woodlands, /katy, /richmond.
 * The old site's long city URLs 301 here (see next.config.ts).
 * Copy lives in lib/cities.ts; add a city there and it ships.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_PAGES.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const page = getCityPage((await params).city);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/service-areas/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const page = getCityPage((await params).city);
  if (!page) notFound();

  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `Smart Home Automation ${page.inCity}`, path: `/service-areas/${page.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <Header />

      <main id="main" className="pt-16">
        {/* ---- Hero ---- */}
        <section className="spotlight relative overflow-hidden">
          <div className="circuit-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-4 inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                Serving {page.city}, TX
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {page.h1}
              </h1>
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mx-auto mt-5 max-w-2xl leading-relaxed text-ink-dim">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#service-request"
                  className="glow-cta rounded-lg bg-glow px-6 py-3 text-sm font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get a free {page.city} estimate
                </a>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-glow/40"
                >
                  <Phone className="size-4 text-glow" aria-hidden />
                  {SITE.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Trust strip ---- */}
        <section aria-label="Credentials" className="border-y border-line/60 bg-panel/40 py-6">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm font-medium text-ink-dim sm:px-6">
            <li className="inline-flex items-center gap-2">
              <Star className="size-4 text-glow" aria-hidden />
              Control4 Gold Dealer · Pinnacle
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-glow" aria-hidden />
              {SITE.license}
            </li>
            <li className="inline-flex items-center gap-2">
              <BadgeCheck className="size-4 text-glow" aria-hidden />
              BBB A+ · {SITE.yearsInBusiness}+ years · Family-owned
            </li>
          </ul>
        </section>

        {/* ---- Services offered here ---- */}
        <section aria-labelledby="city-services" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow mb-3">What we do {page.inCity}</p>
              <h2 id="city-services" className="font-display text-3xl font-bold tracking-tight">
                Every connected layer of the home
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_PAGES.map((service, i) => (
                <Reveal key={service.slug} delay={(i % 4) * 60} className="h-full">
                  <Link
                    href={`/${service.slug}`}
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-glow/40"
                  >
                    <span className="font-display text-sm font-semibold group-hover:text-glow-soft">
                      {service.navLabel}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Neighborhoods ---- */}
        <section aria-labelledby="city-neighborhoods" className="border-t border-line/60 py-14">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h2 id="city-neighborhoods" className="eyebrow">
              Communities we serve around {page.city}
            </h2>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {page.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-line bg-panel px-4 py-1.5 text-sm text-ink-dim"
                >
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-dim">
              Don&rsquo;t see your neighborhood? We serve the greater Houston area —{" "}
              <a href={SITE.phoneHref} className="text-signal hover:underline">
                call {SITE.phone}
              </a>{" "}
              and ask.
            </p>
          </div>
        </section>

        <ServiceRequestForm />
      </main>

      <Footer />
    </>
  );
}
