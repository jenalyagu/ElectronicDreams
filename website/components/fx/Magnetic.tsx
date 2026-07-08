"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/**
 * Magnetic wrapper — the child drifts a few pixels toward the cursor
 * and springs back on leave. Desktop-only polish; does nothing on
 * touch devices or with reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode;
  /** how strongly the element follows the cursor (0.15–0.3 sensible) */
  strength?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const finePointer = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const spring = { stiffness: 260, damping: 20, mass: 0.5 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    finePointer.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !finePointer.current || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const max = 9; // px travel cap
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
