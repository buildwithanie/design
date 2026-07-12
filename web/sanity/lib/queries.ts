import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    _id,

    heroHeadline,
    heroHighlightedText,
    heroDescription,
    heroImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },

    researchHeading,
    researchDescription,
    researchMapImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },
    researchParticipants[] {
      _key,
      title,
      description,
      image {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      }
    },

    visionStatement,
    missionStatement,

    featuredProjectsHeading,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      status,
      summary,
      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      },
      areaOfWork-> {
        title,
        "slug": slug.current
      },
      projectType-> {
        title,
        "slug": slug.current
      }
    },

    mediaLabel,
    mediaHeading,

    "latestNews": *[
      _type == "newsItem" &&
      defined(publishedAt) &&
      defined(coverImage.asset) &&
      defined(newsType._ref) &&
      (
        destination == "internal" && defined(slug.current) ||
        destination == "external" && defined(externalUrl)
      )
    ]
      | order(publishedAt desc, _id asc)[0...3] {
        _id,
        destination,
        title,
        "slug": slug.current,
        summary,
        publishedAt,
        externalSource,
        externalUrl,

        newsType-> {
          title,
          "slug": slug.current
        },

        coverImage {
          asset,
          crop,
          hotspot,
          decorative,
          alt,
          "lqip": asset->metadata.lqip
        }
      },

    approachLabel,
    approachHeading,
    approachValues[] {
      _key,
      title,
      description,
      image {
        asset,
        crop,
        hotspot,
        decorative,
        alt,
        "lqip": asset->metadata.lqip
      }
    }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      status,
      summary,
      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      },
      areaOfWork-> {
        title,
        "slug": slug.current
      },
      projectType-> {
        title,
        "slug": slug.current
      }
    }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    summary,

    coverImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },

    areaOfWork-> {
      title,
      "slug": slug.current
    },

    projectType-> {
      title,
      "slug": slug.current
    },

    body[] {
      ...,

      _type == "contentImage" => {
        ...,
        asset,
        alt,
        caption,
        credit,
        "dimensions": asset->metadata.dimensions,
        "lqip": asset->metadata.lqip
      },

      _type == "contentImageGallery" => {
        ...,

        images[] {
          ...,
          asset,
          alt,
          caption,
          credit,
          "dimensions": asset->metadata.dimensions,
          "lqip": asset->metadata.lqip
        }
      }
    }
  }
`);

export const PROJECTS_PAGE_QUERY = defineQuery(`
  *[
    _type == "projectsPage" &&
    _id == "projectsPage"
  ][0] {
    _id,
    introLabel,
    introHeading,
    introDescription,
    ctaLabel,
    ctaHeading,
    ctaLinkLabel
  }
`);

export const MEDIA_PAGE_QUERY = defineQuery(`
  *[
    _type == "mediaPage" &&
    _id == "mediaPage"
  ][0] {
    _id,
    introLabel,
    introHeading,
    introDescription,
    newsSectionLabel,
    newsSectionHeading,
    publicationsSectionLabel,
    publicationsSectionHeading,
    multimediaSectionLabel,
    multimediaSectionHeading,
    multimediaSectionDescription,

    featuredNews-> {
      _id,
      destination,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      externalSource,
      externalUrl,

      newsType-> {
        title,
        "slug": slug.current
      },

      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt,
        "lqip": asset->metadata.lqip
      }
    },

    "latestNews": *[
      _type == "newsItem" &&
      _id != ^.featuredNews._ref
    ]
      | order(publishedAt desc)[0...3] {
        _id,
        destination,
        title,
        "slug": slug.current,
        summary,
        publishedAt,
        externalSource,
        externalUrl,

        newsType-> {
          title,
          "slug": slug.current
        },

        coverImage {
          asset,
          crop,
          hotspot,
          decorative,
          alt,
          "lqip": asset->metadata.lqip
        }
      },

    "latestPublications": *[
      _type == "publication"
    ]
      | order(publishedAt desc)[0...3] {
        _id,
        title,
        publishedAt,
        deliveryType,
        externalUrl,
        externalSource,

        publicationType-> {
          title,
          "slug": slug.current
        },

        file {
          asset-> {
            _id,
            url,
            originalFilename,
            mimeType,
            size
          }
        }
      },

    "latestMultimedia": *[
      _type == "multimediaItem"
    ]
      | order(publishedAt desc)[0...4] {
        _id,
        mediaType,
        title,
        "slug": slug.current,
        summary,
        publishedAt,
        youtubeUrl,

        coverImage {
          asset,
          crop,
          hotspot,
          decorative,
          alt,
          "lqip": asset->metadata.lqip
        }
      }
  }
`);

export const NEWS_QUERY = defineQuery(`
  *[
    _type == "newsItem"
  ]
    | order(publishedAt desc) {
      _id,
      destination,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      externalSource,
      externalUrl,

      newsType-> {
        title,
        "slug": slug.current
      },

      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt,
        "lqip": asset->metadata.lqip
      }
    }
`);

export const NEWS_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "newsItem" &&
    destination == "internal" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,

    newsType-> {
      title,
      "slug": slug.current
    },

    coverImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    },

    body[] {
      ...,

      _type == "contentImage" => {
        ...,
        asset,
        alt,
        caption,
        credit,
        "dimensions": asset->metadata.dimensions,
        "lqip": asset->metadata.lqip
      },

      _type == "contentImageGallery" => {
        ...,

        images[] {
          ...,
          asset,
          alt,
          caption,
          credit,
          "dimensions": asset->metadata.dimensions,
          "lqip": asset->metadata.lqip
        }
      }
    }
  }
`);

export const PUBLICATIONS_QUERY = defineQuery(`
  *[
    _type == "publication"
  ]
    | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      deliveryType,
      externalUrl,
      externalSource,

      publicationType-> {
        title,
        "slug": slug.current
      },

      file {
        asset-> {
          _id,
          url,
          originalFilename,
          mimeType,
          size
        }
      }
    }
`);

export const MULTIMEDIA_QUERY = defineQuery(`
  *[
    _type == "multimediaItem"
  ]
    | order(publishedAt desc) {
      _id,
      mediaType,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      youtubeUrl,

      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt,
        "lqip": asset->metadata.lqip
      }
    }
`);

export const MULTIMEDIA_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "multimediaItem" &&
    slug.current == $slug
  ][0] {
    _id,
    mediaType,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    youtubeUrl,

    coverImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    },

    galleryImages[] {
      _key,
      asset,
      crop,
      hotspot,
      alt,
      caption,
      credit,
      "dimensions": asset->metadata.dimensions,
      "lqip": asset->metadata.lqip
    }
  }
`);

export const NEWS_PAGE_QUERY = defineQuery(`
  *[
    _type == "mediaPage" &&
    _id == "mediaPage"
  ][0] {
    newsArchiveLabel,
    newsArchiveHeading,
    newsArchiveDescription
  }
`);

export const PUBLICATIONS_PAGE_QUERY = defineQuery(`
  *[
    _type == "mediaPage" &&
    _id == "mediaPage"
  ][0] {
    publicationsArchiveLabel,
    publicationsArchiveHeading,
    publicationsArchiveDescription
  }
`);

export const MULTIMEDIA_PAGE_QUERY = defineQuery(`
  *[
    _type == "mediaPage" &&
    _id == "mediaPage"
  ][0] {
    multimediaArchiveLabel,
    multimediaArchiveHeading,
    multimediaArchiveDescription
  }
`);
