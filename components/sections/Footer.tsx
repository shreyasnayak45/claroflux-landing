import Image from "next/image";
import {
  APP_URL,
  PRIVACY_URL,
  SIGNUP_URL,
  TERMS_URL,
} from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "Intelligence", href: "#intelligence" },
      { label: "Study Coach", href: "#coach" },
      { label: "Focus Mode", href: "#focus" },
    ],
  },
  {
    heading: "App",
    links: [
      { label: "Open App", href: APP_URL },
      { label: "Create account", href: SIGNUP_URL },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: PRIVACY_URL },
      { label: "Terms", href: TERMS_URL },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-canvas-deep/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={30} height={30} className="size-7.5" />
              <span className="text-base font-bold tracking-tight text-ink">
                ClaroFlux
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-body">
              The intelligent study platform — track your sessions, see your
              patterns, plan your next move.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h3 className="text-sm font-semibold text-ink">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-body transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line-soft pt-7 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted">
            © {new Date().getFullYear()} ClaroFlux. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
