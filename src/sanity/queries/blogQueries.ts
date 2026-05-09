export const ALL_BLOGS_QUERY = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    excerpt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt
    },
    tags,
    readingTime,
    featured,
  }
`;

export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    excerpt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": alt,
        "caption": caption,
      }
    },
    tags,
    readingTime,
    featured,
  }
`;
