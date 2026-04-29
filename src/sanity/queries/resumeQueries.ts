export const RESUME_QUERY = `
  *[_type == "resume" && _id == "resume"][0] {
    "url": file.asset->url,
  }
`;
