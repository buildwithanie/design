import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(80, "Name is too long."),

  email: z.email("Enter a valid email address."),

  organization: z.string().trim().max(120, "Organisation name is too long."),

  interest: z.enum(
    ["research", "community", "institutional", "general"],
    "Select an area of interest.",
  ),

  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your inquiry.")
    .max(2000, "Message is too long."),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export type ContactFormValues = {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
};

export type ContactFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  values?: ContactFormValues;
  errors?: Partial<Record<keyof ContactFormValues, string[]>>;
};
