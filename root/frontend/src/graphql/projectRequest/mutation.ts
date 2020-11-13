import { gql } from "@apollo/client";

export const TOGGLE_REQUEST_PROJECT = gql`
  mutation ToggleRequestProject($message: String!, $projectId: ID!) {
    toggleRequestProject(message: $message, projectId: $projectId)
  }
`;
