import { gql } from "@apollo/client";

export const getPostsByCategoryId = gql`
  query PostsByCategoryId($categoryId: Int!) {
    posts(where: { categoryId: $categoryId }) {
      edges {
        node {
          id
          categories {
            edges {
              node {
                databaseId
                id
                name
                slug
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
          title
          slug
        }
      }
    }
  }
`;
