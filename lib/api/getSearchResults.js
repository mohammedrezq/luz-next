import { gql } from "@apollo/client";

export const getSearchResults = gql`
  query($searchTerm: String) {
    posts(where: { search: $searchTerm }) {
      edges {
        node {
          id
          uri
          title
          excerpt
          slug
        }
      }
    }
  }
`;
