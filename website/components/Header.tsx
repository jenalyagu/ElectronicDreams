"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";

/* Page links carry a `path`; homepage sections carry a hash + scrollspy id.
   Hashes are root-relative so they work from /rescue-desk etc. too.
   The Services dropdown is rendered separately.
   (/brands is hidden for now — page still exists, just unlinked.) */
const NAV_LINKS: { href: string; label: string; id?: string; path?: string }[] = [
  { href: "/rescue-desk", path: "/rescue-desk", label: "Rescue Desk" },
  { href: "/support-plans", path: "/support-plans", label: "Support Plans" },
  { href: "/#faq", id: "faq", label: "FAQ" },
];

/* Editorial nav typography — the upscale signature */
const NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1 pb-0.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300";

/** The single gradient underline that glides between nav items:
    rendered under whichever item matches the current indicator key,
    and motion's layoutId animates it between positions. */
function NavUnderline({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      layoutId="nav-underline"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      aria-hidden
      className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-signal to-glow"
    />
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* Scroll progress bar + elevated header state (rAF-throttled) */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`;
        }
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Scrollspy — highlight the section currently in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Trigger when a section occupies the upper-middle of the viewport
      { rootMargin: "-25% 0px -65% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      if (!id) return;
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const servicesActive =
    !!pathname && SERVICE_PAGES.some((s) => pathname === `/${s.slug}`);
  const activeKey = servicesActive
    ? "services"
    : (NAV_LINKS.find((l) => (l.path ? pathname === l.path : activeId === l.id))
        ?.href ?? null);
  /* One gradient underline glides between the hovered item and glides
     home to the active one on mouse leave (motion layoutId). */
  const indicatorKey = hovered ?? activeKey;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-line/70 bg-night/80 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-500 sm:px-6 ${
          scrolled ? "h-16" : "h-[4.5rem]"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label={`${SITE.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ed-logo.png"
            alt="Electronic Dreams"
            width={441}
            height={128}
            className="h-14 w-auto [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.9))_drop-shadow(0_3px_10px_rgba(0,0,0,0.55))]"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Services dropdown — opens on hover and keyboard focus */}
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-current={servicesActive ? "true" : undefined}
              onMouseEnter={() => setHovered("services")}
              onFocus={() => setHovered("services")}
              className={`${NAV_ITEM_CLASS} ${
                servicesActive
                  ? "text-ink"
                  : "text-ink-dim group-hover:text-ink group-focus-within:text-ink"
              }`}
            >
              Services
              <ChevronDown
                className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
              />
              <NavUnderline show={indicatorKey === "services"} />
            </button>

            {/* Two-column services panel */}
            <div className="invisible absolute left-1/2 top-full z-50 w-[30rem] -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="glass overflow-hidden rounded-2xl p-3 shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
                <p className="px-3 pb-2 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim/80">
                  What we design, install & support
                </p>
                <ul className="grid grid-cols-2 gap-0.5 border-t border-line/50 pt-2">
                  {SERVICE_PAGES.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}`}
                        className={`group/item relative block rounded-lg py-2.5 pl-5 pr-3 text-sm font-medium transition-colors hover:bg-white/[0.05] hover:text-ink ${
                          pathname === `/${service.slug}` ? "text-glow" : "text-ink-dim"
                        }`}
                      >
                        {/* Gold hairline accent slides in on hover */}
                        <span
                          aria-hidden
                          className="absolute left-2 top-1/2 h-4 w-px -translate-y-1/2 scale-y-0 bg-gradient-to-b from-glow to-signal transition-transform duration-300 group-hover/item:scale-y-100"
                        />
                        {service.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => {
            const active = link.path ? pathname === link.path : activeId === link.id;
            const Tag = link.path ? Link : "a";
            return (
              <Tag
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                className={`${NAV_ITEM_CLASS} ${
                  active ? "text-ink" : "text-ink-dim hover:text-ink"
                }`}
              >
                {link.label}
                <NavUnderline show={indicatorKey === link.href} />
              </Tag>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium tabular-nums text-ink-dim transition-colors hover:text-glow sm:flex"
          >
            <Phone className="size-3.5" aria-hidden />
            {SITE.phone}
          </a>
          <span aria-hidden className="hidden h-4 w-px bg-line/80 md:block" />
          <a
            href="#service-request"
            className="glow-cta hidden rounded-full bg-glow px-5 py-2.5 text-sm font-semibold text-glow-ink transition-transform hover:scale-[1.03] active:scale-[0.97] md:inline-block"
          >
            Book a Service Visit
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid size-11 place-items-center rounded-lg text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Scroll progress — thin gradient bar along the header's bottom edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-[2px] overflow-hidden">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#4cc3ff] via-[#8b5cf6] to-glow"
        />
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line/60 bg-night/95 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden"
        >
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
            Services
          </p>
          {SERVICE_PAGES.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-dim hover:bg-panel hover:text-ink"
            >
              {service.navLabel}
            </Link>
          ))}
          <div className="my-2 border-t border-line/60" />
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink-dim hover:bg-panel hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a
              href="#service-request"
              onClick={() => setOpen(false)}
              className="glow-cta rounded-full bg-glow px-4 py-3 text-center text-base font-semibold text-glow-ink"
            >
              Book a Service Visit
            </a>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-base font-medium text-ink"
            >
              <Phone className="size-4" aria-hidden />
              {SITE.phone}
            </a>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
