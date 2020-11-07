import { gql } from "apollo-server-express";

export default gql`
	input StrictProjectDetailsInput {
		title: String!
		description: String!
		startingOn: Date!
		maxTeamMembers: Int!
		duration: Int!
		skillSet: [SkillIdInput!]
	}

	input StrictProjectInput {
		details: StrictProjectDetailsInput!
	}

	enum ProjectStateEnum {
		OPEN
		CLOSED
		STARTED
		ENDED
	}

	type ProjectDetails {
		title: String!
		description: String!
		startingOn: Date!
		maxTeamMembers: Int!
		duration: Int!
		creator: User!
		skillSet: [Skill!]
		stars: [User!]
	}

	type Project {
		id: ID!
		details: ProjectDetails!
		state: ProjectStateEnum!
	}

	extend type Query {
		projects: [Project!]
	}

	extend type Mutation {
		createProject(input: StrictProjectInput!): Project!
		editProject(input: LooseProjectInput!): Project!
	}
`;
