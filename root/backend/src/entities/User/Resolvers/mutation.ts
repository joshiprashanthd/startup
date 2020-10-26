import { ApolloError } from "apollo-server-express";

// local
import { Token } from "../../token/model";
import { IUserDocument, User } from "../model";
import { ILooseUserInput, IStrictUserInput } from "../typedef";
import {
	attemptSignIn,
	attemptSignOut
} from "../../../helpers/functions/authentication";
import { mapUser } from "../mapper";
import { IContext } from "../../../types";
import { sendVerificationEmail } from "../../../helpers/functions/sendVerificationEmail";
import { ISkillIdInput } from "../../skill/typedef";

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: IContext,
			info: any
		) => {
			const user = await User.create(args.input);

			const token = sendVerificationEmail(user);

			await Token.create<any>({
				userId: user.id,
				email: user.accountInfo.email,
				token: token
			});
			return mapUser(user, context);
		},

		editUser: async (
			parent: any,
			args: { input: ILooseUserInput },
			context: IContext,
			info: any
		) => {
			const user = await User.findById(args.input.userId);

			if (!user) {
				throw new ApolloError("User not found.");
			}

			delete args.input["userId"];

			const doc: Partial<IUserDocument> = {
				accountInfo:
					"accountInfo" in args.input
						? {
								...user.toObject().accountInfo,
								...args.input.accountInfo
						  }
						: user.toObject().accountInfo,
				personalInfo:
					"personalInfo" in args.input
						? {
								...args.input.personalInfo,
								interests:
									"interests" in args.input.personalInfo
										? (args.input.personalInfo
												.interests as ISkillIdInput[]).map(
												interest => interest.skillId
										  )
										: user.personalInfo.interests
						  }
						: user.toObject().personalInfo
			};

			await user.updateOne(doc, (err, raw) => {
				if (err) throw new ApolloError(err);
			});

			return mapUser(Object.assign(user, doc), context);
		},

		signIn: async (
			parent: any,
			{ email, password }: { email: string; password: string },
			context: IContext,
			info: any
		) => {
			return mapUser(await attemptSignIn(email, password, context), context);
		},

		signOut: async (parent: any, args: any, context: IContext, info: any) => {
			return attemptSignOut(context);
		}
	}
};
