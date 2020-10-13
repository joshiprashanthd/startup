import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
  type Subscription {
    _: String
  }
` as DocumentNode;