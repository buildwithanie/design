import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import type { HomeSectionProps } from "@/components/home/types";
import { buttonVariants } from "@/components/ui/button";

export function GetInvolved({ homePage }: HomeSectionProps) {
  if (
    !homePage.getInvolvedLabel ||
    !homePage.getInvolvedHeading ||
    !homePage.getInvolvedDescription
  ) {
    return null;
  }

  return (
    <section id="involved" className="py-10 sm:py-14">
      <div className="mx-auto w-[min(1080px,92vw)] rounded-lg bg-[#f8f1e8] px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {homePage.getInvolvedLabel}
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            {homePage.getInvolvedHeading}
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground sm:text-lg">
            {homePage.getInvolvedDescription}
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className={buttonVariants({
                size: "lg",
                className: "h-12 rounded-md px-6",
              })}
            >
              Start a conversation
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="size-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
