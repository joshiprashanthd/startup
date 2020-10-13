import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`

  type User {
    email: String!
    password: String
    handler: String!
  }

` as DocumentNode;