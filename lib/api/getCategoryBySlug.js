import { gql } from "@apollo/client";

export const getCategoryBySlug = gql`
  query CategoryBySlug($slug: ID!, $first: Int, $after: String) {
    category(id: $slug, idType: SLUG) {
      databaseId
      description
      id
      name
      slug
      posts(first: $first, after: $after) {
        edges {
          node {
            title
            uri
            slug
            id
            featuredImage {
              node {
                sourceUrl
                srcSet
                uri
                id
                altText
                caption
              }
            }
            excerpt
          }
        }
      }
    }
  }
`;
