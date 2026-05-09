export const ALL_MILESTONES_QUERY = `
  *[_type == "milestone"] | order(date desc) {
    _id,
    title,
    date,
    endDate,
    category,
    excerpt,
    body,
    "logo": { "url": logo.asset->url },
    "image": { "url": image.asset->url, "alt": image.alt },
    tags,
    location,
    highlighted,
  }
`;
