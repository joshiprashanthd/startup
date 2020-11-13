import { gql } from "apollo-server-express";

export default gql`
	enum RequestStatusEnum {
		PENDING
		ACCEPTED
		DENIED
	}

	type ProjectRequest {
		id: ID!
		from: User!
		to: Project!
		message: String
		status: RequestStatusEnum!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		projectRequests: [ProjectRequest!]
	}

	extend type Mutation {
		toggleRequestProject(message: String!, projectId: ID!): Boolean! @auth
		acceptProjectRequest(projectRequestId: ID!): ProjectRequest! @auth
	}
`;

export { IProjectRequest } from "./types";
