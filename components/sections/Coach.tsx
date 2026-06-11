import {
  ArrowLeft,
  BatteryMedium,
  CalendarClock,
  Clock3,
  Play,
  ShieldAlert,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { Aurora } from "@/components/ui/Aurora";
import { SHOTS } from "@/lib/shots";

const INPUTS = [
  { icon: Clock3, label: "Time available", value: "2 hours" },
  { icon: BatteryMedium, label: "Energy level", value: "Medium" },
  { icon: CalendarClock, label: "Due soon", value: "Test in 3 days" },
];

const GUARANTEES = [
  {
    icon: Trophy,
    title: "Minimum win",
    body: "Success is defined before you start — finish the review, solve five problems. Done beats perfect.",
  },
  {
    icon: ShieldAlert,
    title: "Avoid for now",
    body: "The Coach also tells you what not to do: skip the unrelated topics, drop the passive video lectures.",
  },
  {
    icon: Play,
    title: "Start action",
    body: "A concrete first step, then one tap starts the plan as a live tracked session on your Tracker.",
  },
];

export function Coach() {
  return (
    <section
      id="coach"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      aria-labelledby="coach-title"
    >
      <Aurora />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Study Coach"
          title={<span id="coach-title">Never start from a blank page again.</span>}
          lead="Tell the Coach how much time you have, how you're feeling, and what's due. It answers with a named, time-boxed session plan — and the reasoning behind every block."
        />

        {/* Inputs → Plan visual story */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <Reveal delay={0.05}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              You tell it
            </p>
            <div className="mt-4 space-y-3">
              {INPUTS.map((input) => (
                <div
                  key={input.label}
                  className="card-shadow flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-500/12 text-accent">
                    <input.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted">{input.label}</p>
                    <p className="text-[15px] font-semibold text-ink">{input.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              Thirty seconds of context. That's all the Coach needs to turn
              &ldquo;I should study chemistry&rdquo; into an{" "}
              <span className="font-semibold text-ink">
                Electrochemistry Boost Session
              </span>{" "}
              — 120 minutes, block by block, with breaks where your energy
              needs them.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_60%_60%_at_55%_45%,var(--hero-spot-a),transparent_70%)] blur-2xl"
            />

            {/* Parallel eyebrow: "IT PLANS" mirrors "YOU TELL IT" on the left */}
            <p className="mb-4 hidden text-sm font-semibold uppercase tracking-[0.18em] text-muted lg:block">
              It plans
            </p>

            <div className="relative">
              {/* Plan — dominant, shows all session blocks */}
              <div className="card-shadow overflow-hidden rounded-2xl border border-line bg-card">
                <ThemedShot
                  shot={SHOTS.plan}
                  alt="A Study Coach plan: 'Electrochemistry Boost Session', 120 minutes split into review, practice problems, a break and a recap."
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </div>

              {/* Form — supporting context, right edge so plan blocks read
                  cleanly on the left; arrow on the form's left edge points
                  into the plan to make input → output causality explicit */}
              <div className="absolute right-4 top-4 z-10 hidden w-[28%] sm:block">
                {/* Arrow at left edge pointing toward plan */}
                <div
                  className="absolute left-0 top-1/2 flex -translate-x-full -translate-y-1/2 items-center pr-2"
                  aria-hidden="true"
                >
                  <div className="h-px w-5 rounded-full bg-gradient-to-l from-accent/40 to-accent" />
                  <div className="mr-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 shadow-[0_0_10px_rgba(0,184,170,0.45)]">
                    <ArrowLeft className="size-2.5 text-white" />
                  </div>
                </div>
                <div className="card-shadow overflow-hidden rounded-xl border border-line bg-card shadow-xl">
                  <ThemedShot
                    shot={SHOTS.coachForm}
                    alt="The Study Coach intake form: time available, energy level, subject and what's due soon."
                    sizes="180px"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* What makes the plan trustworthy */}
        <div className="mt-24 grid gap-5 sm:mt-28 sm:grid-cols-3">
          {GUARANTEES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <article className="card-shadow h-full rounded-3xl border border-line bg-card p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-500/12 text-accent">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* The loop closes: post-session feedback */}
        <Reveal className="mt-16" delay={0.1}>
          <figure className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_70%_100%_at_50%_50%,var(--hero-spot-c),transparent_75%)] blur-xl"
            />
            <div className="card-shadow relative overflow-hidden rounded-2xl border border-line bg-card">
              <ThemedShot
                shot={SHOTS.feedback}
                alt="Session feedback from ClaroFlux: 'You studied Physics for 34 minutes — a solid, focused block that falls within the productive 30–90 minute range.'"
                sizes="(max-width: 1024px) 100vw, 1100px"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-muted">
              And when you finish — instant feedback on the session you just
              put in. The loop closes itself.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
