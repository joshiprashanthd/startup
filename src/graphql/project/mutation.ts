import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: StrictProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`;

export const TOGGLE_STAR_PROJECT = gql`
  mutation ToggleStarProject($projectId: ID!) {
    toggleStarProject(projectId: $projectId)
  }
`;

export const EDIT_PROJECT = gql`
  mutation EditProject($input: LooseProjectInput!) {
    editProject(input: $input) {
      id
    }
  }
`;
