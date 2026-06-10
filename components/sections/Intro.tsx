import { BookOpen, BrainCircuit, LineChart, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

const PILLARS = [
  {
    icon: BookOpen,
    label: "Track",
    body: "Capture every session — live or in seconds.",
  },
  {
    icon: LineChart,
    label: "Understand",
    body: "Analytics reveal your real study patterns.",
  },
  {
    icon: BrainCircuit,
    label: "Plan",
    body: "The Study Coach decides what's next, with you.",
  },
  {
    icon: Sparkles,
    label: "Focus",
    body: "A prepared focus room — wallpaper, music, timer.",
  },
];

export function Intro() {
  return (
    <section
      id="product"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      aria-labelledby="intro-title"
    >
      <Aurora />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Meet ClaroFlux"
          title={
            <span id="intro-title">
              One calm place where effort becomes momentum.
            </span>
          }
          lead="ClaroFlux closes the loop: every session you log sharpens your analytics, your analytics shape your next plan, and every plan starts your next session. Four ideas, one flow."
        />

        <div className="relative mt-16">
          {/* Connecting flow line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-7 hidden h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-400/50 to-transparent lg:block"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.label} delay={i * 0.14} as="li">
                <div className="relative flex h-full flex-col items-center rounded-3xl px-6 py-8 text-center">
                  <span className="brand-glow relative z-10 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white dark:from-brand-300 dark:to-brand-500 dark:text-navy-900">
                    <pillar.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
