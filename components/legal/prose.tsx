import type { ReactNode } from "react";

export function LegalHeader({
  title,
  lastUpdated,
  intro,
}: {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <span className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted">
        Last updated · {lastUpdated}
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="text-sm leading-relaxed text-body">{intro}</p>
    </div>
  );
}

export function TableOfContents({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-line bg-card p-4 sm:p-5"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        On this page
      </p>
      <ol className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex items-baseline gap-2 text-sm text-body transition-colors hover:text-accent"
            >
              <span className="text-xs tabular-nums text-muted group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-baseline gap-2.5 text-lg font-semibold text-ink">
        <span className="text-sm font-medium tabular-nums text-accent">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-body">
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="space-y-2">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-500" />
      <span>{children}</span>
    </li>
  );
}

export function DefList({ children }: { children: ReactNode }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
      {children}
    </dl>
  );
}

export function DefRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 px-4 py-3.5 sm:grid-cols-[210px_1fr] sm:gap-5">
      <dt className="text-sm font-medium text-ink">{term}</dt>
      <dd className="text-sm leading-relaxed text-body">{children}</dd>
    </div>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed text-body dark:border-brand-700/40 dark:bg-brand-900/20">
      {children}
    </div>
  );
}
