import { gql } from "apollo-server-express";

export default gql`
	extend type Mutation {
		createField(input: StrictFieldInput!): Field!
	}
`;
