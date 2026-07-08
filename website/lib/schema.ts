import { business, primaryKeywords } from "@/data/site";
import { SITE } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";

/**
 * LocalBusiness structured data for Google local results.
 * Base shape per the site owner's spec; enriched with street
 * address, geo, hours, credentials, and social profiles from
 * lib/site.ts (richer signals for the local pack — trim if unwanted).
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.url}/#business`,
    name: business.name,
    description:
      "Houston smart home automation, Control4 support, home theater installation, security camera installation, whole-home audio, networking, and smart home troubleshooting.",
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    areaServed: [
      "Houston",
      "Katy",
      "The Woodlands",
      "Cypress",
      "Sugar Land",
      "Memorial",
      "River Oaks",
      "Bellaire",
      "Spring",
      "Magnolia",
    ],
    keywords: primaryKeywords.join(", "),
    url: business.url,

    /* ---- enrichments from lib/site.ts ---- */
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    priceRange: "$$-$$$",
    foundingDate: "1998", // ~27 years in business — TODO: confirm exact year
    slogan: SITE.slogan,
    sameAs: [...SITE.socials],
    hasCredential: [
      "Texas Certified Security Contractor License #B09380601",
      "Control4 Gold Dealer",
      "Control4 Pinnacle certification",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Smart Home Services",
      itemListElement: [
        "Smart home automation installation",
        "Control4 programming and troubleshooting",
        "Home theater installation and repair",
        "Whole-home audio installation",
        "Security camera installation",
        "Home Wi-Fi and network installation",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/**
 * Service structured data for the service pillar pages
 * (/home-theater, /smart-lighting, …). Includes an FAQPage
 * block when the page defines FAQs.
 */
export function serviceSchema(page: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${business.url}/${page.slug}#service`,
    name: page.navLabel,
    description: page.metaDescription,
    url: `${business.url}/${page.slug}`,
    provider: { "@id": `${business.url}/#business` },
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "City", name })),
    brand: page.brands.map((name) => ({ "@type": "Brand", name })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.url}${item.path}`,
    })),
  };
}
