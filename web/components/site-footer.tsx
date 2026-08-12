import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "./newsletter/newsletter-form";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Media Center", href: "/media" },
  { label: "Get involved", href: "/get-involved" },
] as const;

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-(--charcoal) text-white">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.1fr_0.65fr_1fr] lg:gap-14">
        <div>
          <Image
            src="/images/iahl-logo.jpeg"
            alt="Innovate AI HealthLab logo"
            width={176}
            height={129}
            className="h-24 w-auto rounded-md bg-white object-contain shadow-sm"
          />

          <p className="mt-6 max-w-md leading-7 text-white/70">
            Advancing health research through AI, innovation, and strategic
            partnerships for equitable health outcomes.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-bold">Explore</h2>

          <div className="mt-4 grid gap-2">
            {footerLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-sm text-white/70 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <NewsletterForm />
      </div>

      <Copyright />
    </footer>
  );
}

async function Copyright() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <div className="border-t border-white/10">
      <p className="mx-auto w-[min(1180px,92vw)] py-5 text-sm text-white/60">
        © {year} Innovate AI HealthLab. All rights reserved.
      </p>
    </div>
  );
}
