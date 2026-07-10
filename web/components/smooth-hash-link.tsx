"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SmoothHashLinkProps = ComponentProps<typeof Link>;

export function SmoothHashLink({ href, onClick, ...props }: SmoothHashLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== "string") return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const target = document.getElementById(
      decodeURIComponent(href.slice(hashIndex + 1)),
    );
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <Link {...props} href={href} onClick={handleClick} />;
}
