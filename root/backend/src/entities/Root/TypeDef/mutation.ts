import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
  type Mutation {
    _: String
  }
` as DocumentNode;