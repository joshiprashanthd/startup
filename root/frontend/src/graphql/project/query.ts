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
          accountInfo {
            name
            handler
          }
        }
      }
      isStarred
    }
  }
`;
