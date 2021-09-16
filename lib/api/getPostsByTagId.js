import { gql } from "@apollo/client";

export const getPostsByTagId = gql`
  query PostsByTagId($tagId: String!) {
    posts(where: { tagId: $tagId }) {
      edges {
        node {
          id
          tags {
            edges {
              node {
                slug
                tagId
                count
                id
                databaseId
                name
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          databaseId
          slug
          title
        }
      }
    }
  }
`;
