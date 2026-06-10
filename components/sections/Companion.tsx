import { MessageCircleQuestion } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { SHOTS } from "@/lib/shots";

const QUESTIONS = [
  "How am I doing this week?",
  "Which subject did I study most?",
  "What should I get back to first?",
];

export function Companion() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="companion-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1" delay={0.18}>
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,var(--hero-spot-a),transparent_70%)] blur-2xl"
            />
            <div className="shot-shadow relative overflow-hidden rounded-3xl border border-line bg-card">
              <ThemedShot
                shot={SHOTS.companionBrief}
                alt="The Study Companion chat giving a daily brief: the big picture, what matters most right now, and a recommended next session."
                sizes="(max-width: 640px) 90vw, 448px"
              />
            </div>
            {/* Recreated answer bubble — content from a real Companion reply */}
            <div className="glass card-shadow absolute -right-2 bottom-10 hidden max-w-[240px] rounded-2xl rounded-br-md p-4 sm:block lg:-right-10 animate-float-late">
              <p className="text-[13px] leading-relaxed text-ink">
                You&rsquo;ve put all of your study time this week into{" "}
                <span className="font-semibold text-accent">Physics</span> —
                about 155 minutes. It&rsquo;s the clear leader.
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Study Companion"
              title={<span id="companion-title">Ask your studies anything.</span>}
              lead="The Companion lives one tap away on every page, and it knows your data — hours, streaks, subjects, gaps. No generic chatbot answers; just your numbers, read back with a plan."
            />

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {QUESTIONS.map((question) => (
                  <li key={question} className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-accent">
                      <MessageCircleQuestion className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-medium text-ink">
                      &ldquo;{question}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-body">
                Every brief leads somewhere: the big picture, the one thing
                that matters most right now, and what the Companion would do
                next — like a 45-minute Mathematics session, because it&rsquo;s
                been 18 days since you touched it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
