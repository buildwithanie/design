"use client";

import type { ComponentProps } from "react";

export function ClientForm({ children, ...props }: ComponentProps<"form">) {
  return (
    <form
      {...props}
      onSubmit={(event) => {
        props.onSubmit?.(event);
        if (!event.defaultPrevented) event.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
