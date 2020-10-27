import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		conversations: [Conversation!]
		conversationsByUser(converserId: ID!): [Conversation!]
	}
`;
