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
        uri
      }
      next {
        title
        slug
        uri
      }
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
`;
