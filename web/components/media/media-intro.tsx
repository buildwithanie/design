import Link from "next/link";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type MediaArchiveIntroProps = {
  label: string;
  heading: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function MediaArchiveIntro({
  label,
  heading,
  description,
  backHref,
  backLabel,
}: MediaArchiveIntroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary pt-24">
      <div
        className="pointer-events-none absolute -right-16 top-32 -z-10 hidden size-52 rounded-full border-28 border-primary/10 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto w-[min(1180px,92vw)] py-12 sm:py-16 lg:py-18">
        {backHref && backLabel ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              className="size-4"
              aria-hidden="true"
            />
            {backLabel}
          </Link>
        ) : null}

        <div className={`${backHref && backLabel ? "mt-9" : ""} max-w-4xl`}>
          <div className="flex items-center gap-3">
            <span
              className="size-2.5 rounded-full bg-(--purple)"
              aria-hidden="true"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {label}
            </p>
          </div>

          <span
            className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
            aria-hidden="true"
          />

          <h1 className="mt-7 max-w-3xl text-balance text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-[4.2rem]">
            {heading}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
