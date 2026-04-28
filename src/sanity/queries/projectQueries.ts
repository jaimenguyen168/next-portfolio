export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(_createdAt desc) [0...4] {
    _id,
    title,
    description,
    image,
    "skills": skills[]->{ name },
    githubUrl,
    demoUrl,
  }
`;
