import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";

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
import { TokenConfig } from "../../../config";

type DeepPartial<T> = {
	[K in keyof T]?: Partial<T[K]>;
};

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: IContext,
			info: any
		) => {
			const user = await User.create<DeepPartial<IUserDocument>>(args.input);

			const token = jwt.sign(
				{ userId: user.id, email: user.accountInfo.email },
				TokenConfig.tokenSecret,
				{ expiresIn: parseInt(TokenConfig.tokenExpiry) }
			);

			const tokenDoc = await Token.create<any>({
				userId: user.id,
				email: user.accountInfo.email,
				token: token
			});

			sendVerificationEmail(user, tokenDoc);

			return mapUser(user, context);
		},

		editUser: async (
			parent: any,
			args: { input: ILooseUserInput },
			context: IContext,
			info: any
		) => {
			const user = await User.findById(args.input.userId);

			if (!user) throw new ApolloError("User not found.");

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
