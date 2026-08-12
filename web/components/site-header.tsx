import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import {
  HeaderNavigation,
  HeaderNavigationFallback,
} from "@/components/header-navigation";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-24 w-[min(1180px,92vw)] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="IAHL home"
        >
          <Image
            src="/images/iahl-logo.jpeg"
            alt="Innovate AI HealthLab logo"
            width={164}
            height={120}
            priority
            className="h-16 w-auto object-contain md:h-19"
          />
        </Link>

        <Suspense fallback={<HeaderNavigationFallback />}>
          <HeaderNavigation />
        </Suspense>
      </div>
    </header>
  );
}
