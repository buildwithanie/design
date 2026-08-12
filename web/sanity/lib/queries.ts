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

    "visionStatement": *[
      _type == "organizationDetails" &&
      _id == "organizationDetails"
    ][0].visionStatement,
    "missionStatement": *[
      _type == "organizationDetails" &&
      _id == "organizationDetails"
    ][0].missionStatement,

    featuredProjectsHeading,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      summary,
      "hasContent": defined(body[0]),
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
      }
    },

    mediaLabel,
    mediaHeading,

    "latestNews": *[
      _type == "newsItem" &&
      defined(publishedAt) &&
      defined(coverImage.asset) &&
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
    },

    getInvolvedLabel,
    getInvolvedHeading,
    getInvolvedDescription
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(title) &&
    defined(slug.current) &&
    defined(summary) &&
    defined(coverImage.asset) &&
    defined(areaOfWork) &&
    defined(body[0])
  ]
    | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
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
      }
    }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug &&
    defined(title) &&
    defined(summary) &&
    defined(coverImage.asset) &&
    defined(areaOfWork) &&
    defined(body[0])
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
    _id == "projectsPage" &&
    defined(introLabel) &&
    defined(introHeading)
  ][0] {
    _id,
    introLabel,
    introHeading
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  {
    "page": *[
      _type == "aboutPage" &&
      _id == "aboutPage"
    ][0] {
      _id,
      pageHeading,
      identityHeading,
      identityStatement,
      identityDescription,
      identityImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt,
        "lqip": asset->metadata.lqip
      },
      storyHeading,
      storyStatement,
      storyDescription,
      teamHeading,
      teamMembers[] {
        _key,
        ...(@-> {
          _id,
          name,
          role,
          biography,
          photo {
            asset,
            crop,
            hotspot,
            decorative,
            alt,
            "lqip": asset->metadata.lqip
          }
        })
      },
      partnersHeading,
      partners[] {
        _key,
        ...(@-> {
          _id,
          name,
          website,
          logo {
            asset,
            crop,
            hotspot,
            decorative,
            alt,
            "lqip": asset->metadata.lqip
          }
        })
      }
    },
    "organization": *[
      _type == "organizationDetails" &&
      _id == "organizationDetails"
    ][0] {
      _id,
      missionStatement,
      visionStatement
    }
  }
`);

export const WORK_PAGE_QUERY = defineQuery(`
  *[
    _type == "workPage" &&
    _id == "workPage"
  ][0] {
    _id,
    introLabel,
    introHeading,

    workAreas[]-> {
      _id,
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
    },

    impactHeading,
    impactMetrics[] {
      _key,
      value,
      label
    },

    featuredProject-> {
      _id,
      title,
      "slug": slug.current,
      summary,
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

export const GET_INVOLVED_PAGE_QUERY = defineQuery(`
  {
    "page": *[
      _type == "getInvolvedPage" &&
      _id == "getInvolvedPage"
    ][0] {
      _id,
      introLabel,
      introHeading,
      introDescription,
      partnershipsHeading,
      partnershipPaths[] {
        _key,
        title,
        description
      },
      inquiryHeading,
      inquiryDescription
    },

    "organization": *[
      _type == "organizationDetails" &&
      _id == "organizationDetails"
    ][0] {
      _id,
      publicEmail,
      postalAddress,
      phone
    }
  }
`);

export const MEDIA_PAGE_QUERY = defineQuery(`
  *[
    _type == "mediaPage" &&
    _id == "mediaPage"
  ][0] {
    _id,
    title,
    description
  }
`);

export const NEWS_QUERY = defineQuery(`
  *[
    _type == "newsItem" &&
    defined(publishedAt) &&
    defined(coverImage.asset) &&
    (
      destination == "internal" && defined(slug.current) ||
      destination == "external" && defined(externalUrl)
    )
  ]
    | order(publishedAt desc, _id asc) [$start...$end] {
      _id,
      destination,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      externalSource,
      externalUrl,

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
    _type == "publication" &&
    defined(publishedAt) &&
    (
      deliveryType == "file" && defined(file.asset) ||
      deliveryType == "external" && defined(externalUrl)
    )
  ]
    | order(publishedAt desc, _id asc) [$start...$end] {
      _id,
      title,
      publishedAt,
      deliveryType,
      externalUrl,
      externalSource,

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
    _type == "multimediaItem" &&
    mediaType == $mediaType &&
    defined(slug.current) &&
    defined(publishedAt) &&
    defined(coverImage.asset)
  ]
    | order(publishedAt desc, _id asc) [$start...$end] {
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

export const MULTIMEDIA_COUNT_QUERY = defineQuery(`
  count(*[
    _type == "multimediaItem" &&
    mediaType == $mediaType &&
    defined(slug.current) &&
    defined(publishedAt) &&
    defined(coverImage.asset)
  ])
`);

export const PUBLICATIONS_COUNT_QUERY = defineQuery(`
  count(*[
    _type == "publication" &&
    defined(publishedAt) &&
    (
      deliveryType == "file" && defined(file.asset) ||
      deliveryType == "external" && defined(externalUrl)
    )
  ])
`);

export const NEWS_COUNT_QUERY = defineQuery(`
  count(*[
    _type == "newsItem" &&
    defined(publishedAt) &&
    defined(coverImage.asset) &&
    (
      destination == "internal" && defined(slug.current) ||
      destination == "external" && defined(externalUrl)
    )
  ])
`);
