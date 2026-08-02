"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import type { MULTIMEDIA_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type MultimediaItem = NonNullable<MULTIMEDIA_BY_SLUG_QUERY_RESULT>;
type GalleryImages = NonNullable<MultimediaItem["galleryImages"]>;

type GalleryDetailProps = {
  images: GalleryImages;
};

export function GalleryDetail({ images }: GalleryDetailProps) {
  const validImages = images.filter((image) => image.asset);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentImage = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCurrentImage();
    carouselApi.on("select", updateCurrentImage);
    carouselApi.on("reInit", updateCurrentImage);

    return () => {
      carouselApi.off("select", updateCurrentImage);
      carouselApi.off("reInit", updateCurrentImage);
    };
  }, [carouselApi]);

  if (validImages.length < 2) {
    return null;
  }

  function openImage(index: number) {
    setCurrentIndex(index);
    dialogRef.current?.showModal();

    requestAnimationFrame(() => {
      carouselApi?.reInit();
      carouselApi?.scrollTo(index, true);
    });
  }

  function closeViewer() {
    dialogRef.current?.close();
  }

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-14">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {validImages.map((image, index) => {
            const imageUrl = urlForImage(image)
              .width(900)
              .height(675)
              .fit("crop")
              .auto("format")
              .url();

            return (
              <button
                key={image._key}
                type="button"
                onClick={() => openImage(index)}
                className="group relative aspect-4/3 overflow-hidden rounded-md bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                aria-label={`Open photograph ${index + 1}${image.alt ? `: ${image.alt}` : ""}`}
              >
                <Image
                  src={imageUrl}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  placeholder={image.lqip ? "blur" : "empty"}
                  blurDataURL={image.lqip ?? undefined}
                />

              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Gallery image viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeViewer();
          }
        }}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-4 text-foreground backdrop:bg-black/85 sm:p-8"
      >
        <div className="mx-auto flex min-h-full w-full max-w-6xl items-center">
          <div className="w-full overflow-hidden rounded-lg bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold tabular-nums text-muted-foreground">
                {currentIndex + 1} of {validImages.length}
              </p>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={closeViewer}
              >
                Close
              </Button>
            </div>

            <Carousel
              setApi={setCarouselApi}
              opts={{ loop: validImages.length > 1 }}
              className="w-full"
            >
              <CarouselContent className="ms-0">
                {validImages.map((image, index) => {
                  const imageUrl = urlForImage(image)
                    .width(1800)
                    .fit("max")
                    .auto("format")
                    .url();

                  return (
                    <CarouselItem
                      key={image._key}
                      className="ps-0"
                      aria-label={`Photograph ${index + 1} of ${validImages.length}`}
                    >
                      <figure>
                        <div className="relative h-[min(68dvh,48rem)] bg-black">
                          <Image
                            src={imageUrl}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1280px) 100vw, 1152px"
                            className="object-contain"
                            placeholder={image.lqip ? "blur" : "empty"}
                            blurDataURL={image.lqip ?? undefined}
                          />
                        </div>

                        {image.caption || image.credit ? (
                          <figcaption className="flex flex-col gap-1 px-4 py-4 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-6">
                            {image.caption ? (
                              <span className="max-w-3xl text-foreground">
                                {image.caption}
                              </span>
                            ) : (
                              <span />
                            )}

                            {image.credit ? (
                              <span className="shrink-0">
                                Credit: {image.credit}
                              </span>
                            ) : null}
                          </figcaption>
                        ) : null}
                      </figure>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="start-3! border-white/20 bg-black/55 text-white hover:bg-black/75 hover:text-white sm:start-5!" />
              <CarouselNext className="end-3! border-white/20 bg-black/55 text-white hover:bg-black/75 hover:text-white sm:end-5!" />
            </Carousel>
          </div>
        </div>
      </dialog>
    </section>
  );
}
