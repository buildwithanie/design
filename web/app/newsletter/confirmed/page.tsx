import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Newsletter subscription confirmed",
  alternates: { canonical: "/newsletter/confirmed" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewsletterConfirmedPage() {
  return (
    <main className="flex min-h-[72dvh] items-center bg-secondary pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-primary">
            Subscription confirmed
          </p>

          <h1 className="mt-5 text-balance text-4xl leading-[1.05] font-bold sm:text-5xl">
            You&apos;re subscribed to IAHL updates.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            We&apos;ll send research news, publications, project updates and
            opportunities when there is something worth sharing.
          </p>

          <Link
            href="/media"
            className={buttonVariants({
              size: "lg",
              className: "mt-8 h-11 px-5",
            })}
          >
            Visit the media center
          </Link>
        </div>
      </div>
    </main>
  );
}
