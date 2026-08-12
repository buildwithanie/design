import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

export default function ProjectsNotFound() {
  return (
    <main className="flex min-h-[72dvh] items-center bg-secondary pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-primary">Projects unavailable</p>

          <span
            className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
            aria-hidden="true"
          />

          <h1 className="mt-7 text-balance text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Our projects page isn&rsquo;t available right now.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            The page may be temporarily unavailable while its content is being
            updated. You can return to the homepage or learn more about IAHL&rsquo;s
            work.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className={buttonVariants({
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Return home
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="size-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/work"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Explore our work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
