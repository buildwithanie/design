import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";
import type { PROJECT_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Project = NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>;
type ProjectBody = NonNullable<Project["body"]>;
type ProjectImage = Extract<ProjectBody[number], { _type: "projectImage" }>;

type ProjectLink = {
  href?: string;
  openInNewTab?: boolean;
};

function ProjectImageBlock({ value }: { value: ProjectImage }) {
  const width = value.dimensions?.width;
  const height = value.dimensions?.height;

  if (!value.asset || !width || !height) {
    return null;
  }

  return (
    <figure className="not-typeset my-10">
      <div className="overflow-hidden rounded-2xl bg-muted">
        <Image
          src={urlForImage(value).width(1400).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          width={width}
          height={height}
          sizes="(min-width: 768px) 68ch, 92vw"
          className="h-auto w-full object-cover"
          placeholder={value.lqip ? "blur" : "empty"}
          blurDataURL={value.lqip ?? undefined}
        />
      </div>

      {value.caption || value.credit ? (
        <figcaption className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          {value.caption ? <span>{value.caption}</span> : null}
          {value.credit ? <span>Credit: {value.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    projectImage: ({ value }) => (
      <ProjectImageBlock value={value as ProjectImage} />
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const { href, openInNewTab } = (value ?? {}) as ProjectLink;

      if (!href) {
        return <>{children}</>;
      }

      if (href.startsWith("/")) {
        return <Link href={href}>{children}</Link>;
      }

      const isAllowedExternalLink =
        href.startsWith("https://") ||
        href.startsWith("http://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (!isAllowedExternalLink) {
        return <>{children}</>;
      }

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

type ProjectPortableTextProps = {
  value: ProjectBody;
};

export function ProjectPortableText({ value }: ProjectPortableTextProps) {
  if (value.length === 0) {
    return null;
  }

  return (
    <article className="typeset typeset-project mx-auto max-w-[68ch]">
      <PortableText value={value} components={portableTextComponents} />
    </article>
  );
}
