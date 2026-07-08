import Link from "next/link";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { CITY_PAGES } from "@/lib/cities";

/** Service-area cities with dedicated landing pages get links. */
const CITY_LINKS = new Map(CITY_PAGES.map((c) => [c.city, `/service-areas/${c.slug}`]));

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-abyss">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + NAP (name/address/phone — keep consistent with
              Google Business Profile for local SEO) */}
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} — home`}>
              <span className="grid size-8 place-items-center rounded-lg bg-glow/15 text-glow">
                <Zap className="size-4.5" aria-hidden />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Electronic<span className="text-glow"> Dreams</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
              Houston&rsquo;s smart home automation, home theater, and Control4
              support company. We fix, simplify, and upgrade smart homes — even
              if we didn&rsquo;t install the original system.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2.5 text-ink-dim hover:text-ink">
                  <Phone className="size-4 text-glow" aria-hidden />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 text-ink-dim hover:text-ink">
                  <Mail className="size-4 text-glow" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-ink-dim">
                <MapPin className="mt-0.5 size-4 shrink-0 text-glow" aria-hidden />
                <span>
                  {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{" "}
                  {SITE.address.zip}
                  <br />
                  {SITE.hours}
                </span>
              </li>
            </ul>
          </div>

          {/* Services — every pillar page, for crawlers and people */}
          <nav aria-label="Services">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_PAGES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-ink-dim transition-colors hover:text-ink"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["/rescue-desk", "Smart Home Rescue Desk"],
                ["/support-plans", "Support Plans"],
                // ["/brands", "Brands We Trust"], — hidden for now
                ["/#new-project", "New Projects"],
                ["/#faq", "FAQ"],
                ["#service-request", "Request Service"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-ink-dim transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service areas — local SEO signal */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Service Areas
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-ink-dim">
              {SITE.serviceAreas.map((area) => {
                const href = CITY_LINKS.get(area);
                return (
                  <li key={area}>
                    {href ? (
                      <Link href={href} className="transition-colors hover:text-ink">
                        {area}
                      </Link>
                    ) : (
                      area
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 text-xs text-ink-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. ·{" "}
            {SITE.license}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.socials[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              Facebook
            </a>
            <a
              href={SITE.socials[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              Twitter
            </a>
            <span>Control4 Gold Dealer · Houston, TX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
