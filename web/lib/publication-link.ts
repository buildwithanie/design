import { stegaClean, type StegaString } from "@sanity/client/stega";

type PublicationLinkInput = {
  deliveryType:
    | "external"
    | "file"
    | StegaString<"external">
    | StegaString<"file">;
  externalUrl: string | null;
  file: {
    asset: {
      url: string;
    } | null;
  } | null;
};

export function getPublicationHref(item: PublicationLinkInput) {
  if (stegaClean(item.deliveryType) === "external") {
    return item.externalUrl;
  }

  return item.file?.asset?.url ?? null;
}

export function isExternalPublication(item: PublicationLinkInput) {
  return stegaClean(item.deliveryType) === "external";
}
