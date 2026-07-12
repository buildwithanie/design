"use client";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Media Center", href: "/media" },
  { label: "Get Involved", href: "/get-involved" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-24 w-[min(1180px,92vw)] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="IAHL home"
          onClick={closeMenu}
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

        <nav
          className="hidden items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-sm lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-accent hover:text-primary ${
                  index === navItems.length - 1
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full lg:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <HugeiconsIcon
            icon={isMenuOpen ? Cancel01Icon : Menu01Icon}
            className="size-5"
            aria-hidden="true"
          />
        </Button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <nav
            className="mx-auto grid w-[min(92vw,420px)] gap-2 py-5"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-3 text-base font-semibold transition hover:bg-accent hover:text-primary ${
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
