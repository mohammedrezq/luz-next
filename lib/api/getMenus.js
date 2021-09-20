import { gql } from "@apollo/client";

export const getMenus = gql`
  query getMenus {
    menus {
      edges {
        node {
          id
          menuItems {
            edges {
              node {
                cssClasses
                id
                parentId
                label
                title
                target
                path
              }
            }
          }
          name
          slug
          locations
        }
      }
    }
  }
`;

/**
 * Something for trial (Sometime later)
 *
 */

export const getMenuByName = gql`
  query getMenuByName {
    menu(id: "Primary Menu", idType: NAME) {
      count
      id
      databaseId
      name
      slug
      menuItems {
        nodes {
          id
          databaseId
          title
          cssClasses
          label
          target
          parentId
        }
      }
    }
  }
`;

/**
 * List Of Menu Items
 */

export const getPrimaryMenu = gql`
  query GET_MENU_BY_NAME {
    menu(id: "Primary Menu", idType: NAME) {
      count
      id
      databaseId
      name
      slug
      menuItems {
        nodes {
          id
          databaseId
          title
          url
          cssClasses
          description
          label
          target
          parentId
          path
        }
      }
    }
  }
`;
