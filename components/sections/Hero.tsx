"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Flame, Radio, Sparkles, Target } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { CTAButton } from "@/components/ui/CTAButton";
import { Aurora } from "@/components/ui/Aurora";
import { SHOTS } from "@/lib/shots";
import { APP_URL, SIGNUP_URL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Make", "every", "study", "hour"] as const;

function FloatingCard({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      <div
        className="glass card-shadow rounded-2xl px-4 py-3 animate-float"
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const shotY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const shotRotate = useTransform(scrollYProgress, [0, 0.6], [reduceMotion ? 0 : 4, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pt-36 sm:pt-44"
    >
      <Aurora variant="hero" />
      <div className="bg-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Messaging ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium text-body"
          >
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            Powered by ClaroFlux Intelligence
          </motion.div>

          <h1
            className="mt-6 text-balance text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]"
            aria-label="Make every study hour count."
          >
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word}
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.07 }}
              >
                {word}
                {" "}
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 + HEADLINE.length * 0.07 }}
            >
              count.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-body sm:text-lg"
          >
            ClaroFlux tracks your sessions, learns your patterns, and plans
            your next move — turning scattered study time into visible
            momentum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.58 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTAButton href={SIGNUP_URL} size="lg">
              Get Started
            </CTAButton>
            <CTAButton href={APP_URL} variant="secondary" size="lg" withArrow={false}>
              Open App
            </CTAButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-muted"
          >
            {["Live session tracking", "AI session plans", "Burnout detection"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span
                    className="size-1 rounded-full bg-brand-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ),
            )}
          </motion.ul>
        </div>

        {/* ── Product shot ──────────────────────────────────────── */}
        <div className="relative mt-16 sm:mt-20 [perspective:1600px]">
          <motion.div
            aria-hidden="true"
            style={{ opacity: glowOpacity }}
            className="absolute -inset-x-8 top-8 bottom-0 rounded-[3rem] bg-[radial-gradient(ellipse_55%_50%_at_50%_40%,var(--hero-spot-a),transparent_70%)] blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 64, rotateX: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            style={{ y: shotY, rotateX: shotRotate, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <BrowserFrame>
              <ThemedShot
                shot={SHOTS.dashboard}
                alt="The ClaroFlux dashboard: weekly goal ring at 18%, today's goal progress, tasks done, a 2-day study streak and AI-written insights."
                sizes="(max-width: 768px) 100vw, 1100px"
                priority
              />
            </BrowserFrame>

            <FloatingCard
              delay={1.15}
              className="absolute -left-4 top-[14%] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-orange-500/10">
                  <Flame className="size-4.5 text-orange-500" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-muted">Study streak</p>
                  <p className="text-sm font-bold text-ink">2 days — keep going</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              delay={1.35}
              className="absolute -right-6 top-[42%] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex size-9 items-center justify-center rounded-xl bg-red-500/10">
                  <Radio className="size-4.5 text-red-500" aria-hidden="true" />
                  <span
                    className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500 animate-pulse-dot"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-muted">Live Log</p>
                  <p className="text-sm font-bold text-ink">Physics · 34m</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              delay={1.55}
              className="absolute -bottom-6 left-[12%] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand-500/10">
                  <Target className="size-4.5 text-accent" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-muted">Weekly goal</p>
                  <p className="text-sm font-bold text-ink">2h 35m of 14h</p>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>

      {/* Soft fade into the next chapter */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
        aria-hidden="true"
      />
    </section>
  );
}
