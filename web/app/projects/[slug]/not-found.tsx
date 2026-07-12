import Link from "next/link";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-[72dvh] items-center bg-background pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-3xl">
          <Link
            href="/projects"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "-ml-3 text-muted-foreground",
            })}
          >
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              data-icon="inline-start"
              className="size-4"
              aria-hidden="true"
            />
            All projects
          </Link>

          <p className="mt-10 text-sm font-bold text-primary">
            Project not found
          </p>

          <span
            className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
            aria-hidden="true"
          />

          <h1 className="mt-7 text-balance text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            This project isn&rsquo;t available.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            It may have moved, may no longer be published, or the address may be
            incorrect. Visit the projects page to explore currently available
            work.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className={buttonVariants({
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Explore projects
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="size-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
