import { gql } from "@apollo/client";

export const REQUEST_PROJECT = gql`
  mutation RequestProject($message: String!, $projectId: ID!) {
    requestProject(message: $message, projectId: $projectId) {
      id
    }
  }
`;
