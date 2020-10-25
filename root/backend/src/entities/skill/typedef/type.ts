import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	type Skill {
		id: ID!
		name: String!
		description: String!
		color: String!
	}
` as DocumentNode;
