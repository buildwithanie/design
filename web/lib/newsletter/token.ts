import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { getNewsletterSigningSecret } from "@/lib/newsletter/resend";
import { newsletterSchema } from "@/lib/validation/newsletter";

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

type NewsletterTokenPayload = {
  email: string;
  expiresAt: number;
};

function sign(payload: string) {
  return createHmac("sha256", getNewsletterSigningSecret())
    .update(payload)
    .digest("base64url");
}

export function createNewsletterToken(email: string) {
  const payload: NewsletterTokenPayload = {
    email,
    expiresAt: Date.now() + TOKEN_LIFETIME_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyNewsletterToken(token: string) {
  const [encodedPayload, providedSignature, extraPart] = token.split(".");

  if (!encodedPayload || !providedSignature || extraPart) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<NewsletterTokenPayload>;

    const emailResult = newsletterSchema.safeParse({ email: payload.email });

    if (
      !emailResult.success ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return {
      email: emailResult.data.email,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}
