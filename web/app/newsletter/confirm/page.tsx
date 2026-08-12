import type { Metadata } from "next";

import { confirmNewsletterSubscription } from "@/app/actions/newsletter";
import { buttonVariants } from "@/components/ui/button";
import { verifyNewsletterToken } from "@/lib/newsletter/token";

export const metadata: Metadata = {
  title: "Confirm newsletter subscription | IAHL",
  robots: {
    index: false,
    follow: false,
  },
};

type NewsletterConfirmationPageProps = {
  searchParams: Promise<{
    token?: string;
    error?: string;
  }>;
};

export default async function NewsletterConfirmationPage({
  searchParams,
}: NewsletterConfirmationPageProps) {
  const { token = "", error } = await searchParams;
  const payload = token ? verifyNewsletterToken(token) : null;

  if (!payload) {
    return (
      <main className="flex min-h-[72dvh] items-center bg-secondary pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-primary">IAHL newsletter</p>

            <h1 className="mt-5 text-balance text-4xl leading-[1.05] font-bold sm:text-5xl">
              This confirmation link is no longer valid.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              The link may have expired or already been replaced. Enter your
              email in the website footer to request a new one.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[72dvh] items-center bg-secondary pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-primary">IAHL newsletter</p>

          <h1 className="mt-5 text-balance text-4xl leading-[1.05] font-bold sm:text-5xl">
            Confirm your subscription.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Receive IAHL research news, publications, project updates and
            opportunities.
          </p>

          {error === "service" ? (
            <p
              role="alert"
              className="mt-5 text-sm font-semibold text-destructive"
            >
              We could not complete the subscription. Please try again.
            </p>
          ) : null}

          <form action={confirmNewsletterSubscription} className="mt-8">
            <input type="hidden" name="token" value={token} />

            <button
              type="submit"
              className={buttonVariants({
                size: "lg",
                className: "h-11 px-5",
              })}
            >
              Confirm subscription
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
