type PublicationLinkInput = {
  deliveryType: "external" | "file";
  externalUrl: string | null;
  file: {
    asset: {
      url: string;
      originalFilename: string | null;
    } | null;
  } | null;
};

export function getPublicationHref(item: PublicationLinkInput) {
  if (item.deliveryType === "external") {
    return item.externalUrl;
  }

  const asset = item.file?.asset;

  if (!asset?.url) {
    return null;
  }

  const filename = asset.originalFilename ?? "IAHL-publication.pdf";
  const separator = asset.url.includes("?") ? "&" : "?";

  return `${asset.url}${separator}dl=${encodeURIComponent(filename)}`;
}

export function isExternalPublication(item: PublicationLinkInput) {
  return item.deliveryType === "external";
}
