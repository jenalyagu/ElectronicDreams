"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

/**
 * Cursor-reactive card: subtle 3D tilt (spring physics) + a radial
 * spotlight that follows the pointer (see .spot-card in globals.css).
 * Desktop-only enhancement — inert on touch devices and for
 * reduced-motion users; keyboard/touch behavior is untouched.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees — keep ≤ 7 for a premium (not gimmicky) feel */
  maxTilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const finePointer = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  useEffect(() => {
    finePointer.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !finePointer.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    // Spotlight position (works even with tilt disabled)
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (reduceMotion) return;
    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set(-(py - 0.5) * 2 * maxTilt);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`spot-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
