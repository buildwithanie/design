import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stories = [
  {
    title: "Responsible AI for public health decision-making",
    href: "/work#responsible-ai",
  },
  {
    title: "Community-led research that strengthens local trust",
    href: "/work#community-intelligence",
  },
  {
    title: "Partnership models for equitable health innovation",
    href: "/work#capacity-partnership",
  },
];

export function MediaCenter() {
  return (
    <section id="media" className="bg-(--charcoal) py-16 text-white sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Media Center
            </p>

            <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
              Latest thinking from IAHL
            </h2>

            <Link
              href="/media"
              className={buttonVariants({
                variant: "outline",
                className:
                  "mt-6 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-foreground",
              })}
            >
              Visit the Media Center
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="size-4"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stories.map((story) => (
              <Card
                key={story.title}
                className="rounded-lg border-white/10 bg-white/10 text-white shadow-none"
              >
                <CardContent className="p-5">
                  <h3 className="text-lg leading-snug font-bold">
                    {story.title}
                  </h3>

                  <Link
                    href={story.href}
                    className={buttonVariants({
                      variant: "link",
                      className: "mt-5 h-auto p-0 text-primary",
                    })}
                  >
                    Explore topic
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      data-icon="inline-end"
                      className="size-4"
                      aria-hidden="true"
                    />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
