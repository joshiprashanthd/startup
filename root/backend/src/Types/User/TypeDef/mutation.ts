import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`

  type Mutation {
    createUser(input: StrictUserInput!): User!
  }
  
` as DocumentNode;