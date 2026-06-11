"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { APP_URL, SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Study Coach", href: "#coach" },
  { label: "Focus", href: "#focus" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Border/radius stay constant (transparent at top) — toggling them
          with transition-all flashes a white box while border-color falls
          back to currentColor mid-transition. */}
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-transparent bg-transparent px-4 shadow-none transition-all duration-500 sm:px-6",
          scrolled && "glass card-shadow mx-3 mt-3 h-14 max-w-5xl sm:mx-auto",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="ClaroFlux — back to top"
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-line">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain"
              priority
            />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-ink">
            ClaroFlux
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-body transition-colors hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={APP_URL}
            className="rounded-full px-4 py-2 text-sm font-semibold text-body transition-colors hover:text-ink"
          >
            Open App
          </a>
          <a
            href={SIGNUP_URL}
            className="rounded-full bg-brand-500 px-4.5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-600 hover:brand-glow dark:bg-brand-400 dark:text-navy-900 dark:hover:bg-brand-300"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-ink md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="glass card-shadow mx-3 mt-2 rounded-2xl p-3 md:hidden"
            aria-label="Mobile"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line-soft pt-3">
              <a
                href={APP_URL}
                className="glass rounded-full px-4 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Open App
              </a>
              <a
                href={SIGNUP_URL}
                className="rounded-full bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-brand-400 dark:text-navy-900"
              >
                Get Started
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
