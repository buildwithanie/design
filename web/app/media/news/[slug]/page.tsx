import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const article = {
  slug: "responsible-ai-needs-more-than-good-technology",
  type: "Research insight",
  publishedAt: "July 2026",
  title: "Responsible AI needs more than good technology",
  summary:
    "Governance, community knowledge, and human oversight must shape how artificial intelligence is introduced into health research.",
  image: "/images/iahl-media-meeting.png",
  imageAlt:
    "IAHL researchers and partners discussing the use of evidence and technology in health research",
  imageCaption:
    "Researchers and partners examining the decisions that surround the use of AI in health research.",
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== article.slug) {
    return {
      title: "News item not found | IAHL",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${article.title} | IAHL`;

  return {
    title,
    description: article.summary,
    openGraph: {
      title,
      description: article.summary,
      type: "article",
      siteName: "Innovate AI HealthLab",
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.summary,
      images: [article.image],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  if (slug !== article.slug) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <header className="border-b border-border bg-secondary pt-28 pb-10 md:pt-32 md:pb-14">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <Link
              href="/media/news"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "-ml-3 text-muted-foreground",
              })}
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                className="size-4"
                aria-hidden="true"
              />
              All news
            </Link>

            <div className="mx-auto mt-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                <span className="text-primary">{article.type}</span>

                <span className="text-muted-foreground/60" aria-hidden="true">
                  /
                </span>

                <time className="text-muted-foreground">
                  {article.publishedAt}
                </time>
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {article.summary}
              </p>
            </div>
          </div>
        </header>

        <section className="pt-8 sm:pt-10">
          <figure className="mx-auto w-[min(1180px,92vw)]">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-2/1 lg:aspect-5/2">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="92vw"
                className="object-cover"
              />
            </div>

            <figcaption className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              {article.imageCaption}
            </figcaption>
          </figure>
        </section>

        <section className="pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <div className="typeset typeset-project mx-auto max-w-[80ch]">
              <p>
                Artificial intelligence is often discussed as if better
                technical performance will automatically produce better health
                decisions. In practice, the quality of the technology is only
                one part of the question.
              </p>

              <p>
                Research teams must also decide whose knowledge informs the
                system, which risks are considered important, how decisions can
                be challenged, and who remains accountable when technology
                influences care or research.
              </p>

              <h2>Technology enters an existing system</h2>

              <p>
                AI does not arrive in an empty environment. It enters health
                systems shaped by unequal access to care, incomplete data,
                limited resources, and different levels of trust between
                institutions and communities.
              </p>

              <p>
                A model may perform well during testing and still create
                problems when introduced into a setting that was not represented
                in its development. Responsible implementation therefore begins
                before a model is selected or deployed.
              </p>

              <blockquote>
                The important question is not only whether a system works, but
                whether people can understand, question, and safely use the
                decisions it helps produce.
              </blockquote>

              <h2>Community knowledge changes the questions</h2>

              <p>
                Community involvement should not be limited to explaining a
                completed technology. People who experience the health system
                can identify barriers, unintended consequences, and practical
                realities that may not appear in technical datasets.
              </p>

              <p>
                That knowledge can influence the research question itself. It
                can also shape what researchers measure, how they interpret
                findings, and what safeguards should accompany implementation.
              </p>

              <figure>
                <Image
                  src="/images/community-partnership-conversation.png"
                  alt="A researcher listening during a conversation with a community partner"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 900px) 92vw, 760px"
                  className="h-auto w-full rounded-lg object-cover"
                />

                <figcaption>
                  Community perspectives can reveal risks and priorities that
                  are not visible in technical data alone.
                </figcaption>
              </figure>

              <h2>Human oversight must be meaningful</h2>

              <p>
                Keeping a person in the decision-making process is not enough if
                that person lacks the information, authority, or confidence
                required to challenge a system’s output.
              </p>

              <p>Meaningful oversight requires:</p>

              <ul>
                <li>
                  Clear responsibility for decisions and their consequences.
                </li>
                <li>
                  Information that allows researchers and practitioners to
                  understand the limits of a system.
                </li>
                <li>
                  A practical way for communities and professionals to raise
                  concerns.
                </li>
                <li>
                  Continued monitoring after a tool enters real-world use.
                </li>
              </ul>

              <h2>A broader standard for responsible AI</h2>

              <p>
                Responsible AI in health research is not a final checklist
                completed before deployment. It is an ongoing practice that
                connects technical quality with governance, local knowledge,
                transparency, and accountability.
              </p>

              <p>
                The strongest systems will not simply produce accurate outputs.
                They will operate within research relationships and institutions
                capable of examining how those outputs affect people.
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
