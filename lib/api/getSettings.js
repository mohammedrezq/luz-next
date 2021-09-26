import { gql } from "@apollo/client";

export const getSettings = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`;
