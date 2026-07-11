import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { ClientForm } from "@/components/client-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Our work", href: "/work" },
      { label: "Projects", href: "/projects" },
      { label: "Media center", href: "/media" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Partnerships", href: "/get-involved#partner" },
      { label: "Careers", href: "/get-involved#careers" },
      { label: "Contact", href: "/get-involved#contact" },
      { label: "Newsletter", href: "/media#newsletter" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-(--charcoal) text-white">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
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

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <nav aria-label={`${group.title} links`} key={group.title}>
              <h2 className="font-bold">{group.title}</h2>

              <div className="mt-4 grid gap-2">
                {group.links.map((link) => (
                  <Link
                    className="text-sm text-white/70 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}

          <ClientForm>
            <h2 className="font-bold">Stay updated</h2>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Receive IAHL news and research updates.
            </p>

            <div className="mt-4 grid gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11 border-white/20 bg-white text-foreground"
              />

              <Button type="submit" className="h-11">
                Sign up
                <CheckCircle2 className="size-4" />
              </Button>
            </div>
          </ClientForm>
        </div>
      </div>
    </footer>
  );
}
