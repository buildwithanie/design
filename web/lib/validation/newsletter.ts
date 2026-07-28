import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export type NewsletterFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  values?: {
    email: string;
  };
  errors?: {
    email?: string[];
  };
};
