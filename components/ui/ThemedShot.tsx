import { getImageProps } from "next/image";
import type { Shot } from "@/lib/shots";
import { cn } from "@/lib/cn";

interface ThemedShotProps {
  shot: Shot;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  imgClassName?: string;
}

/**
 * Renders the real app screenshot matching the visitor's system theme.
 * Uses <picture> + prefers-color-scheme media sources so the browser
 * downloads ONLY the variant it will display — no flash, no double load.
 */
export function ThemedShot({
  shot,
  alt,
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  quality = 90,
  className,
  imgClassName,
}: ThemedShotProps) {
  const common = { alt, sizes, quality, priority };

  const {
    props: { srcSet: darkSrcSet },
  } = getImageProps({ ...common, ...shot.dark });

  const {
    props: { srcSet: lightSrcSet, ...rest },
  } = getImageProps({ ...common, ...shot.light });

  return (
    <picture className={cn("block", className)}>
      <source media="(prefers-color-scheme: dark)" srcSet={darkSrcSet} />
      <source media="(prefers-color-scheme: light)" srcSet={lightSrcSet} />
      <img
        {...rest}
        alt={alt}
        className={cn("h-auto w-full", imgClassName)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
