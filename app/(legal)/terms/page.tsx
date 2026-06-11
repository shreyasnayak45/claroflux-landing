import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  LegalHeader,
  TableOfContents,
  LegalSection,
  P,
  Strong,
  UL,
  LI,
  Callout,
} from "@/components/legal/prose";

const LAST_UPDATED = "June 4, 2026";
const CONTACT_EMAIL = "studyflowapp.official@gmail.com";

export const metadata: Metadata = {
  title: "Terms of Service — ClaroFlux",
  description:
    "The terms governing your use of ClaroFlux, including acceptable use, your content, AI features, intellectual property, and account termination.",
};

interface Section {
  id: string;
  title: string;
  body: ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <>
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use
          of ClaroFlux (&ldquo;ClaroFlux&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
          By creating an account or using the service, you agree to these Terms and
          to our{" "}
          <a href="/privacy" className="text-accent transition-colors hover:text-accent-strong">
            Privacy Policy
          </a>
          . If you do not agree, please do not use ClaroFlux.
        </P>
        <P>
          You must be at least 13 years old to use ClaroFlux. If you are under the
          age of majority in your region, you may use it only with the involvement
          of a parent or guardian.
        </P>
      </>
    ),
  },
  {
    id: "service",
    title: "Description of the Service",
    body: (
      <>
        <P>
          ClaroFlux is an AI-assisted study dashboard. It lets you log study
          sessions, manage tasks, view analytics, and receive automatically
          generated insights, study plans, and post-session coaching. Some
          features — such as Study Coach — may be offered in beta and can change or
          be removed.
        </P>
        <P>
          We may add, modify, or discontinue features at any time. We do not
          guarantee that the service will always be available, uninterrupted, or
          error-free.
        </P>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Your Account",
    body: (
      <>
        <UL>
          <LI>You agree to provide accurate information when registering and to keep it up to date.</LI>
          <LI>You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</LI>
          <LI>You agree to notify us promptly of any unauthorised use of your account.</LI>
          <LI>You may not share your account or use someone else&rsquo;s account without permission.</LI>
        </UL>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <P>When using ClaroFlux, you agree that you will not:</P>
        <UL>
          <LI>Use the service for any unlawful purpose or in violation of any applicable law or regulation.</LI>
          <LI>Upload or submit content — in notes, tasks, feedback, or screenshots — that is unlawful, infringing, malicious, or that violates the privacy or rights of others.</LI>
          <LI>Attempt to bypass, probe, or break the service&rsquo;s security, access controls, or row-level data isolation, or attempt to access data that is not yours.</LI>
          <LI>Reverse engineer, scrape, or use automated means to access the service or its AI features in a manner that places unreasonable load on our systems or those of our providers.</LI>
          <LI>Abuse the AI features, including attempts to extract underlying prompts or to generate harmful, illegal, or abusive content.</LI>
          <LI>Resell, sublicense, or commercially exploit the service without our written permission.</LI>
        </UL>
        <P>
          We may suspend or terminate accounts that violate these rules, with or
          without notice.
        </P>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your Content",
    body: (
      <>
        <P>
          You retain ownership of the content you create in ClaroFlux — your study
          sessions, notes, tasks, profile, feedback, and uploads
          (&ldquo;Your Content&rdquo;). You are solely responsible for Your Content
          and for ensuring you have the right to submit it.
        </P>
        <P>
          You grant us a limited, non-exclusive licence to host, store, process,
          and display Your Content <Strong>solely to operate and provide the
          service to you</Strong>. This includes transmitting the relevant parts of
          Your Content to the AI and email providers described in our Privacy Policy
          so that the corresponding features can function.
        </P>
        <Callout>
          Because some content is sent to third-party AI providers to generate
          responses, do not submit sensitive personal information or anything you
          are not permitted to share.
        </Callout>
      </>
    ),
  },
  {
    id: "ai-disclaimer",
    title: "AI Features & Disclaimer",
    body: (
      <>
        <P>
          ClaroFlux&rsquo;s insights, study plans, and coaching are generated by
          automated AI systems. This output:
        </P>
        <UL>
          <LI>May be inaccurate, incomplete, or inconsistent, and should not be relied on as your sole source of truth.</LI>
          <LI>Is provided for general study guidance only and is <Strong>not</Strong> professional, medical, psychological, financial, or academic advice.</LI>
          <LI>Is provided &ldquo;as is&rdquo; — you are responsible for how you use it.</LI>
        </UL>
        <P>
          Always apply your own judgement, and consult a qualified professional for
          decisions that warrant one.
        </P>
      </>
    ),
  },
  {
    id: "feedback",
    title: "Feedback You Submit",
    body: (
      <P>
        If you send us feedback, suggestions, or ideas, you grant us the right to
        use them without restriction or compensation to operate and improve
        ClaroFlux. We are under no obligation to act on, keep confidential, or
        respond to any feedback, although we read it and value it.
      </P>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <P>
        ClaroFlux, including its software, design, branding, logo, and content (but
        excluding Your Content), is owned by us and protected by intellectual
        property laws. We grant you a limited, personal, non-transferable,
        revocable licence to use the service for your own studying. You may not
        copy, modify, distribute, or create derivative works from the service
        except as expressly permitted.
      </P>
    ),
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    body: (
      <P>
        ClaroFlux depends on third-party providers — including Supabase, Google,
        OpenRouter/NVIDIA, Resend, and Vercel — to deliver its features. Your use
        of the service may also be subject to those providers&rsquo; terms. We are
        not responsible for the availability, performance, or actions of
        third-party services, and their inclusion does not imply our endorsement of
        any content they may process.
      </P>
    ),
  },
  {
    id: "termination",
    title: "Account Termination",
    body: (
      <>
        <UL>
          <LI><Strong>By you</Strong> — you may stop using ClaroFlux at any time and permanently delete your account and associated data from <Strong>Settings → Delete account</Strong>.</LI>
          <LI><Strong>By us</Strong> — we may suspend or terminate your access if you violate these Terms, if required by law, or if necessary to protect the service or other users.</LI>
        </UL>
        <P>
          On termination, your right to use the service ends and the data linked to
          your account is removed as described in our Privacy Policy. Sections that
          by their nature should survive termination (such as intellectual
          property, disclaimers, and limitation of liability) will continue to
          apply.
        </P>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <P>
        ClaroFlux is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        basis, without warranties of any kind, whether express or implied,
        including but not limited to fitness for a particular purpose, accuracy, and
        non-infringement. We do not warrant that the service will be uninterrupted,
        secure, or free of errors, or that AI-generated output will be accurate or
        suitable for your needs.
      </P>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <P>
        To the maximum extent permitted by law, ClaroFlux and its operators will
        not be liable for any indirect, incidental, special, consequential, or
        punitive damages, or for any loss of data, study progress, profits, or
        goodwill, arising from your use of (or inability to use) the service. Where
        liability cannot be excluded, it is limited to the greatest extent permitted
        by applicable law. ClaroFlux is a study-support tool and is not responsible
        for your academic outcomes.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <P>
        We may revise these Terms from time to time. When we make material changes
        we will update the &ldquo;Last updated&rdquo; date above. Your continued use
        of ClaroFlux after changes take effect constitutes acceptance of the revised
        Terms.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <P>
        Questions about these Terms? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent transition-colors hover:text-accent-strong">
          {CONTACT_EMAIL}
        </a>
        .
      </P>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <article className="space-y-10">
      <LegalHeader
        title="Terms of Service"
        lastUpdated={LAST_UPDATED}
        intro="These terms set out the rules for using ClaroFlux. Please read them carefully — by using the service you agree to them."
      />

      <TableOfContents sections={SECTIONS} />

      <div className="space-y-9">
        {SECTIONS.map((section, i) => (
          <LegalSection key={section.id} id={section.id} index={i + 1} title={section.title}>
            {section.body}
          </LegalSection>
        ))}
      </div>
    </article>
  );
}
