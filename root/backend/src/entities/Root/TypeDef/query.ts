import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
  type Query {
    _: String
  }
` as DocumentNode;