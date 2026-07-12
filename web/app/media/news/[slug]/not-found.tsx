import Link from "next/link";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

export default function NewsNotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-secondary px-5 pt-28 pb-16">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
          News item not found
        </p>

        <h1 className="mt-4 text-balance text-4xl leading-tight font-bold sm:text-5xl">
          This story is unavailable.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          It may have been moved, unpublished, or the address may be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/media/news"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              data-icon="inline-start"
              className="size-4"
              aria-hidden="true"
            />
            View all news
          </Link>

          <Link
            href="/media"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Media Center
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              data-icon="inline-end"
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
