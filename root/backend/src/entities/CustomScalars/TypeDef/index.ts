import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	scalar Date
` as DocumentNode;
