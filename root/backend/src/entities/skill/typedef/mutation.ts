import { gql } from "apollo-server-express";

export default gql`
	extend type Mutation {
		createSkill(input: StrictSkillInput!): Skill! @auth
	}
`;
