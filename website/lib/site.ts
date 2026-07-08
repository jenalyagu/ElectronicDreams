/**
 * ============================================================
 * BUSINESS INFO — EDIT ME
 * Everything site-wide (phone, email, hours, service area)
 * lives here. Components and SEO schema read from this file.
 * Data pulled from electronicdreams.biz on 2026-07-02.
 * ============================================================
 */
export const SITE = {
  name: "Electronic Dreams",
  legalName: "Electronic Dreams", // TODO: confirm legal entity suffix (LLC/Inc)
  tagline: "Houston Smart Home Automation, Home Theater & Control4 Support",
  slogan: "Get the smart home of your dreams",

  url: "https://electronicdreams.biz",

  phone: "(281) 890-5200",
  phoneHref: "tel:+12818905200",
  email: "sales@electronicdreams.biz",

  address: {
    street: "6101 Royalton St Ste. 108",
    city: "Houston",
    state: "TX",
    zip: "77081",
  },

  // Geo coordinates for LocalBusiness schema.
  // TODO: verify exact pin for 6101 Royalton St (approximate for 77081)
  geo: { lat: 29.7107, lng: -95.4844 },

  hours: "Mon–Fri 8am–6pm · Weekends closed",

  /** Areas shown in the footer + used in schema `areaServed`.
      TODO: confirm/trim this list — source site says "Houston area". */
  serviceAreas: [
    "Houston",
    "The Heights",
    "River Oaks",
    "Memorial",
    "Bellaire",
    "Katy",
    "Richmond",
    "Sugar Land",
    "The Woodlands",
    "Cypress",
    "Pearland",
    "Spring",
    "Magnolia",
  ],

  /** Social profiles for schema `sameAs` and the footer. */
  socials: [
    "https://www.facebook.com/electronicdreams.biz",
    "https://twitter.com/eledreams",
  ],

  /** Used in trust bar copy ("27+ Years in Houston"). */
  yearsInBusiness: 27,

  /** Texas licensing — shown in footer for trust + compliance.
      Same number covers Security Contractor, Electronic Access,
      and Burglar Alarm Company licenses. */
  license: "TX Security Contractor Lic. #B09380601",

  /** Credentials surfaced in the trust bar / footer. */
  credentials: {
    control4: "Control4 Gold Dealer · Pinnacle certified",
    bbb: "BBB A+ Rated (Houston)",
  },
} as const;
