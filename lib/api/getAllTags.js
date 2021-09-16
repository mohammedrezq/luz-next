import { gql } from "@apollo/client";

export const getAllTags = gql`
  query Tags {
    tags(first: 10000) {
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
