"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  confirmNewsletterContact,
  sendNewsletterConfirmation,
} from "@/lib/newsletter/subscription";
import { verifyNewsletterToken } from "@/lib/newsletter/token";
import {
  newsletterSchema,
  type NewsletterFormState,
} from "@/lib/validation/newsletter";

export async function subscribeToNewsletter(
  _previousState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const websiteValue = formData.get("website");
  const website =
    typeof websiteValue === "string" ? websiteValue.trim() : "";

  const result = newsletterSchema.safeParse({ email });

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);

    return {
      status: "error",
      message: "Please check your email address.",
      values: { email },
      errors: {
        email: errorTree.properties?.email?.errors,
      },
    };
  }

  if (website) {
    return {
      status: "success",
      message: "Check your inbox to confirm your subscription.",
    };
  }

  try {
    await sendNewsletterConfirmation(result.data.email);
  } catch (error) {
    console.error("Newsletter subscription request failed.", error);

    return {
      status: "error",
      message:
        "We could not process your subscription at the moment. Please try again.",
      values: { email },
    };
  }

  return {
    status: "success",
    message: "Check your inbox to confirm your subscription.",
  };
}

export async function confirmNewsletterSubscription(formData: FormData) {
  const tokenValue = formData.get("token");
  const token = typeof tokenValue === "string" ? tokenValue : "";
  const payload = verifyNewsletterToken(token);

  if (!payload) {
    redirect("/newsletter/confirm?error=invalid");
  }

  try {
    await confirmNewsletterContact(payload.email);
  } catch (error) {
    console.error("Newsletter confirmation failed.", error);

    const retryUrl = new URL("/newsletter/confirm", "https://example.invalid");
    retryUrl.searchParams.set("token", token);
    retryUrl.searchParams.set("error", "service");

    redirect(`${retryUrl.pathname}${retryUrl.search}`);
  }

  redirect("/newsletter/confirmed");
}
