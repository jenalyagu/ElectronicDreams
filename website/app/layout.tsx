import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { SITE } from "@/lib/site";
import { primaryKeywords } from "@/data/site";
import { localBusinessSchema } from "@/lib/schema";
import "./globals.css";

/* Display font for headlines, body font for everything else. */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ============================================================
   SEO METADATA — EDIT ME
   Update SITE in lib/site.ts first; tweak descriptions here.
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Houston Smart Home Automation, Home Theater & Control4 Support | Electronic Dreams",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Electronic Dreams designs, installs, and rescues smart homes in Houston — Control4 troubleshooting, home theater installation & repair, whole-home audio, security cameras, and home Wi-Fi. We fix systems even if we didn't install them.",
  keywords: primaryKeywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Houston Smart Home Automation, Home Theater & Control4 Support",
    description:
      "We design, fix, simplify, and upgrade smart homes in Houston — even if we didn't install the original system.",
    // TODO: add an OG image at /public/og.jpg (1200×630) then uncomment:
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
