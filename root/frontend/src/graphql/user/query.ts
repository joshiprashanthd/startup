import { gql } from "@apollo/client";

export const ME = gql`
  {
    me {
      id
      accountInfo {
        name
        email
        handler
      }
    }
  }
`;
