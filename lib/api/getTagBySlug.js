import { gql } from "@apollo/client";

export const getTagBySlug = gql`
  query TagBySlug($slug: ID!, $first: Int, $after: String) {
    tag(id: $slug, idType: SLUG) {
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
