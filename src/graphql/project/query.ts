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

export const PROJECT_BY_ID = gql`
  query ProjectById($projectId: ID!) {
    projectById(projectId: $projectId) {
      id
      details {
        title
        description
        duration
        startingOn
        maxTeamMembers
        skillSet {
          id
          name
        }
        creator {
          id
          accountInfo {
            name
            handler
          }
        }
        requests {
          id
          message
          status
          from {
            id
            accountInfo {
              name
              handler
            }
          }
        }
      }
      work {
        team {
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
