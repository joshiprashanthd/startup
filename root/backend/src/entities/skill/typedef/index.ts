import { gql } from "apollo-server-express";

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

	extend type Query {
		skills: [Skill!]
	}

	extend type Mutation {
		createSkill(input: StrictSkillInput!): Skill! @auth
	}

	type Skill {
		id: ID!
		name: String!
		description: String!
		color: String!
	}
`;

export {
	ISkill,
	ISkillIdInput,
	IStrictSkillInput,
	ILooseSkillInput
} from "./types";
