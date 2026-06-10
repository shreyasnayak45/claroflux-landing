import { cn } from "@/lib/cn";

interface AuroraProps {
  className?: string;
  /** Visual intensity of the atmosphere. */
  variant?: "hero" | "soft";
}

/**
 * Ambient, slowly-drifting light field. Pure CSS transforms on blurred
 * radial gradients — fully GPU-composited, theme-aware via tokens.
 */
export function Aurora({ className, variant = "soft" }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute -top-[20%] left-[8%] aspect-square w-[44rem] max-w-[90vw] rounded-full blur-3xl will-change-transform animate-aurora-a",
          variant === "hero" ? "opacity-100" : "opacity-60",
        )}
        style={{
          background:
            "radial-gradient(circle at 35% 35%, var(--hero-spot-a), transparent 65%)",
        }}
      />
      <div
        className={cn(
          "absolute -top-[8%] right-[2%] aspect-square w-[40rem] max-w-[85vw] rounded-full blur-3xl will-change-transform animate-aurora-b",
          variant === "hero" ? "opacity-100" : "opacity-50",
        )}
        style={{
          background:
            "radial-gradient(circle at 60% 40%, var(--hero-spot-b), transparent 62%)",
        }}
      />
      <div
        className={cn(
          "absolute bottom-[-25%] left-[30%] aspect-square w-[38rem] max-w-[80vw] rounded-full blur-3xl will-change-transform animate-aurora-a",
          variant === "hero" ? "opacity-90" : "opacity-40",
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--hero-spot-c), transparent 65%)",
        }}
      />
    </div>
  );
}
