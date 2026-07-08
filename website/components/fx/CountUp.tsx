"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/fx/gsap";

/**
 * Number that counts up when scrolled into view.
 * Server-renders the final value, so SEO / no-JS / reduced-motion
 * users always see the real number.
 */
export default function CountUp({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { value: 0 };
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
    return () => mm.revert();
  }, [to, suffix, duration]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}
