import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	extend type Mutation {
		createUser(input: StrictUserInput!): User!
		signIn(email: String!, password: String!): User!
		signOut: Boolean!
	}
` as DocumentNode;