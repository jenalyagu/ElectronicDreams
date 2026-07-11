import type { Metadata } from "next";
import { Award, Phone } from "lucide-react";
import Header from "@/components/Header";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { BRAND_CATEGORIES } from "@/lib/brands";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Brands We Trust — Control4, Klipsch, Sonance, Araknis & More",
  description:
    "Electronic Dreams is a Control4 Gold Dealer carrying premium smart home brands — Klipsch, Paradigm, Sonance, Origin Acoustics, Sony, Araknis, Alarm.com, and more.",
  alternates: { canonical: "/brands" },
  /* Page is hidden for now: unlinked sitewide and kept out of search.
     Remove this (and restore the header/footer/sitemap links) to relaunch. */
  robots: { index: false, follow: false },
};

/**
 * BRAND WALL — /brands (same URL as the old site).
 * Text-based marks for now; swap in dealer-approved logo files
 * via lib/brands.ts when the client provides artwork.
 */
export default function BrandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Brands We Trust", path: "/brands" },
            ])
          ),
        }}
      />


      <Header />

      <main id="main" className="pt-16">
        {/* ---- Hero ---- */}
        <section className="spotlight relative overflow-hidden">
          <div className="circuit-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-20 text-center sm:px-6 sm:pt-24">
            <Reveal>
              <p className="eyebrow mb-4">Brands We Trust</p>
              <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                We don&rsquo;t sell everything. We install what works.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">
                After {SITE.yearsInBusiness}+ years in Houston homes, we carry the brands that
                survive real families, Texas summers, and a decade of firmware updates — and we
                hold factory certifications to install them right.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Flagship partnership callout ---- */}
        <section aria-label="Control4 partnership" className="pb-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="glass flex flex-col items-start gap-4 rounded-2xl p-7 sm:flex-row sm:items-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-glow/15 text-glow">
                  <Award className="size-6" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Control4 Gold Dealer · Pinnacle distinction
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                    Control4 audits its dealers on certification, project quality, and customer
                    satisfaction. Gold status with the Pinnacle badge places Electronic Dreams
                    among the top Control4 partners — with factory-certified programmers on
                    every project.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Brand wall by category ---- */}
        {BRAND_CATEGORIES.map((category, ci) => (
          <section
            key={category.title}
            aria-labelledby={`brands-${ci}`}
            className="py-10 sm:py-12"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal>
                <h2 id={`brands-${ci}`} className="font-display text-2xl font-bold tracking-tight">
                  {category.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-ink-dim">{category.description}</p>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {category.brands.map((brand, i) => (
                  <Reveal key={brand.name} delay={(i % 4) * 60} className="h-full">
                    <article
                      className={`flex h-full flex-col rounded-2xl border p-5 transition-colors hover:border-glow/30 ${
                        brand.featured
                          ? "border-glow/40 bg-panel-2 sm:col-span-2"
                          : "border-line bg-panel"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-semibold tracking-wide">
                          {brand.name}
                        </h3>
                        {brand.badge && (
                          <span className="rounded-full bg-glow/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-glow">
                            {brand.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{brand.blurb}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ---- CTA ---- */}
        <section aria-label="Get a recommendation" className="border-t border-line/60 py-14 text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Not sure which brand fits your home?
              </h2>
              <p className="mt-3 text-ink-dim">
                That&rsquo;s literally our job. Tell us about the house and we&rsquo;ll spec the
                right system — with a written proposal and zero pressure.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
            </Reveal>
          </div>
        </section>

        <ServiceRequestForm />
      </main>

      <Footer />
    </>
  );
}
