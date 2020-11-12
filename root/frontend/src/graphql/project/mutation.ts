import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: StrictProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`;
