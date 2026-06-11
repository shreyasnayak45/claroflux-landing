import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,184,170,0.06),transparent)]">

        <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
            <a href={SITE_URL} className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/[.10] dark:ring-white/[.08]">
                <Image src="/logo.png" alt="ClaroFlux" width={28} height={28} className="object-contain" priority />
              </div>
              <span className="text-sm font-semibold text-ink">ClaroFlux</span>
            </a>
            <a
              href={SITE_URL}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-body transition-colors hover:bg-canvas-deep hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
            <p>© {new Date().getFullYear()} ClaroFlux. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <a href="/privacy" className="transition-colors hover:text-ink">Privacy Policy</a>
              <a href="/terms" className="transition-colors hover:text-ink">Terms of Service</a>
              <a href={SITE_URL} className="transition-colors hover:text-ink">Home</a>
            </nav>
          </div>
        </footer>

      </div>
    </div>
  );
}
