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

export const ME_PROFILE_PAGE = gql`
  {
    me {
      id
      accountInfo {
        name
        email
        handler
      }
      personalInfo {
        bio
        birthDate
        interests {
          id
          name
        }
      }
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      accountInfo {
        name
        email
        handler
      }
      personalInfo {
        bio
        birthDate
        interests {
          id
          name
        }
      }
    }
  }
`;
