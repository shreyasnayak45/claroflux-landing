"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Compass, MessageSquareText } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SHOTS, type ShotKey } from "@/lib/shots";
import { cn } from "@/lib/cn";

interface Step {
  icon: typeof Activity;
  title: string;
  body: string;
  detail: string;
  shot: ShotKey;
  alt: string;
}

const STEPS: Step[] = [
  {
    icon: Activity,
    title: "See the whole picture",
    body: "Total study time, monthly hours, your daily rhythm across 30 days, how time splits between subjects, and a 12-week trend — every number drawn from sessions you actually logged.",
    detail: "Daily hours · Subject distribution · 12-week trend",
    shot: "analytics",
    alt: "ClaroFlux Analytics: total study time, monthly hours, study streak, a 30-day daily hours chart and a subject distribution donut.",
  },
  {
    icon: Compass,
    title: "Discover patterns you didn't know you had",
    body: "A consistency score built from frequency, streaks and regularity. Burnout risk detection that watches for warning signs. And your focus personality — when your brain actually does its best work.",
    detail: "Consistency score · Burnout risk · Focus personality",
    shot: "intelligence",
    alt: "ClaroFlux Intelligence panel with consistency score, burnout risk detection and a 'Midday Powerhouse' focus personality.",
  },
  {
    icon: MessageSquareText,
    title: "Get advice you can act on",
    body: "Peak study hours mapped across your day. This week measured against last. Personalised recommendations — short daily sessions over marathons, your hardest material at your peak window.",
    detail: "Peak hours · Week vs week · Recommendations",
    shot: "patterns",
    alt: "ClaroFlux peak study hours chart, week-over-week comparison and personalised study recommendations.",
  },
];

export function Intelligence() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="intelligence"
      // NOTE: no overflow-hidden here — it would turn the section into the
      // sticky containment scrollport and break the pinned screenshot.
      className="relative scroll-mt-24 bg-canvas-deep/60 py-24 sm:py-32"
      aria-labelledby="intelligence-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="ClaroFlux Intelligence"
          title={
            <span id="intelligence-title">
              Analytics that actually coach you.
            </span>
          }
          lead="Most analytics stop at charts. ClaroFlux keeps going — scoring your consistency, watching for burnout, finding your peak hours, and telling you what to do about all of it."
        />

        {/* ── Desktop: sticky scroll story ───────────────────────── */}
        <div className="mt-16 hidden gap-14 lg:grid lg:grid-cols-[5fr_7fr]">
          <div>
            {STEPS.map((step, i) => (
              <StepBlock
                key={step.title}
                step={step}
                index={i}
                active={active === i}
                onEnter={() => setActive(i)}
              />
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-28">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,var(--hero-spot-a),transparent_70%)] blur-2xl"
              />
              <div className="relative" style={{ aspectRatio: "1568 / 760" }}>
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.shot}
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 0.96,
                      y: active === i ? 0 : 16,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "absolute inset-0",
                      active === i ? "z-10" : "z-0 pointer-events-none",
                    )}
                    aria-hidden={active !== i}
                  >
                    <BrowserFrame>
                      <ThemedShot
                        shot={SHOTS[step.shot]}
                        alt={step.alt}
                        sizes="(max-width: 1024px) 100vw, 660px"
                      />
                    </BrowserFrame>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: stacked story ──────────────────────────────── */}
        <div className="mt-14 space-y-16 lg:hidden">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.05}>
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/12 text-accent">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">
                    {step.body}
                  </p>
                </div>
              </div>
              <BrowserFrame className="mt-6">
                <ThemedShot shot={SHOTS[step.shot]} alt={step.alt} sizes="100vw" />
              </BrowserFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepBlock({
  step,
  index,
  active,
  onEnter,
}: {
  step: Step;
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[56vh] flex-col justify-center border-l-2 py-10 pl-8 transition-colors duration-500",
        active ? "border-brand-400" : "border-line",
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-2xl transition-all duration-500",
          active
            ? "brand-glow bg-gradient-to-br from-brand-400 to-brand-600 text-white dark:from-brand-300 dark:to-brand-500 dark:text-navy-900"
            : "bg-canvas-deep text-muted",
        )}
      >
        <step.icon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {String(index + 1).padStart(2, "0")} — {step.detail}
      </p>
      <h3
        className={cn(
          "mt-2 text-2xl font-semibold tracking-tight transition-colors duration-500",
          active ? "text-ink" : "text-muted",
        )}
      >
        {step.title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">
        {step.body}
      </p>
    </div>
  );
}
