import { ApolloError } from "apollo-server-express";
import nodemailer from "nodemailer";

// local
import { Token } from "../../token/model";
import { User } from "../model";
import { ILooseUserInput, IStrictUserInput } from "../typedef";
import {
	attemptSignIn,
	attemptSignOut
} from "../../../helpers/functions/authentication";
import { mapUser } from "../mapper";
import { IContext } from "../../../types";
import { sendVerificationEmail } from "../../../helpers/functions/sendVerificationEmail";

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

			const tokenDoc = Token.create<any>({
				userId: user.id,
				email: user.email,
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

			const doc = {
				...args.input,
				interests:
					args.input.interests &&
					args.input.interests.map(interest => interest.fieldId)
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
