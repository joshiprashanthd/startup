import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	input StrictUserInput {
		email: String!
		password: String!
		handler: String!
		name: String!
		bio: String!
		lastActive: Date
	}

	input LooseUserInput {
		userId: ID!
		email: String
		password: String
		handler: String
	}
` as DocumentNode;
