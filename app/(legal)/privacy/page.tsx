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
  DefList,
  DefRow,
  Callout,
} from "@/components/legal/prose";

const LAST_UPDATED = "June 4, 2026";
const CONTACT_EMAIL = "studyflowapp.official@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy — ClaroFlux",
  description:
    "How ClaroFlux collects, uses, stores, and protects your study data, account information, feedback, and uploaded files.",
};

interface Section {
  id: string;
  title: string;
  body: ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <P>
          ClaroFlux (&ldquo;ClaroFlux&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an AI-assisted study
          dashboard that helps you log study sessions, manage tasks, and receive
          automated insights and coaching. This Privacy Policy explains exactly
          what data we collect, why we collect it, where it is stored, and the
          choices you have.
        </P>
        <P>
          We have written this policy to reflect how ClaroFlux actually works. We
          do not collect data we do not use, and we do not run third-party
          advertising or tracking networks.
        </P>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <P>
          Almost all of the data ClaroFlux holds is information you choose to
          create. We group it as follows:
        </P>
        <DefList>
          <DefRow term="Account information">
            Your email address and a securely hashed password (managed by our
            authentication provider), or — if you sign in with Google — your
            name, email address, and profile picture from your Google account.
          </DefRow>
          <DefRow term="Profile">
            An optional display name and an optional profile picture you upload.
          </DefRow>
          <DefRow term="Study sessions">
            Subject, duration, optional notes, the date studied, and (for
            live-timer sessions) the session start time.
          </DefRow>
          <DefRow term="Tasks">
            Task title, optional description, priority, due date, and completion
            status.
          </DefRow>
          <DefRow term="Preferences">
            Your daily study goal, preferred session length, and whether
            notifications are enabled.
          </DefRow>
          <DefRow term="AI content">
            Study plans and coaching feedback generated for you, along with the
            inputs used to produce them, so they can be shown again later.
          </DefRow>
          <DefRow term="Feedback submissions">
            The category, optional title, message, and any optional screenshot
            you attach, plus basic technical metadata (described below).
          </DefRow>
          <DefRow term="Feedback metadata">
            When you submit feedback we attach your app version, platform
            (&ldquo;web&rdquo;), browser, operating system, and screen resolution
            so we can reproduce issues. This is collected only at the moment you
            submit feedback — not continuously.
          </DefRow>
        </DefList>
        <P>
          <Strong>We do not</Strong> use third-party analytics, advertising
          pixels, fingerprinting, or behavioural tracking tools. ClaroFlux does
          not collect your location, contacts, or device sensors.
        </P>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: (
      <>
        <UL>
          <LI>To operate core features — logging sessions, managing tasks, and showing your dashboard and analytics.</LI>
          <LI>To generate AI insights, study plans, and post-session coaching (see <Strong>AI Features</Strong> below).</LI>
          <LI>To send you a weekly study report by email, when that feature is enabled and you have studied that week.</LI>
          <LI>To respond to and act on the feedback you submit, and to fix bugs you report.</LI>
          <LI>To secure your account, prevent abuse, and maintain the reliability of the service.</LI>
        </UL>
        <P>
          We do <Strong>not</Strong> sell your personal information, and we do not
          use your study notes or feedback to send you marketing.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Local Storage",
    body: (
      <>
        <P>ClaroFlux uses only the browser storage it needs to function:</P>
        <DefList>
          <DefRow term="Authentication cookies">
            Essential session cookies set by our authentication provider to keep
            you signed in and to refresh your session securely. Without them you
            cannot stay logged in.
          </DefRow>
          <DefRow term="Local storage">
            A single key (<code className="rounded bg-canvas-deep px-1 py-0.5 text-[0.85em] text-ink">claroflux_live_session</code>)
            stores the subject and start time of an in-progress live timer on
            your device, so the timer survives a page refresh. It is removed when
            the session ends.
          </DefRow>
        </DefList>
        <P>
          We do not use advertising cookies or cross-site tracking cookies. We do
          not use browser <code className="rounded bg-canvas-deep px-1 py-0.5 text-[0.85em] text-ink">sessionStorage</code>.
        </P>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "AI Features",
    body: (
      <>
        <P>
          ClaroFlux uses third-party AI providers to generate insights and
          coaching. To do this, a limited set of your study data is sent to these
          providers to produce a response:
        </P>
        <UL>
          <LI><Strong>Daily insights & weekly report narratives</Strong> are generated by Google&rsquo;s Gemini models using derived statistics — such as hours studied, streaks, subject names, task counts, and consistency signals.</LI>
          <LI><Strong>AI Lab study plans</Strong> and <Strong>post-session coaching</Strong> are generated by an NVIDIA Nemotron model accessed through OpenRouter, using the subject, duration, and any topic or notes you provide for that session or plan.</LI>
        </UL>
        <Callout>
          Data sent to AI providers is processed under their own terms and privacy
          policies, and may be processed outside your country. Because of this,
          please avoid putting sensitive personal information (such as government
          IDs, health details, or passwords) into session notes, plan inputs, or
          feedback.
        </Callout>
        <P>
          AI-generated content is produced automatically and may be inaccurate.
          It is intended as study guidance only and is not professional, medical,
          or academic advice.
        </P>
      </>
    ),
  },
  {
    id: "uploads",
    title: "Uploaded Files & Screenshots",
    body: (
      <>
        <P>ClaroFlux stores two kinds of uploaded images, in separate buckets:</P>
        <DefList>
          <DefRow term="Profile pictures">
            Stored in a <Strong>public</Strong> storage bucket. This means the
            image URL can be accessed by anyone who has the link. Please do not
            use a profile picture you consider private.
          </DefRow>
          <DefRow term="Feedback screenshots">
            Stored in a <Strong>private</Strong> storage bucket, limited to image
            files up to 5&nbsp;MB. They are organised per user and served through
            expiring signed links. Other users cannot browse them.
          </DefRow>
        </DefList>
        <P>
          Screenshots may capture whatever is on the screen at the time you take
          them. Please review a screenshot before attaching it so you do not share
          information you would rather keep private.
        </P>
      </>
    ),
  },
  {
    id: "storage-security",
    title: "Data Storage & Security",
    body: (
      <>
        <P>
          Your data is stored in a managed PostgreSQL database and object storage
          operated by Supabase. We protect it with several layers:
        </P>
        <UL>
          <LI><Strong>Row-Level Security</Strong> is enabled on every table, so the database itself enforces that you can only read and write your own rows.</LI>
          <LI><Strong>Passwords</Strong> are hashed and managed by our authentication provider — we never see or store them in plain text.</LI>
          <LI><Strong>Encryption in transit</Strong> protects data moving between your browser and our servers.</LI>
          <LI><Strong>Feedback screenshots</Strong> are kept in a private bucket and reached only through short-lived signed URLs.</LI>
        </UL>
        <P>
          No system is perfectly secure, but we work to follow sensible,
          industry-standard practices and to limit access to your data to what is
          required to run the service.
        </P>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    body: (
      <>
        <P>
          We rely on a small number of trusted providers (&ldquo;sub-processors&rdquo;)
          to run ClaroFlux. Each receives only the data it needs:
        </P>
        <DefList>
          <DefRow term="Supabase">
            Authentication, database, and file storage. Holds your account and all
            study data.
          </DefRow>
          <DefRow term="Google (Gemini API)">
            Generates dashboard insights and weekly report narratives from derived
            study statistics.
          </DefRow>
          <DefRow term="OpenRouter / NVIDIA Nemotron">
            Generates AI Lab study plans and post-session coaching from the inputs
            you provide.
          </DefRow>
          <DefRow term="Google (OAuth)">
            Optional &ldquo;Sign in with Google&rdquo;. Shares your Google name,
            email, and avatar with us only if you choose it.
          </DefRow>
          <DefRow term="Resend">
            Delivers weekly study report emails to your registered address, when
            that feature is enabled.
          </DefRow>
          <DefRow term="Vercel">
            Hosts and serves the application and runs the scheduled weekly-report
            job.
          </DefRow>
        </DefList>
        <P>
          We do not sell your personal information or share it with third parties
          for their own marketing. We may disclose data if required by law or to
          protect the rights, safety, and security of ClaroFlux and its users.
        </P>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <>
        <P>
          We keep your data for as long as your account is active. Study sessions,
          tasks, AI content, and feedback remain available to you until you delete
          them or delete your account.
        </P>
        <P>
          When you delete your account, your account record and the data linked to
          it are removed; database relationships are configured to cascade so your
          sessions, tasks, profile, settings, AI content, and feedback are deleted
          along with it. Backups and provider logs may persist for a limited period
          before being overwritten.
        </P>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    body: (
      <>
        <UL>
          <LI><Strong>Access & edit</Strong> — view and update your sessions, tasks, profile, and preferences at any time from within the app.</LI>
          <LI><Strong>Delete your account</Strong> — permanently remove your account and associated data from <Strong>Settings → Delete account</Strong>.</LI>
          <LI><Strong>Email preferences</Strong> — weekly report emails are sent only when the feature is enabled; you can stop them by adjusting your notification preference or contacting us.</LI>
          <LI><Strong>Request help</Strong> — contact us about any data question, including a copy or correction of your information.</LI>
        </UL>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: (
      <P>
        ClaroFlux is intended for students aged 13 and older. We do not knowingly
        collect personal information from children under 13. If you are under the
        age of majority in your region, please use ClaroFlux only with the
        involvement of a parent or guardian. If you believe a child has provided us
        personal information, contact us and we will remove it.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <P>
        We may update this Privacy Policy as ClaroFlux evolves. When we make
        material changes we will update the &ldquo;Last updated&rdquo; date at the
        top of this page. Your continued use of ClaroFlux after an update means you
        accept the revised policy.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <P>
        Questions about this policy or your data? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent transition-colors hover:text-accent-strong">
          {CONTACT_EMAIL}
        </a>
        .
      </P>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="space-y-10">
      <LegalHeader
        title="Privacy Policy"
        lastUpdated={LAST_UPDATED}
        intro="This policy describes how ClaroFlux handles your information. It reflects how the product is actually built — what we collect, why, where it lives, and the control you have over it."
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
