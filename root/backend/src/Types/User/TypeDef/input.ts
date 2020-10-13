import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`

  input StrictUserInput {
    email: String!
    password: String!
    handler: String!
  }

  input LooseUserInput {
    email: String
    password: String
    handler: String
  }
  
` as DocumentNode;