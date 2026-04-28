export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(_createdAt desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "skills": skills[]->{ name },
    githubUrl,
    demoUrl,
  }
`;

export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    featured,
    "skills": skills[]->{ name },
    githubUrl,
    demoUrl,
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    featured,
    "skills": skills[]->{ name },
    githubUrl,
    demoUrl,
  }
`;
