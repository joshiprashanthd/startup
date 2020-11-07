import { gql } from "apollo-server-express";

export default gql`
	input StrictMessageInput {
		senderId: ID!
		receiverId: ID!
		body: String!
	}

	extend type Query {
		messages: [Message!]
	}

	extend type Mutation {
		createMessage(input: IStrictMessageInput!): Message!
		removeMessage(messageId: ID!): Boolean!
		editMessage(body: String!, messageId: ID!): Message!
	}

	type Message {
		id: ID!
		sender: User!
		receiver: User!
		body: String!
		read: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}
`;

export { IMessage, IStrictMessageInput } from "./types";
