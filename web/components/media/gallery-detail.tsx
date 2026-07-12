import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { MULTIMEDIA_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type MultimediaItem = NonNullable<MULTIMEDIA_BY_SLUG_QUERY_RESULT>;

type GalleryImages = NonNullable<MultimediaItem["galleryImages"]>;

type GalleryDetailProps = {
  images: GalleryImages;
};

function getGalleryClass(index: number, total: number) {
  if (total === 2) {
    return "";
  }

  if (index === 0 || index === total - 1) {
    return "sm:col-span-2";
  }

  return "";
}

export function GalleryDetail({ images }: GalleryDetailProps) {
  const validImages = images.filter((image) => image.asset);

  if (validImages.length < 2) {
    return null;
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-x-4 gap-y-8 sm:grid-cols-2">
        {validImages.map((image, index) => {
          const className = getGalleryClass(index, validImages.length);

          const imageUrl = urlForImage(image)
            .width(className ? 1600 : 900)
            .height(className ? 800 : 675)
            .fit("crop")
            .auto("format")
            .url();

          return (
            <figure key={image._key} className={className}>
              <div
                className={`relative overflow-hidden rounded-lg bg-muted ${
                  className ? "aspect-2/1" : "aspect-4/3"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={image.alt}
                  fill
                  sizes={
                    className
                      ? "(max-width: 1180px) 92vw, 1180px"
                      : "(max-width: 640px) 92vw, 46vw"
                  }
                  className="object-cover"
                  placeholder={image.lqip ? "blur" : "empty"}
                  blurDataURL={image.lqip ?? undefined}
                />
              </div>

              {image.caption || image.credit ? (
                <figcaption className="mt-3 flex max-w-2xl flex-col gap-1 text-sm leading-6 text-muted-foreground sm:flex-row sm:justify-between">
                  {image.caption ? <span>{image.caption}</span> : null}

                  {image.credit ? <span>Credit: {image.credit}</span> : null}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
