import type { ReactNode } from "react";
import { Award, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import CountUp from "@/components/fx/CountUp";

/**
 * TRUST BAR — quick credibility strip under the hero.
 * Claims sourced from electronicdreams.biz (27 yrs, Control4 Gold
 * Dealer + Pinnacle, BBB A+, TX security license).
 * The years figure counts up on scroll (GSAP; static without JS).
 */
const TRUST_ITEMS: { icon: typeof Award; title: ReactNode; sub: string }[] = [
  {
    icon: Award,
    title: (
      <>
        <CountUp to={SITE.yearsInBusiness} suffix="+" /> Years in Houston
      </>
    ),
    sub: "Family-owned & operated",
  },
  {
    icon: BadgeCheck,
    title: "Control4 Gold Dealer",
    sub: "Pinnacle-certified installers",
  },
  {
    icon: Star,
    title: "BBB A+ Rated",
    sub: "Better Business Bureau, Houston",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    sub: SITE.license,
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Why homeowners trust us" className="border-y border-line/60 bg-abyss/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
        {TRUST_ITEMS.map(({ icon: Icon, title, sub }) => (
          <div key={sub} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-panel text-glow">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold leading-snug">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-dim">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
