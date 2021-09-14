import { gql } from "@apollo/client";

export const getAllPostsQuery = gql`
  query PostsQuery {
    posts(first: 10000) {
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
`;