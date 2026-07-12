type NewsLinkInput = {
  destination: "external" | "internal";
  slug: string | null;
  externalUrl: string | null;
};

export function getNewsHref(item: NewsLinkInput) {
  if (item.destination === "external") {
    return item.externalUrl;
  }

  return item.slug ? `/media/news/${item.slug}` : null;
}

export function isExternalNews(item: NewsLinkInput) {
  return item.destination === "external";
}
