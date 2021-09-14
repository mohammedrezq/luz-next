import { gql } from "@apollo/client";

export const getPostBySlug = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      uri
      slug
      content
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      previous {
        title
        slug
      }
      next {
        title
        slug
      }
    }
  }
`;
