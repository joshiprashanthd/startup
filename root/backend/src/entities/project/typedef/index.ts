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

	input LooseProjectDetailsInput {
		title: String
		description: String
		startingOn: Date
		maxTeamMembers: Int
		duration: Int
		skillSet: [SkillIdInput!]
	}

	input LooseProjectInput {
		projectId: ID!
		details: LooseProjectDetailsInput
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
		requests: [ProjectRequest!]
	}

	type Project {
		id: ID!
		details: ProjectDetails!
		state: ProjectStateEnum!
		isStarred: Boolean!
		isRequested: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		projects: [Project!]
		projectsByUserInterests(userId: ID!): [Project!]
	}

	extend type Mutation {
		createProject(input: StrictProjectInput!): Project! @auth
		editProject(input: LooseProjectInput!): Project! @auth
		toggleStarProject(projectId: ID!): Boolean! @auth
	}
`;

export { ILooseProjectInput, IProject, IStrictProjectInput } from "./types";
