import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query Categories {
    categories(first: 10000) {
      edges {
        node {
          databaseId
          description
          id
          name
          slug
        }
      }
    }
  }
`;
