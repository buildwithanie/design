import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const opportunities = [
  {
    title: "Careers",
    text: "Join a team blending AI, research, and community-centered health innovation.",
    action: "Open roles",
    href: "/get-involved#careers",
  },
  {
    title: "Partner with IAHL",
    text: "Collaborate on research, training, digital health pilots, and strategic programs.",
    action: "Partnerships",
    href: "/get-involved#partner",
  },
];

export function WorkWithUs() {
  return (
    <section className="bg-accent/60 py-16 sm:py-20">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Work With Us
          </p>

          <h2 className="max-w-3xl text-balance text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Build a more equitable health future
          </h2>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {opportunities.map((item) => (
              <Card key={item.title} className="rounded-lg bg-background/90">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.text}
                  </p>

                  <Link
                    href={item.href}
                    className={buttonVariants({
                      variant: "link",
                      className: "mt-4 h-auto p-0 text-primary",
                    })}
                  >
                    {item.action}
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

        <div className="relative mx-auto aspect-[0.78] w-[min(320px,78vw)] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          <Image
            src="/work.png"
            alt="Professional welcoming partner"
            fill
            sizes="(max-width: 980px) 78vw, 320px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
