import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	extend type Mutation {
		createUser(input: StrictUserInput!): User! @guest
		editUser(input: LooseUserInput!): User! @auth
		signIn(email: String!, password: String!): User! @guest
		signOut: Boolean! @auth
	}
` as DocumentNode;
