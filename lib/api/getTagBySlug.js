import { gql } from "@apollo/client";

export const getTagBySlug = gql`
  query TagsBySlug($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      databaseId
      description
      id
      name
      slug
      posts {
        edges {
          node {
            title
            slug
            uri
          }
        }
      }
    }
  }
`;
