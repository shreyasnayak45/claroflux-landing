import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { APP_URL, SIGNUP_URL } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative px-4 pb-28 pt-8 sm:px-6 sm:pb-36" aria-labelledby="cta-title">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-20 text-center sm:px-12 sm:py-28">
          {/* Layered cinematic lighting */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_-10%,rgba(0,209,193,0.28),transparent_60%),radial-gradient(ellipse_50%_50%_at_15%_100%,rgba(74,140,255,0.18),transparent_65%),radial-gradient(ellipse_50%_50%_at_90%_85%,rgba(0,136,128,0.2),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent"
          />

          <div className="relative">
            <h2
              id="cta-title"
              className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]"
            >
              Bring clarity to your next study session.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
              Plan it with the Coach. Study it in Focus Mode. Watch the
              insights arrive. Your first session takes less than a minute to
              log.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton
                href={SIGNUP_URL}
                size="lg"
                className="bg-brand-400 text-navy-900 hover:bg-brand-300"
              >
                Get Started
              </CTAButton>
              <CTAButton
                href={APP_URL}
                variant="ghost-dark"
                size="lg"
                withArrow={false}
              >
                Open App
              </CTAButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
