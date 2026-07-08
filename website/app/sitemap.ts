import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { CITY_PAGES } from "@/lib/cities";

/** XML sitemap at /sitemap.xml — new pages register themselves
    via lib/service-pages.ts and lib/cities.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /* /brands is hidden for now — re-add here when it returns */
  const staticPages = ["", "/rescue-desk", "/support-plans"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = SERVICE_PAGES.map(({ slug }) => ({
    url: `${SITE.url}/${slug}`,
    lastModified,
    priority: 0.9,
  }));

  const cityPages = CITY_PAGES.map(({ slug }) => ({
    url: `${SITE.url}/service-areas/${slug}`,
    lastModified,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
