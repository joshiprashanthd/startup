import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		conversations: [Conversation!]
		conversationsByUser(converserId: ID!): [Conversation!]
	}

	type Conversation {
		id: ID!
		converserOne: User!
		converserTwo: User!
		messages(cursor: ID, limit: Int = 50): [Message!]
		createdAt: Date!
		updatedAt: Date!
	}
`;

export { IConversation } from "./types";
