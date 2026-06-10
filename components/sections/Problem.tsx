import { CircleHelp, EyeOff, Hourglass } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const PAINS = [
  {
    icon: Hourglass,
    title: "Hours vanish",
    body: "You finish a long day of studying with nothing to show for it but tiredness. No record of where the time went — or whether it mattered.",
  },
  {
    icon: EyeOff,
    title: "No feedback loop",
    body: "Without seeing your own patterns, you can't tell what's working, when you focus best, or when you're sliding toward burnout.",
  },
  {
    icon: CircleHelp,
    title: "Blank-page starts",
    body: "Every session opens with the same exhausting question: what should I even study right now? Deciding drains the energy meant for studying.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="problem-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The problem"
          title={
            <span id="problem-title">
              Effort without clarity is just guesswork.
            </span>
          }
          lead="You're already putting in the hours. What's missing isn't discipline — it's a clear picture of how you actually study."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PAINS.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.12} as="div">
              <article className="card-shadow group h-full rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-brand-400/40">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-canvas-deep text-muted transition-colors duration-300 group-hover:bg-brand-500/10 group-hover:text-accent">
                  <pain.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  {pain.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                  {pain.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
