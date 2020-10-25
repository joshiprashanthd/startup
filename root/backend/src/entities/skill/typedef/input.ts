import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	input SkillIdInput {
		skillId: ID!
	}

	input StrictSkillInput {
		name: String!
		description: String!
		color: String!
	}

	input LooseSkillInput {
		name: String
		description: String
		color: String
	}
` as DocumentNode;
