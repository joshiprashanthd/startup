import { gql } from "apollo-server-express";
export default gql`
	type Conversation {
		id: ID!
		converserOne: User!
		converserTwo: User!
		messages(cursor: ID, limit: Int = 50): [Message!]
		createdAt: Date!
		updatedAt: Date!
	}
`;
