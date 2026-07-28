import {
  Location01Icon,
  Mail01Icon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ContactForm } from "@/components/get-involved/contact-form";

const contactDetails = [
  {
    label: "Email",
    value: "hello@iahl.org",
    href: "mailto:hello@iahl.org",
    icon: Mail01Icon,
  },
  {
    label: "Telephone",
    value: "+254 XXX XXX XXX",
    href: "tel:+254XXXXXXXXX",
    icon: TelephoneIcon,
  },
  {
    label: "Office",
    value: "Nairobi, Kenya",
    icon: Location01Icon,
  },
];

export function PartnershipInquiry() {
  return (
    <section className="bg-secondary py-14 sm:py-18 lg:py-20">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <div className="overflow-hidden rounded-xl border border-border bg-[#fffdf8] shadow-[0_24px_70px_rgba(53,54,58,0.08)]">
          <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
            <div className="relative overflow-hidden border-b border-border px-6 py-9 sm:px-9 sm:py-11 lg:border-r lg:border-b-0 lg:px-10 lg:py-12">
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 size-52 rounded-full border-30 border-(--purple)/7"
                aria-hidden="true"
              />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Contact IAHL
                </p>

                <h2 className="mt-3 max-w-md text-balance text-4xl leading-tight font-bold sm:text-5xl">
                  Start a conversation.
                </h2>

                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  Contact us about a research question, partnership or
                  opportunity to work together.
                </p>

                <address className="mt-9 grid gap-6 not-italic">
                  {contactDetails.map((detail) => {
                    const content = (
                      <>
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--purple)/8 text-(--purple)">
                          <HugeiconsIcon
                            icon={detail.icon}
                            className="size-5"
                            aria-hidden="true"
                          />
                        </span>

                        <span>
                          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            {detail.label}
                          </span>

                          <span className="mt-1 block font-bold text-foreground">
                            {detail.value}
                          </span>
                        </span>
                      </>
                    );

                    return detail.href ? (
                      <a
                        key={detail.label}
                        href={detail.href}
                        className="flex items-center gap-4 rounded-md outline-none transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={detail.label}
                        className="flex items-center gap-4"
                      >
                        {content}
                      </div>
                    );
                  })}
                </address>
              </div>
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
