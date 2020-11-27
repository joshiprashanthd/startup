import { gql } from "@apollo/client";

export const SKILLS_WITH_NAME_ID = gql`
  query {
    skills {
      id
      name
      description
    }
  }
`;
