"use client";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
] as const;

export function HeaderNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <DesktopNavigation pathname={pathname} />

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

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-border bg-background lg:hidden"
        >
          <nav
            className="mx-auto grid w-[min(92vw,420px)] gap-2 py-5"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

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
    </>
  );
}

export function HeaderNavigationFallback() {
  return (
    <>
      <DesktopNavigation />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-11 rounded-full lg:hidden"
        aria-label="Loading navigation"
        disabled
      >
        <HugeiconsIcon
          icon={Menu01Icon}
          className="size-5"
          aria-hidden="true"
        />
      </Button>
    </>
  );
}

function DesktopNavigation({ pathname }: { pathname?: string }) {
  return (
    <nav
      className="hidden items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-sm lg:flex"
      aria-label="Main navigation"
    >
      {navItems.map((item, index) => {
        const isActive = pathname ? isActivePath(pathname, item.href) : false;

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
  );
}

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
