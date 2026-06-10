"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BrainCircuit, LineChart, MessageSquareHeart, Play, RefreshCw } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: BrainCircuit,
    title: "Plan",
    body: "The Coach turns your time, energy and deadlines into a time-boxed plan.",
  },
  {
    icon: Play,
    title: "Focus",
    body: "One tap starts it as a live session — in a prepared focus room if you want one.",
  },
  {
    icon: MessageSquareHeart,
    title: "Feedback",
    body: "Finish, and ClaroFlux tells you what that session was worth — immediately.",
  },
  {
    icon: LineChart,
    title: "Insight",
    body: "Your analytics sharpen, and tomorrow's advice gets smarter than today's.",
  },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0, 1]);

  return (
    <section
      className="relative overflow-hidden bg-canvas-deep/60 py-24 sm:py-32"
      aria-labelledby="workflow-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The ClaroFlux loop"
          title={<span id="workflow-title">One loop. Every day. Compounding.</span>}
          lead="ClaroFlux isn't four separate tools — it's one cycle where each part feeds the next. The more you study, the better it knows you."
        />

        <div ref={ref} className="relative mt-16">
          {/* Progress line — draws itself as you scroll (vertical on mobile, horizontal on desktop) */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineScale }}
            className="absolute left-[5%] right-[5%] top-7 hidden h-0.5 origin-left rounded bg-gradient-to-r from-brand-400 via-brand-500 to-navy-400 lg:block"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute bottom-10 left-[27px] top-7 w-0.5 origin-top rounded bg-gradient-to-b from-brand-400 via-brand-500 to-navy-400 lg:hidden"
          />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.16} as="li">
                <div className="flex gap-5 lg:flex-col lg:gap-0">
                  <span className="brand-glow relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white dark:from-brand-300 dark:to-brand-500 dark:text-navy-900">
                    <step.icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="lg:mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-body">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.7} className="mt-14 flex justify-center">
            <p className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-body">
              <RefreshCw className="size-4 text-accent" aria-hidden="true" />
              Then the loop starts again — a little smarter each time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
