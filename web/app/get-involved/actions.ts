"use server";

import { z } from "zod";

import { sendContactInquiry } from "@/lib/email/send-contact-inquiry";
import {
  contactInquirySchema,
  type ContactFormState,
  type ContactFormValues,
} from "@/lib/validation/contact-inquiry";

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}

export async function submitContactInquiry(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    name: getFormValue(formData, "name"),
    email: getFormValue(formData, "email"),
    organization: getFormValue(formData, "organization"),
    interest: getFormValue(formData, "interest"),
    message: getFormValue(formData, "message"),
  };

  const result = contactInquirySchema.safeParse(values);

  if (!result.success) {
    const errorTree = z.treeifyError(result.error);

    return {
      status: "error",
      message: "Please check the highlighted fields.",
      values,
      errors: {
        name: errorTree.properties?.name?.errors,
        email: errorTree.properties?.email?.errors,
        organization: errorTree.properties?.organization?.errors,
        interest: errorTree.properties?.interest?.errors,
        message: errorTree.properties?.message?.errors,
      },
    };
  }

  try {
    await sendContactInquiry(result.data);
  } catch (error) {
    console.error("Contact inquiry email delivery failed.", error);

    return {
      status: "error",
      message:
        "We could not send your inquiry at the moment. Please try again.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you. Your inquiry has been sent to IAHL.",
  };
}
