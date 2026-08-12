import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import type { SITEMAP_QUERY_RESULT } from "@/sanity.types";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
  { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.9 },
  { url: absoluteUrl("/projects"), changeFrequency: "weekly", priority: 0.9 },
  { url: absoluteUrl("/media"), changeFrequency: "weekly", priority: 0.8 },
  {
    url: absoluteUrl("/get-involved"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("hours");

  const { data } = await sanityFetch({
    query: SITEMAP_QUERY,
    perspective: "published",
    stega: false,
  });

  const content = data as SITEMAP_QUERY_RESULT;

  return [
    ...staticRoutes,
    ...content.projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...content.news.map((article) => ({
      url: absoluteUrl(`/media/news/${article.slug}`),
      lastModified: article._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...content.multimedia.map((item) => ({
      url: absoluteUrl(`/media/multimedia/${item.slug}`),
      lastModified: item._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
