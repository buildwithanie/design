import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Innovate AI HealthLab collects, uses, protects, and shares personal information through this website.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information we collect",
    content: (
      <>
        <p>We collect personal information only when you choose to provide it:</p>
        <ul>
          <li>
            Contact inquiries: your name, email address, organization, area of
            interest, and message.
          </li>
          <li>Newsletter subscriptions: your email address.</li>
          <li>
            Analytics data: information such as pages viewed, approximate
            location, device and browser information, and interaction data—but
            only if you accept analytics.
          </li>
        </ul>
        <p>
          Our hosting and security providers may also process basic technical
          information such as IP addresses, request times, and browser details
          to operate and protect the website.
        </p>
      </>
    ),
  },
  {
    title: "How we use information",
    content: (
      <ul>
        <li>To respond to inquiries and explore possible collaboration.</li>
        <li>To send IAHL updates after you confirm your subscription.</li>
        <li>To operate, secure, maintain, and improve the website.</li>
        <li>
          To understand website use in aggregate when analytics consent is
          granted.
        </li>
      </ul>
    ),
  },
  {
    title: "When we share information",
    content: (
      <>
        <p>
          We may share information with service providers that support our
          website, communications, email delivery, analytics, and security.
          They may use the information only to provide services to IAHL or as
          required by law.
        </p>
        <p>
          Some providers may process information outside Kenya. Where this
          occurs, we take reasonable steps to ensure appropriate safeguards are
          in place. We do not sell personal information.
        </p>
      </>
    ),
  },
  {
    title: "Cookies and analytics",
    content: (
      <>
        <p>
          With your consent, we use Google Analytics and similar technologies to
          understand how visitors use the website and to help improve its
          content and performance. This may include information about pages
          visited, browser or device type, approximate location, and how the
          website was reached.
        </p>
        <p>
          Analytics is optional and is not activated unless you accept it. You
          can change your choice at any time through “Privacy settings” in the
          footer.
        </p>
      </>
    ),
  },
  {
    title: "Newsletter choices",
    content: (
      <p>
        Newsletter signup uses confirmation before an address is added to the
        IAHL mailing list. Every newsletter includes an unsubscribe option, and
        you can withdraw your subscription at any time.
      </p>
    ),
  },
  {
    title: "Retention and security",
    content: (
      <>
        <p>
          We keep contact inquiries for as long as reasonably needed to respond,
          manage the relationship, and meet legal or administrative needs.
          Newsletter details are retained until you unsubscribe or request
          deletion, subject to records needed to honour an opt-out. Other
          information is kept only for as long as necessary for the purpose for
          which it was collected and any applicable legal requirements.
        </p>
        <p>
          IAHL uses reasonable organizational and technical safeguards, but no
          internet transmission or storage system can be guaranteed completely
          secure.
        </p>
      </>
    ),
  },
  {
    title: "Your rights",
    content: (
      <>
        <p>
          Subject to Kenyan data-protection law, you may ask to be informed
          about the use of your personal data, access it, correct inaccurate
          information, object to certain processing, request deletion where
          applicable, or withdraw consent.
        </p>
        <p>
          Contact IAHL first so we can respond to your request. You may also
          raise a complaint with Kenya&apos;s{" "}
          <a
            href="https://www.odpc.go.ke/"
            target="_blank"
            rel="noreferrer"
          >
            Office of the Data Protection Commissioner
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Contact us",
    content: (
      <address className="not-italic">
        <p>Innovate AI HealthLab</p>
        <p>P.O. Box 408 – 10200, Murang&apos;a, Kenya</p>
        <p>
          <a href="mailto:info@innovateaihealthlab.co.ke">
            info@innovateaihealthlab.co.ke
          </a>
        </p>
      </address>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="bg-background pt-24">
      <header className="border-y border-border bg-secondary">
        <div className="mx-auto w-[min(960px,92vw)] py-12 sm:py-14">
          <h1 className="text-4xl leading-[1.05] font-bold sm:text-6xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated 12 August 2026
          </p>
        </div>
      </header>

      <div className="mx-auto grid w-[min(960px,92vw)] gap-10 py-14 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-18">
        <nav aria-label="Privacy policy contents" className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm font-bold">On this page</p>
          <ol className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {sections.map((section) => (
              <li key={section.title}>
                <Link
                  href={`#${section.title.toLowerCase().replaceAll(" ", "-")}`}
                  className="transition hover:text-foreground"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <article className="divide-y divide-border">
          {sections.map((section) => (
            <section
              id={section.title.toLowerCase().replaceAll(" ", "-")}
              key={section.title}
              className="scroll-mt-32 py-8 first:pt-0 last:pb-0"
            >
              <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>
              <div className="mt-4 grid gap-4 text-[15px] leading-7 text-muted-foreground [&_a]:font-semibold [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
