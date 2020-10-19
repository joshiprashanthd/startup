import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	type Field {
		id: ID!
		name: String!
		description: String!
		color: String!
	}
` as DocumentNode;
