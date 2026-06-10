"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost-dark";
  size?: "md" | "lg";
  withArrow?: boolean;
  className?: string;
}

/**
 * Magnetic call-to-action. The button leans gently toward the cursor
 * (disabled for touch + reduced-motion users) — Linear/Stripe-grade feel
 * without being a gimmick.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = variant === "primary",
  className,
}: CTAButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 320, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 320, damping: 22, mass: 0.5 });

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-[box-shadow,background-color,border-color] duration-300",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-brand-500 text-white hover:bg-brand-600 hover:brand-glow dark:bg-brand-400 dark:text-navy-900 dark:hover:bg-brand-300",
        variant === "secondary" &&
          "glass text-ink hover:border-brand-400/50",
        variant === "ghost-dark" &&
          "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-brand-300/60 hover:bg-white/15",
        className,
      )}
    >
      {children}
      {withArrow && (
        <ArrowRight
          className={cn(
            "transition-transform duration-300 group-hover:translate-x-1",
            size === "lg" ? "size-4.5" : "size-4",
          )}
          aria-hidden="true"
        />
      )}
    </motion.a>
  );
}
