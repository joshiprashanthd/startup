import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		conversationsByUser(converserId: ID!): [Conversation!]
	}
`;
