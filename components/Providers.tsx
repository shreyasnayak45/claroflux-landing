"use client";

import { MotionConfig } from "framer-motion";

/** Honour the OS-level reduced-motion preference across every animation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
