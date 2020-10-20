import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// local
import { Token } from "../../token/model";
import { User } from "../model";
import { ILooseUserInput, IStrictUserInput } from "../typedef";
import {
	ensureSignedIn,
	ensureSignedOut,
	attemptSignIn,
	attemptSignOut
} from "../../../helpers/functions/authentication";
import { mapUser } from "../mapper";
import { ApolloError } from "apollo-server-express";
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
			ensureSignedOut(context);

			const user = await User.create(args.input);

			const [token, mailInfo] = await sendVerificationEmail(user);

			console.log(nodemailer.getTestMessageUrl(mailInfo));

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
			ensureSignedIn(context);

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
			ensureSignedOut(context);
			return mapUser(await attemptSignIn(email, password, context), context);
		},

		signOut: async (parent: any, args: any, context: IContext, info: any) => {
			ensureSignedIn(context);
			return attemptSignOut(context);
		}
	}
};
