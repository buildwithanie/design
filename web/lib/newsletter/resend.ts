import "server-only";

import { Resend } from "resend";

function requireEnvironmentVariable(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const resend = new Resend(
  requireEnvironmentVariable("RESEND_API_KEY"),
);

export const newsletterSegmentId = requireEnvironmentVariable(
  "RESEND_NEWSLETTER_SEGMENT_ID",
);

export const newsletterTopicId = requireEnvironmentVariable(
  "RESEND_NEWSLETTER_TOPIC_ID",
);

export function getNewsletterSigningSecret() {
  return requireEnvironmentVariable("NEWSLETTER_SIGNING_SECRET");
}

export function getSiteUrl() {
  return requireEnvironmentVariable("SITE_URL").replace(/\/+$/, "");
}
