import { cn } from "@/lib/cn";

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

/** Minimal browser chrome that makes screenshots feel like a living app. */
export function BrowserFrame({
  children,
  url = "app.claroflux.com",
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "shot-shadow overflow-hidden rounded-2xl border border-line bg-card",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line-soft bg-canvas-deep/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-card px-3 py-1 text-[11px] font-medium text-muted ring-1 ring-line-soft">
          <svg
            className="size-2.5 shrink-0 text-brand-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <div className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
