"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Render as a different element (defaults to div). */
  as?: "div" | "section" | "li" | "span";
}

/** Soft rise-and-unblur entrance, triggered once when scrolled into view. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      custom={delay}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
