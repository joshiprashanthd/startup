import { gql } from "@apollo/client";

export const PROJECTS = gql`
  {
    projects {
      id
      details {
        title
        description
        duration
        startingOn
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
      isStarred
      isRequested
    }
  }
`;
