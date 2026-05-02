export const BEYOND_ITEMS_QUERY = `
  *[_type == "beyondItem"] | order(order asc) {
    _id,
    order,
    label,
    title,
    body,
    "images": images[]{ asset->{ url }, hotspot },
    imageTags,
  }
`;
