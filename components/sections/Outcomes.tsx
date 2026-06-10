import { Flame, Gauge, HeartPulse, Sun } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/*
 * Every "unlock" here is real product behaviour, taken from the app:
 * the consistency score and burnout analysis literally unlock after
 * ~7 active study days, and the focus personality emerges from logged
 * session times.
 */
const UNLOCKS = [
  {
    icon: Gauge,
    title: "Your consistency score",
    body: "Frequency, streaks, regularity and recency — scored once you've logged sessions across seven different days.",
    chip: "Unlocks as you log",
  },
  {
    icon: HeartPulse,
    title: "Burnout radar",
    body: "After a week of sessions, ClaroFlux starts watching your patterns for the warning signs you'd otherwise miss.",
    chip: "Unlocks after 7 active days",
  },
  {
    icon: Sun,
    title: "Your focus personality",
    body: "Midday Powerhouse? Night owl? ClaroFlux finds your peak window — so you can put your hardest material there.",
    chip: "Emerges from your sessions",
  },
  {
    icon: Flame,
    title: "Streaks that stick",
    body: "Daily goals, weekly rings and streaks turn showing up into the easiest part of studying.",
    chip: "From day one",
  },
];

export function Outcomes() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="outcomes-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What you unlock"
          title={<span id="outcomes-title">Give it a week. Watch what appears.</span>}
          lead="ClaroFlux gets more interesting the longer you use it. These aren't promises — they're features that switch on as your data grows."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {UNLOCKS.map((unlock, i) => (
            <Reveal key={unlock.title} delay={i * 0.1}>
              <article className="card-shadow group flex h-full items-start gap-5 rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-brand-400/40">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/12 text-accent transition-transform duration-300 group-hover:scale-110">
                  <unlock.icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {unlock.title}
                    </h3>
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                      {unlock.chip}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">
                    {unlock.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
