import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      accountInfo {
        name
        handler
        email
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: StrictUserInput!) {
    createUser(input: $input) {
      id
      accountInfo {
        email
        handler
        name
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($input: LooseUserInput!) {
    editUser(input: $input) {
      id
    }
  }
`;
