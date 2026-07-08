import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add remote image domains here if you later pull photos from a CMS/CDN:
  // images: { remotePatterns: [{ protocol: "https", hostname: "cdn.example.com" }] },

  /**
   * 301s from old electronicdreams.biz URLs that changed in the rebuild.
   * The eight service pages and /brands kept their old URLs, so they
   * need no redirects. TODO: /privacy-policy existed on the old site —
   * add a privacy page (or a redirect) before launch.
   */
  async redirects() {
    return [
      // Old hub pages folded into the new pillar pages
      { source: "/smart-home", destination: "/whole-home-automation", permanent: true },
      { source: "/entertainment", destination: "/home-theater", permanent: true },

      // Contact page → homepage lead form
      { source: "/contact", destination: "/#service-request", permanent: true },

      // Old HTML sitemap → XML sitemap
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },

      // Old long-form city landing pages → clean /service-areas/ URLs
      {
        source: "/smart-home-automation-installation-woodlands-tx",
        destination: "/service-areas/the-woodlands",
        permanent: true,
      },
      {
        source: "/smart-home-automation-installation-company-in-katy-tx",
        destination: "/service-areas/katy",
        permanent: true,
      },
      {
        source: "/smart-home-automation-installation-in-richmond-tx",
        destination: "/service-areas/richmond",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
