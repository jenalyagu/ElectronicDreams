/**
 * ============================================================
 * BRANDS WE TRUST — EDIT ME
 * Brand portfolio recovered from the old site's /brands page
 * (see data/site-content-brief.md §5). Rendered as a text-based
 * brand wall on /brands until real logo assets are collected.
 * TODO: swap `mark` text for logo files once the client provides
 * dealer-approved artwork.
 * ============================================================
 */

export type Brand = {
  name: string;
  blurb: string;
  /** Flagship partnerships get a badge + top billing */
  featured?: boolean;
  badge?: string;
};

export type BrandCategory = {
  title: string;
  description: string;
  brands: Brand[];
};

export const BRAND_CATEGORIES: BrandCategory[] = [
  {
    title: "Control & Automation",
    description:
      "The brains of the home — one platform that makes every other brand on this page work together.",
    brands: [
      {
        name: "Control4",
        blurb:
          "The heart of every system we build. Whole-home control of lighting, audio, video, climate, and security — 12,000+ compatible devices.",
        featured: true,
        badge: "Gold Dealer · Pinnacle",
      },
      {
        name: "4Sight",
        blurb: "Control4's secure remote-access service — your whole home from anywhere on earth.",
      },
      {
        name: "Amazon Alexa",
        blurb: "Hands-free voice control for scenes, rooms, and the whole house.",
      },
      { name: "Apple", blurb: "iPhone, iPad, and Apple Watch control, native to the system." },
      { name: "Nest", blurb: "Smart thermostats folded into whole-home climate scenes." },
    ],
  },
  {
    title: "Audio",
    description:
      "Architectural and performance speakers chosen per room — heard, never seen.",
    brands: [
      { name: "Sonance", blurb: "Architectural speakers that vanish into ceilings and walls." },
      { name: "Origin Acoustics", blurb: "Premium in-ceiling, in-wall, and landscape audio." },
      { name: "Klipsch", blurb: "Legendary horn-loaded dynamics for theaters and music rooms." },
      { name: "Paradigm", blurb: "Reference-grade speakers for critical listening." },
      { name: "Triad", blurb: "Custom-built American speakers, made to order per room." },
      { name: "Episode", blurb: "Versatile architectural speakers for whole-home coverage." },
      { name: "KLH", blurb: "Classic American hi-fi heritage, modern engineering." },
      { name: "Sonos", blurb: "Streaming audio, integrated into the bigger system." },
    ],
  },
  {
    title: "Video & Theater",
    description: "Displays, projection, and the electronics behind reference-grade picture.",
    brands: [
      { name: "Sony", blurb: "Projectors and displays with best-in-class picture processing." },
      { name: "Samsung", blurb: "Premium displays for every room and outdoor space." },
      { name: "LG", blurb: "OLED picture quality for media rooms and galleries." },
      { name: "Integra", blurb: "Custom-install AV receivers built for racks, not shelves." },
      { name: "Roku", blurb: "Streaming platforms integrated into one-remote control." },
    ],
  },
  {
    title: "Networking",
    description: "Enterprise-grade infrastructure — the foundation everything else stands on.",
    brands: [
      { name: "Araknis", blurb: "Custom-install networking with remote monitoring built in." },
      { name: "Ubiquiti", blurb: "Enterprise Wi-Fi and switching for whole-property coverage." },
      { name: "Pakedge", blurb: "Control4's networking line, engineered for smart homes." },
    ],
  },
  {
    title: "Security & Comfort",
    description: "Licensed security, smart access, and motorized comfort.",
    brands: [
      { name: "Alarm.com", blurb: "Professional 24/7 monitoring and smart security services." },
      { name: "Kwikset", blurb: "Smart locks with per-person codes and remote access." },
      { name: "QMotion", blurb: "Whisper-quiet motorized shades, wired or battery." },
    ],
  },
  {
    title: "Streaming Services",
    description: "Your music, native on the system — no phone-casting required.",
    brands: [
      { name: "Spotify", blurb: "Playlists and connect support in every zone." },
      { name: "Tidal", blurb: "Lossless, high-resolution streaming for critical listening." },
      { name: "Pandora", blurb: "Effortless stations for background listening." },
      { name: "Amazon Music", blurb: "The full catalog, on tap by voice." },
    ],
  },
];

/** Flat lookup used by service pages to render brand strips. */
export const ALL_BRANDS: Brand[] = BRAND_CATEGORIES.flatMap((c) => c.brands);

export function getBrand(name: string): Brand | undefined {
  return ALL_BRANDS.find((b) => b.name === name);
}
