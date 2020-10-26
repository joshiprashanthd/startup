import { gql } from "apollo-server-express";

export default gql`
	input StrictConversationInput {
		converserOne: ID!
		converserTwo: ID!
		body: String!
	}
`;
