/**
 * Shared GSAP setup for scroll-driven effects.
 * Import gsap/ScrollTrigger from here so the plugin is registered
 * exactly once. Client components only.
 *
 * Convention for every effect in this project:
 *  - wrap animations in `gsap.matchMedia()` with the
 *    "(prefers-reduced-motion: no-preference)" query, so reduced-motion
 *    users get the static final state;
 *  - author with gsap.from()/fromTo() so the server-rendered markup IS
 *    the final state (no-JS and SEO safe);
 *  - return mm.revert() from useEffect for cleanup.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
