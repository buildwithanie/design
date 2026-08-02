import { stegaClean } from "@sanity/client/stega";
import {
  Call02Icon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ContactForm } from "@/components/get-involved/contact-form";
import type { GET_INVOLVED_PAGE_QUERY_RESULT } from "@/sanity.types";

type GetInvolvedContent = NonNullable<GET_INVOLVED_PAGE_QUERY_RESULT["page"]>;
type OrganizationDetails = NonNullable<
  GET_INVOLVED_PAGE_QUERY_RESULT["organization"]
>;

type PartnershipInquiryProps = {
  content: GetInvolvedContent;
  organization: OrganizationDetails;
};

export function PartnershipInquiry({
  content,
  organization,
}: PartnershipInquiryProps) {
  const email = stegaClean(organization.publicEmail);
  const phone = organization.phone ? stegaClean(organization.phone) : undefined;

  const contactDetails = [
    {
      label: "Email",
      value: organization.publicEmail,
      href: `mailto:${email}`,
      icon: Mail01Icon,
    },
    {
      label: "Postal address",
      value: organization.postalAddress,
      href: undefined,
      icon: Location01Icon,
    },
    ...(phone
      ? [
          {
            label: "Telephone",
            value: organization.phone,
            href: `tel:${phone.replace(/[^+\d]/g, "")}`,
            icon: Call02Icon,
          },
        ]
      : []),
  ];

  return (
    <section className="bg-secondary pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <div className="overflow-hidden rounded-xl border border-border bg-[#fffdf8] shadow-[0_24px_70px_rgba(53,54,58,0.08)]">
          <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
            <div className="relative overflow-hidden border-b border-border px-6 py-9 sm:px-9 sm:py-11 lg:border-r lg:border-b-0 lg:px-10 lg:py-12">
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 size-52 rounded-full border-30 border-(--purple)/7"
                aria-hidden="true"
              />

              <div className="relative">
                <h2 className="max-w-md text-balance text-4xl leading-tight font-bold sm:text-5xl">
                  {content.inquiryHeading}
                </h2>

                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  {content.inquiryDescription}
                </p>

                <address className="mt-9 grid gap-6 not-italic">
                  {contactDetails.map((detail) => {
                    const detailContent = (
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
                        {detailContent}
                      </a>
                    ) : (
                      <div
                        key={detail.label}
                        className="flex items-center gap-4"
                      >
                        {detailContent}
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
