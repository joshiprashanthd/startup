import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`

  extend type Query {
    users: [User!]
  }
  
` as DocumentNode;