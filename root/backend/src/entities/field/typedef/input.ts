import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	input FieldIdInput {
		fieldId: ID!
	}

	input StrictFieldInput {
		name: String!
		description: String!
		color: String!
	}

	input LooseFieldInput {
		name: String
		description: String
		color: String
	}
` as DocumentNode;
