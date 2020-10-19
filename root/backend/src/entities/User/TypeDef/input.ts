import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	input StrictUserInput {
		email: String!
		password: String!
		handler: String!
		name: String!
		birthDate: Date!
	}

	input LooseUserInput {
		userId: ID!
		name: String
		email: String
		password: String
		handler: String
		birthDate: Date
	}
` as DocumentNode;
