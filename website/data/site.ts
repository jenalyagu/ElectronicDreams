/**
 * Data-layer view of the business config, in the shape used by
 * lib/schema.ts and SEO metadata.
 *
 * NOTE: single source of truth is still lib/site.ts (SITE) — this
 * module derives from it, so edit business facts there.
 */
import { SITE } from "@/lib/site";

export const business = {
  name: SITE.name,
  phone: SITE.phone,
  email: SITE.email,
  street: SITE.address.street,
  city: SITE.address.city,
  state: SITE.address.state,
  zip: SITE.address.zip,
  url: SITE.url,
} as const;

/** Primary SEO keywords — used in metadata and LocalBusiness schema. */
export const primaryKeywords = [
  "smart home automation Houston",
  "Control4 installer Houston",
  "Control4 troubleshooting Houston",
  "home theater installation Houston",
  "home theater repair Houston",
  "home Wi-Fi installation Houston",
  "smart home troubleshooting Houston",
  "security camera installation Houston",
  "low voltage contractor Houston",
];
