import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/*
 * PLACEHOLDER SOCIAL PROOF
 * ────────────────────────
 * Replace these entries with real user quotes (name + permission) before
 * any public marketing claims are made. Structure and styling are final;
 * only the content is placeholder.
 */
const QUOTES = [
  {
    quote:
      "Seeing my week as actual numbers changed how I plan. I stopped guessing which subject needed me and just looked.",
    who: "Engineering student",
  },
  {
    quote:
      "The Coach plans are the feature I didn't know I needed — a two-hour block with a defined 'minimum win' is so much easier to start.",
    who: "Pre-med student",
  },
  {
    quote:
      "Focus mode is my exam-season default now. Wallpaper, music, timer — one click and the room is ready before my excuses are.",
    who: "Final-year student",
  },
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Early voices"
          title={
            <span id="testimonials-title">
              Built for students who take their time seriously.
            </span>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((quote, i) => (
            <Reveal key={quote.who} delay={i * 0.12}>
              <figure className="card-shadow flex h-full flex-col rounded-3xl border border-line bg-card p-7">
                <Quote className="size-6 text-brand-400/60" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-line-soft pt-4 text-sm font-medium text-muted">
                  {quote.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
