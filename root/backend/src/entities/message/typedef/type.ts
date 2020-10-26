import { gql } from "apollo-server-express";

export default gql`
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
