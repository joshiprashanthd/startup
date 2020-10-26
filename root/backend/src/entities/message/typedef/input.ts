import { gql } from "apollo-server-express";

export default gql`
	input IStrictMessageInput {
		senderId: ID!
		receiverId: ID!
		body: String!
	}
`;
