import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";
import type {
  NEWS_BY_SLUG_QUERY_RESULT,
  PROJECT_BY_SLUG_QUERY_RESULT,
} from "@/sanity.types";

type ProjectContent = NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>;
type NewsContent = NonNullable<NEWS_BY_SLUG_QUERY_RESULT>;

type ProjectBody = NonNullable<ProjectContent["body"]>;
type NewsBody = NonNullable<NewsContent["body"]>;

type ContentBody = ProjectBody | NewsBody;

type ContentImage = Extract<ContentBody[number], { _type: "contentImage" }>;
type ContentImageGallery = Extract<
  ContentBody[number],
  { _type: "contentImageGallery" }
>;

type GalleryImage = ContentImageGallery["images"][number];

type ContentLink = {
  href?: string;
  openInNewTab?: boolean;
};
function ContentImageBlock({ value }: { value: ContentImage }) {
  const width = value.dimensions?.width;
  const height = value.dimensions?.height;

  if (!value.asset || !width || !height) {
    return null;
  }

  return (
    <figure className="not-typeset mx-auto my-9 max-w-[68ch]">
      <div className="overflow-hidden rounded-xl bg-muted">
        <Image
          src={urlForImage(value).width(1100).fit("max").auto("format").url()}
          alt={value.alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 68ch, 92vw"
          className="h-auto w-full"
          placeholder={value.lqip ? "blur" : "empty"}
          blurDataURL={value.lqip ?? undefined}
        />
      </div>

      {value.caption || value.credit ? (
        <figcaption className="mt-3 flex flex-col gap-1 text-sm leading-6 text-muted-foreground sm:flex-row sm:justify-between">
          {value.caption ? <span>{value.caption}</span> : null}
          {value.credit ? <span>Credit: {value.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function GalleryImageItem({ image }: { image: GalleryImage }) {
  if (!image.asset) {
    return null;
  }

  return (
    <figure>
      <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
        <Image
          src={urlForImage(image)
            .width(900)
            .height(675)
            .fit("crop")
            .auto("format")
            .url()}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw"
          className="object-cover"
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip ?? undefined}
        />
      </div>

      {image.caption || image.credit ? (
        <figcaption className="mt-2 text-sm leading-6 text-muted-foreground">
          {image.caption ? <span>{image.caption}</span> : null}

          {image.caption && image.credit ? (
            <span aria-hidden="true"> · </span>
          ) : null}

          {image.credit ? <span>Credit: {image.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ContentImageGalleryBlock({ value }: { value: ContentImageGallery }) {
  const images = value.images.filter((image) => image.asset);

  if (images.length === 0) {
    return null;
  }

  const gridClass =
    images.length === 2
      ? "sm:grid-cols-2"
      : images.length === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div
      className={`not-typeset mx-auto my-10 grid max-w-[76ch] gap-5 ${gridClass}`}
    >
      {images.map((image) => (
        <GalleryImageItem key={image._key} image={image} />
      ))}
    </div>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    contentImage: ({ value }) => (
      <ContentImageBlock value={value as ContentImage} />
    ),

    contentImageGallery: ({ value }) => (
      <ContentImageGalleryBlock value={value as ContentImageGallery} />
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const { href, openInNewTab } = (value ?? {}) as ContentLink;

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

type ContentPortableTextProps = {
  value: ContentBody;
};

export function ContentPortableText({ value }: ContentPortableTextProps) {
  if (value.length === 0) {
    return null;
  }

  return (
    <div className="typeset typeset-content mx-auto max-w-[80ch]">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
