import {
  Expand,
  Image as ImageIcon,
  Music2,
  NotebookPen,
  Target,
  Timer,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { SHOTS } from "@/lib/shots";

const ELEMENTS = [
  {
    icon: ImageIcon,
    title: "Auto wallpaper",
    body: "A fresh scene every session, set before you arrive.",
  },
  {
    icon: Music2,
    title: "Focus music",
    body: "Sound that starts with the timer — no playlist hunting.",
  },
  {
    icon: NotebookPen,
    title: "Notes at hand",
    body: "Capture thoughts without breaking the session.",
  },
  {
    icon: Expand,
    title: "Fullscreen immersion",
    body: "The rest of your screen — and your tabs — disappear.",
  },
  {
    icon: Target,
    title: "Goal tracking",
    body: "Your session goal stays in view until it's done.",
  },
  {
    icon: Timer,
    title: "Standard mode",
    body: "Just need a timer? Keep it lightweight, no overlay.",
  },
];

export function Focus() {
  return (
    <section
      id="focus"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      aria-labelledby="focus-title"
    >
      {/* Cinematic band — intentionally dark in BOTH themes, like the feature itself */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-900"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_20%,rgba(0,209,193,0.16),transparent_65%),radial-gradient(ellipse_60%_55%_at_85%_80%,rgba(74,140,255,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[6fr_5fr]">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-300">
                Focus Mode
              </p>
              <h2
                id="focus-title"
                className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
              >
                A focus room, prepared for you.
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
                Pick a subject and a goal — ClaroFlux sets the scene.
                Wallpaper, music, notes, fullscreen, timer: everything ready
                the moment you press{" "}
                <span className="font-semibold text-brand-300">Enter Focus</span>.
                It drops you straight into a prepared focus room.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {ELEMENTS.map((element, i) => (
                <Reveal key={element.title} delay={0.08 + i * 0.07}>
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-brand-300 ring-1 ring-white/10">
                      <element.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white">
                        {element.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {element.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,209,193,0.22),transparent_70%)] blur-2xl"
            />
            <div className="shot-shadow relative overflow-hidden rounded-3xl border border-white/12">
              <ThemedShot
                shot={SHOTS.focusModal}
                alt="The 'Start studying' dialog: choose a subject and session goal, then pick Standard mode or the immersive Focus mode with auto wallpaper and music."
                sizes="(max-width: 640px) 90vw, 384px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
