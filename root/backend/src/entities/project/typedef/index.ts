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
		requests: [ProjectRequest!]
	}

	type Project {
		id: ID!
		details: ProjectDetails!
		state: ProjectStateEnum!
		isStarredByMe: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		projects: [Project!]
		projectsByUserInterests(userId: ID!): [Project!]
	}

	extend type Mutation {
		createProject(input: StrictProjectInput!): Project! @auth
		starProject(projectId: ID!): Boolean!
	}
`;

export {
	ILooseProjectDetailsInput,
	IProject,
	IStrictProjectInput
} from "./types";
