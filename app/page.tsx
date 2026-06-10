import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Intro } from "@/components/sections/Intro";
import { Features } from "@/components/sections/Features";
import { Intelligence } from "@/components/sections/Intelligence";
import { Coach } from "@/components/sections/Coach";
import { Focus } from "@/components/sections/Focus";
import { Companion } from "@/components/sections/Companion";
import { Workflow } from "@/components/sections/Workflow";
import { Outcomes } from "@/components/sections/Outcomes";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { FAQS } from "@/lib/faqs";
import {
  APP_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: APP_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      featureList: [
        "Study session tracking with Live Log",
        "Study analytics: daily hours, subject distribution, weekly trends",
        "ClaroFlux Intelligence: consistency score, burnout risk, focus personality",
        "AI Study Coach with time-boxed session plans",
        "Immersive Focus Mode with wallpaper, music and goal tracking",
        "Task manager with priorities and due dates",
        "Study Companion AI chat",
      ],
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Static, build-time JSON-LD; "<" escaped per Next.js guidance to
          rule out script-breakout even if content changes later. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Intro />
        <Features />
        <Intelligence />
        <Coach />
        <Focus />
        <Companion />
        <Workflow />
        <Outcomes />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
