import "server-only";

import { createHash } from "node:crypto";

import { NewsletterConfirmationEmail } from "@/components/emails/newsletter-confirmation-email";
import {
  getSiteUrl,
  newsletterSegmentId,
  newsletterTopicId,
  resend,
} from "@/lib/newsletter/resend";
import { createNewsletterToken } from "@/lib/newsletter/token";

const NEWSLETTER_FROM =
  "IAHL Updates <newsletter@updates.innovateaihealthlab.co.ke>";

function throwResendError(context: string, error: unknown): never {
  console.error(context, error);
  throw new Error(context);
}

export async function sendNewsletterConfirmation(email: string) {
  const token = createNewsletterToken(email);
  const siteUrl = getSiteUrl();
  const confirmationUrl = new URL("/newsletter/confirm", siteUrl);
  confirmationUrl.searchParams.set("token", token);

  const emailHash = createHash("sha256")
    .update(email)
    .digest("hex")
    .slice(0, 24);
  const hourlyWindow = Math.floor(Date.now() / (60 * 60 * 1000));

  const { error } = await resend.emails.send(
    {
      from: NEWSLETTER_FROM,
      to: email,
      subject: "Confirm your IAHL newsletter subscription",
      react: (
        <NewsletterConfirmationEmail
          confirmationUrl={confirmationUrl.toString()}
          siteUrl={siteUrl}
        />
      ),
    },
    {
      idempotencyKey: `newsletter-confirmation-${emailHash}-${hourlyWindow}`,
    },
  );

  if (error) {
    throwResendError("Resend could not send newsletter confirmation.", error);
  }
}

async function updateExistingContact(email: string) {
  const { error: contactError } = await resend.contacts.update({
    email,
    unsubscribed: false,
  });

  if (contactError) {
    throwResendError(
      "Resend could not update the newsletter contact.",
      contactError,
    );
  }

  const [{ error: segmentError }, { error: topicError }] = await Promise.all([
    resend.contacts.segments.add({
      email,
      segmentId: newsletterSegmentId,
    }),
    resend.contacts.topics.update({
      email,
      topics: [
        {
          id: newsletterTopicId,
          subscription: "opt_in",
        },
      ],
    }),
  ]);

  if (segmentError && segmentError.statusCode !== 409) {
    throwResendError(
      "Resend could not add the contact to the newsletter segment.",
      segmentError,
    );
  }

  if (topicError) {
    throwResendError(
      "Resend could not update the newsletter topic subscription.",
      topicError,
    );
  }
}

export async function confirmNewsletterContact(email: string) {
  const { data: existingContact, error: lookupError } =
    await resend.contacts.get({ email });

  if (existingContact) {
    await updateExistingContact(email);
    return;
  }

  if (lookupError?.statusCode !== 404) {
    throwResendError(
      "Resend could not check the newsletter contact.",
      lookupError,
    );
  }

  const { error: createError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: newsletterSegmentId }],
    topics: [
      {
        id: newsletterTopicId,
        subscription: "opt_in",
      },
    ],
  });

  if (createError?.statusCode === 409) {
    await updateExistingContact(email);
    return;
  }

  if (createError) {
    throwResendError(
      "Resend could not create the newsletter contact.",
      createError,
    );
  }
}
