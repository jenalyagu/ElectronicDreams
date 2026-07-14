"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * LAZY SECTIONS — below-the-fold homepage sections that are heavy to
 * hydrate (framer-motion, the scroll film, the multi-step form). Each is
 * code-split (ssr: false) and mounted only when it scrolls within ~800px
 * of the viewport, so its JavaScript never touches the critical path or
 * competes with the hero for the main thread on first load.
 *
 * The wrapper <div> carries the section's anchor id and a reserved
 * min-height (set just under the real rendered height so the section can
 * only ever grow downward, off-screen — never collapse into a scroll
 * jump). The inner components have had these ids removed to avoid
 * duplicates.
 */

function LazyOnView({
  children,
  id,
  minHeight,
  rootMargin = "800px",
}: {
  children: ReactNode;
  id?: string;
  minHeight: string;
  rootMargin?: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Ancient browser with no observer — just show it (deferred so we
      // don't setState synchronously inside the effect body).
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} id={id} style={show ? undefined : { minHeight }}>
      {show && children}
    </div>
  );
}

const CinematicJourney = dynamic(() => import("./CinematicJourney"), { ssr: false });
const SceneBuilder = dynamic(() => import("./SceneBuilder"), { ssr: false });
const ServiceRequestForm = dynamic(() => import("./ServiceRequestForm"), { ssr: false });

export function CinematicJourneyLazy() {
  return (
    <LazyOnView id="top" minHeight="420vh">
      <CinematicJourney />
    </LazyOnView>
  );
}

export function SceneBuilderLazy() {
  return (
    <LazyOnView id="new-project" minHeight="1400px">
      <SceneBuilder />
    </LazyOnView>
  );
}

export function ServiceRequestFormLazy() {
  return (
    <LazyOnView id="service-request" minHeight="1000px">
      <ServiceRequestForm />
    </LazyOnView>
  );
}
