import { gql } from "apollo-server-express";

export default gql`
	extend type Mutation {
		createMessage(input: IStrictMessageInput!): Message!
		removeMessage(messageId: ID!): Boolean!
		editMessage(body: String!, messageId: ID!): Message!
	}
`;
