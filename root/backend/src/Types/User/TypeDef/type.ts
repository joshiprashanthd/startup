import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String
		handler: String!
		bio: String!
		isOnline: Boolean!
		lastActive: Date
	}
` as DocumentNode;
