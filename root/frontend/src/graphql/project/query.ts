import { gql } from "@apollo/client";

export const PROJECTS = gql`
  {
    projects {
      id
      details {
        title
        description
        skillSet {
          name
        }
        creator {
          id
          accountInfo {
            name
            handler
          }
        }
      }
      state
      isStarred
      isRequested
    }
  }
`;
