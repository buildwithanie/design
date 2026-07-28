import "server-only";

import { render, toPlainText } from "react-email";

import { ContactInquiryEmail } from "@/components/emails/contact-inquiry-email";
import {
  createSmtpTransport,
  getRequiredEmailEnvironmentVariable,
} from "@/lib/email/smtp";
import type { ContactInquiry } from "@/lib/validation/contact-inquiry";

const smtpUsername = getRequiredEmailEnvironmentVariable("CONTACT_SMTP_USER");
const smtpPassword = getRequiredEmailEnvironmentVariable(
  "CONTACT_SMTP_PASSWORD",
);
const fromEmail = getRequiredEmailEnvironmentVariable("CONTACT_FROM_EMAIL");
const toEmail = getRequiredEmailEnvironmentVariable("CONTACT_TO_EMAIL");

const contactTransporter = createSmtpTransport(smtpUsername, smtpPassword);

const interestLabels: Record<ContactInquiry["interest"], string> = {
  research: "Research collaboration",
  community: "Community partnership",
  institutional: "Institutional support",
  general: "General inquiry",
};

export async function sendContactInquiry(inquiry: ContactInquiry) {
  const submittedAt = new Date();

  const html = await render(
    <ContactInquiryEmail inquiry={inquiry} submittedAt={submittedAt} />,
  );

  const text = toPlainText(html);

  await contactTransporter.sendMail({
    from: `IAHL Website <${fromEmail}>`,
    to: toEmail,
    replyTo: inquiry.email,
    subject: `Website inquiry: ${interestLabels[inquiry.interest]}`,
    html,
    text,
  });
}
