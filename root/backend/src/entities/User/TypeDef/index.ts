import { gql } from "apollo-server-express";

export default gql`
	input StrictUserAccountInfoInput {
		email: String!
		password: String!
		handler: String!
		name: String!
	}

	input StrictUserInput {
		accountInfo: StrictUserAccountInfoInput!
	}

	input LooseUserPersonalInfoInput {
		bio: String
		birthDate: Date
		interests: [SkillIdInput!]
	}

	input LooseUserAccountInfoInput {
		email: String
		password: String
		handler: String
		name: String
	}

	input LooseUserInput {
		userId: ID!
		accountInfo: LooseUserAccountInfoInput
		personalInfo: LooseUserPersonalInfoInput
	}

	extend type Query {
		users: [User!]
	}

	extend type Mutation {
		createUser(input: StrictUserInput!): User! @guest
		editUser(input: LooseUserInput!): User! @auth
		signIn(email: String!, password: String!): User! @guest
		signOut: Boolean! @auth
	}

	type UserAccountInfo {
		name: String!
		email: String @private
		password: String @private
		handler: String!
		verifiedEmail: Boolean!
	}

	type UserPersonalInfo {
		bio: String
		birthDate: Date!
		interests: [Skill!]
	}

	type UserStatusInfo {
		isOnline: Boolean!
		lastActive: Date
	}

	type User {
		id: ID!
		accountInfo: UserAccountInfo!
		personalInfo: UserPersonalInfo!
		statusInfo: UserStatusInfo!
		conversations: [Conversation!]
	}
`;

export { IUser, ILooseUserInput, IStrictUserInput } from "./types";
