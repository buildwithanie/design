"use client";

import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useActionState } from "react";

import { submitContactInquiry } from "@/app/get-involved/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormState } from "@/lib/validation/contact-inquiry";

const initialState: ContactFormState = {
  status: "idle",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState,
  );

  return (
    <form action={formAction}>
      <FieldGroup className="grid gap-5 sm:grid-cols-2">
        <Field
          data-invalid={Boolean(state.errors?.name?.length)}
          className="sm:col-span-1"
        >
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>

          <Input
            key={`name-${state.values?.name ?? ""}`}
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            defaultValue={state.values?.name}
            aria-invalid={Boolean(state.errors?.name?.length)}
            required
            minLength={2}
            maxLength={80}
            className="h-12 bg-background"
          />

          <FieldError>{state.errors?.name?.[0]}</FieldError>
        </Field>

        <Field
          data-invalid={Boolean(state.errors?.email?.length)}
          className="sm:col-span-1"
        >
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>

          <Input
            key={`email-${state.values?.email ?? ""}`}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={state.values?.email}
            aria-invalid={Boolean(state.errors?.email?.length)}
            required
            className="h-12 bg-background"
          />

          <FieldError>{state.errors?.email?.[0]}</FieldError>
        </Field>

        <Field
          data-invalid={Boolean(state.errors?.organization?.length)}
          className="sm:col-span-2"
        >
          <FieldLabel htmlFor="contact-organization">Organisation</FieldLabel>

          <Input
            key={`organization-${state.values?.organization ?? ""}`}            id="contact-organization"
            name="organization"
            autoComplete="organization"
            placeholder="Optional"
            defaultValue={state.values?.organization}
            aria-invalid={Boolean(state.errors?.organization?.length)}
            maxLength={120}
            className="h-12 bg-background"
          />

          <FieldError>{state.errors?.organization?.[0]}</FieldError>
        </Field>

        <Field
          data-invalid={Boolean(state.errors?.interest?.length)}
          className="sm:col-span-2"
        >
          <FieldLabel htmlFor="contact-interest">Area of interest</FieldLabel>

          <select
            id="contact-interest"
            name="interest"
            defaultValue={state.values?.interest ?? ""}
            aria-invalid={Boolean(state.errors?.interest?.length)}
            required
            className="h-12 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
          >
            <option value="" disabled>
              Select an area
            </option>
            <option value="research">Research collaboration</option>
            <option value="community">Community partnership</option>
            <option value="institutional">Institutional support</option>
            <option value="general">General inquiry</option>
          </select>

          <FieldError>{state.errors?.interest?.[0]}</FieldError>
        </Field>

        <Field
          data-invalid={Boolean(state.errors?.message?.length)}
          className="sm:col-span-2"
        >
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>

          <Textarea
            id="contact-message"
            name="message"
            placeholder="Briefly tell us what you would like to explore."
            defaultValue={state.values?.message}
            aria-invalid={Boolean(state.errors?.message?.length)}
            required
            minLength={20}
            maxLength={2000}
            className="min-h-36 resize-y bg-background"
          />

          <FieldError>{state.errors?.message?.[0]}</FieldError>
        </Field>
      </FieldGroup>

      {state.message ? (
        <div
          role={state.status === "error" ? "alert" : "status"}
          className={`mt-5 text-sm ${
            state.status === "error"
              ? "text-destructive"
              : "flex items-center gap-2 text-(--green)"
          }`}
        >
          {state.status === "success" ? (
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="size-5 shrink-0"
              aria-hidden="true"
            />
          ) : null}

          {state.message}
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-6 h-12 rounded-md"
      >
        {isPending ? "Sending..." : "Send inquiry"}

        {!isPending ? (
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            data-icon="inline-end"
            className="size-4"
            aria-hidden="true"
          />
        ) : null}
      </Button>
    </form>
  );
}
