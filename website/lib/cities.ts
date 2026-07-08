/**
 * ============================================================
 * SERVICE-AREA CITY PAGES — EDIT ME
 * Local-SEO landing pages at /service-areas/[slug]. The three
 * cities below existed on the old site (at longer URLs that now
 * 301 here — see next.config.ts). Add a city by adding an entry;
 * the route and sitemap pick it up automatically.
 * ============================================================
 */

export type CityPage = {
  slug: string;
  city: string;
  /** "in the Woodlands", "in Katy" — used mid-sentence */
  inCity: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Two locally-flavored paragraphs — keep these unique per city
      (duplicated copy across city pages gets filtered by Google) */
  intro: [string, string];
  /** Nearby communities named on the page for long-tail local search */
  neighborhoods: string[];
};

export const CITY_PAGES: CityPage[] = [
  {
    slug: "the-woodlands",
    city: "The Woodlands",
    inCity: "in The Woodlands",
    metaTitle: "Smart Home Automation & Home Theater in The Woodlands, TX",
    metaDescription:
      "Control4 Gold Dealer serving The Woodlands — smart home automation, custom home theaters, whole-home audio, security, and Wi-Fi. Free in-home estimates.",
    h1: "Smart home automation in The Woodlands",
    intro: [
      "From Carlton Woods to Creekside Park, homes in The Woodlands are built for living well — and their technology should match. For nearly three decades this family-owned Houston company has designed Control4 smart homes, dedicated theaters, and estate-grade networks for homeowners across The Woodlands, with the licenses, insurance, and factory certifications to back the work.",
      "Whether you're building new in Woodforest, upgrading a media room in Sterling Ridge, or taking over a system a previous owner left behind, you'll work directly with certified programmers — never a subcontracted crew — and get a free written estimate before anything begins.",
    ],
    neighborhoods: [
      "Carlton Woods",
      "Sterling Ridge",
      "Creekside Park",
      "Alden Bridge",
      "Grogan's Mill",
      "Woodforest",
      "Shenandoah",
      "Spring",
    ],
  },
  {
    slug: "katy",
    city: "Katy",
    inCity: "in Katy",
    metaTitle: "Smart Home Automation & Home Theater in Katy, TX",
    metaDescription:
      "Smart home automation company serving Katy, TX — Control4 installation, home theaters, whole-home audio, security cameras, and networking. Free estimates.",
    h1: "Smart home automation in Katy",
    intro: [
      "Katy's newer neighborhoods — Cinco Ranch, Cross Creek Ranch, Elyson — are full of homes pre-wired with potential that builder-grade equipment never delivers. We turn that potential into a system your family actually uses: one-touch lighting, whole-home audio, honest security, and Wi-Fi that reaches every corner of a two-story on a Texas-sized lot.",
      "As a Control4 Gold Dealer and licensed Texas security contractor, we handle new construction, retrofits, and takeovers of systems other companies installed — with free estimates and support that continues long after the last truck leaves.",
    ],
    neighborhoods: [
      "Cinco Ranch",
      "Cross Creek Ranch",
      "Elyson",
      "Firethorne",
      "Seven Meadows",
      "Grand Lakes",
      "Fulshear",
      "Richmond",
    ],
  },
  {
    slug: "richmond",
    city: "Richmond",
    inCity: "in Richmond",
    metaTitle: "Smart Home Automation & Home Theater in Richmond, TX",
    metaDescription:
      "Smart home automation installation in Richmond, TX — Control4, custom home theaters, multi-room audio, security, and enterprise Wi-Fi. Free estimates.",
    h1: "Smart home automation in Richmond",
    intro: [
      "Richmond and the Highway 59 corridor are growing fast, and the estates of Aliana, Harvest Green, and Veranda deserve better than a doorbell camera and a pile of remotes. We design complete smart homes — lighting, audio, theater, climate, and licensed security — engineered to work as one system and simple enough for everyone in the house.",
      "Family-owned and Houston-based for nearly 30 years, we bring certified Control4 programmers and fiber-certified technicians to every Richmond project, from pre-wire on new builds to full upgrades of existing systems, always starting with a free in-home consultation.",
    ],
    neighborhoods: [
      "Aliana",
      "Harvest Green",
      "Veranda",
      "Long Meadow Farms",
      "Pecan Grove",
      "Sugar Land",
      "Rosenberg",
      "Fulshear",
    ],
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
