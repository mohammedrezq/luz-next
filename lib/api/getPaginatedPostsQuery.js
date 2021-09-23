import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
          tags {
            edges {
              node {
                slug
                tagId
                id
                databaseId
                count
                name
              }
            }
          }
          categories {
            edges {
              node {
                id
                categoryId
                count
                databaseId
                slug
                name
                parentId
                parentDatabaseId
              }
              isPrimary
            }
          }
          date
          modified
        }
      }
    }
  }
`;
