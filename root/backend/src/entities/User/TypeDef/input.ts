import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

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
` as DocumentNode;
