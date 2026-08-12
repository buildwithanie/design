"use client";

import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useActionState } from "react";

import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { NewsletterFormState } from "@/lib/validation/newsletter";

const initialState: NewsletterFormState = {
  status: "idle",
};

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  const hasEmailError = Boolean(state.errors?.email?.length);

  return (
    <form action={formAction}>
      <h2 className="font-bold text-white">Get IAHL updates</h2>
      <p className="mt-2 mb-4 max-w-sm text-sm leading-6 text-white/70">
        Research news, publications, and project updates delivered
        occasionally.
      </p>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field data-invalid={hasEmailError}>
        <FieldLabel htmlFor="newsletter-email" className="sr-only">
          Email address
        </FieldLabel>

        <Input
          key={`email-${state.values?.email ?? ""}`}
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.values?.email}
          aria-invalid={hasEmailError}
          required
          className="h-11 border-white/20 bg-white text-foreground"
        />

        <FieldError>{state.errors?.email?.[0]}</FieldError>
      </Field>

      <Button type="submit" disabled={isPending} className="mt-2 h-11 w-full">
        {isPending ? "Signing up..." : "Sign up"}

        {!isPending ? (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="size-4"
            aria-hidden="true"
          />
        ) : null}
      </Button>

      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`mt-3 text-sm leading-6 ${
            state.status === "error" ? "text-red-300" : "text-white/75"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
