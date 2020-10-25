import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export default gql`
	type UserAccountInfo {
		name: String!
		email: String @private
		password: String @private
		handler: String!
		verifiedAccount: Boolean!
	}

	type UserPersonalInfo {
		bio: String
		birthDate: Date!
		interests: [Skill!]
	}

	type UserStatus {
		isOnline: Boolean!
		lastActive: Date
	}

	type User {
		id: ID!
		accountInfo: UserAccountInfo!
		personalInfo: UserPersonalInfo!
		status: UserStatus!
	}
` as DocumentNode;
