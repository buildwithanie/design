import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function GetInvolved() {
  return (
    <section id="involved" className="relative overflow-hidden py-10">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="relative">
          <Image
            src="/images/iahl-media-meeting.png"
            alt="IAHL partners in a meeting discussing AI health research"
            width={2048}
            height={1024}
            sizes="(max-width: 1024px) 92vw, 54vw"
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>

        <div className="relative">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Get involved
          </p>

          <h2 className="max-w-none whitespace-nowrap text-[clamp(2.35rem,5vw,4rem)] leading-[1.02] font-bold">
            Partner with us
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            We believe meaningful change happens through collaboration. By
            partnering with us, you become part of a network dedicated to
            innovation, growth, and community impact. Together, we can create
            sustainable solutions that make a real difference.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-involved#partner"
              className={buttonVariants({
                size: "lg",
                className: "h-12 rounded-md px-6",
              })}
            >
              Explore partnerships
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="size-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/get-involved#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-12 rounded-md bg-background/70 px-6",
              })}
            >
              Contact IAHL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
