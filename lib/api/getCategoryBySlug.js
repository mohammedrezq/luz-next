import { gql } from "@apollo/client";

export const getCategoryBySlug = gql`
  query CategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
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
