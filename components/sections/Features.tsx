import { Check } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { Reveal } from "@/components/ui/Reveal";
import { SHOTS, type ShotKey } from "@/lib/shots";
import { cn } from "@/lib/cn";

interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  shot: ShotKey;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    eyebrow: "Study Tracker",
    title: "Every session, captured in seconds.",
    body: "Log what you studied — subject, topics, duration — or hit Live Log and let ClaroFlux time the session while you work. Your week builds itself: 8 sessions, 2 subjects, 2h 35m. No spreadsheet required.",
    bullets: [
      "Live Log tracks sessions in real time",
      "Topics attached to every session",
      "Weekly totals roll up automatically",
    ],
    shot: "tracker",
    alt: "The ClaroFlux Study Tracker showing logged Physics and Mathematics sessions with durations, dates and topics covered.",
  },
  {
    eyebrow: "Dashboard",
    title: "Your momentum, the moment you sign in.",
    body: "A daily goal that fills as you study. A weekly ring that keeps you honest. Recent sessions, upcoming tasks, your streak — and fresh insights written by ClaroFlux Intelligence from your actual data.",
    bullets: [
      "Daily and weekly goals with live progress",
      "Study streaks that build the habit",
      "AI insights refreshed from real sessions",
    ],
    shot: "dashboardDetail",
    alt: "The ClaroFlux dashboard with recent study sessions, upcoming tasks and a weekly study activity chart.",
  },
  {
    eyebrow: "Tasks",
    title: "Deadlines, without the drama.",
    body: "Keep assignments next to the hours you put into them. Priorities, due dates, overdue filters — and task completion flows straight into your analytics, so finishing things counts for something.",
    bullets: [
      "Priorities and due dates at a glance",
      "Active, completed and overdue filters",
      "Completion rate feeds your analytics",
    ],
    shot: "tasks",
    alt: "The ClaroFlux Task Manager with a physics assignment due tomorrow, priority badges and completion filters.",
  },
];

export function Features() {
  return (
    <section className="relative py-12 sm:py-16" aria-label="Core product features">
      <div className="mx-auto max-w-6xl space-y-28 px-4 sm:space-y-36 sm:px-6">
        {FEATURES.map((feature, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={feature.eyebrow}
              className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16"
            >
              <Reveal
                className={cn("max-w-xl", reversed && "lg:order-2")}
                delay={0.05}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-[2rem] sm:leading-[1.15]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-body sm:text-base">
                  {feature.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[15px] font-medium text-ink"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-accent">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                className={cn("relative", reversed && "lg:order-1")}
                delay={0.18}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute -inset-6 rounded-[2.5rem] blur-2xl",
                    reversed
                      ? "bg-[radial-gradient(ellipse_60%_60%_at_40%_50%,var(--hero-spot-b),transparent_70%)]"
                      : "bg-[radial-gradient(ellipse_60%_60%_at_60%_50%,var(--hero-spot-a),transparent_70%)]",
                  )}
                />
                <BrowserFrame className="relative">
                  <ThemedShot
                    shot={SHOTS[feature.shot]}
                    alt={feature.alt}
                    sizes="(max-width: 1024px) 100vw, 620px"
                  />
                </BrowserFrame>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
