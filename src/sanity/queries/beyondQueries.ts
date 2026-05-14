export const BEYOND_ITEMS_QUERY = `
  *[_type == "beyondItem"] | order(order asc) {
    _id,
    order,
    label,
    title,
    body,
    "images": images[]{ asset->{ url }, hotspot },
    imageTags,
    "marks": *[_type == "planetMark" && planet._ref == ^._id] | order(submittedAt desc) {
      _id,
      emoji,
      nickname,
      mark,
      "imageUrl": image.asset->url,
      submittedAt
    }
  }
`;
