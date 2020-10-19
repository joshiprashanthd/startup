import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// local
import emailer from "../../../utils/emailer";
import { TokenConfig } from "../../../utils/config";
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

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: IContext,
			info: any
		) => {
			const user = await User.create<IStrictUserInput>(args.input);

			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				TokenConfig.tokenSecret,
				{ expiresIn: parseInt(TokenConfig.tokenExpiry) }
			);

			const transporter = await emailer();
			const mailInfo = await transporter.sendMail({
				from: '"Prashant Joshi (CEO)" <no-reply@collabs.com>',
				to: `${user.email}`,
				subject: "Please verify your email address",
				html: `
				<h1>Thank you for registering</h1>
				<p>Verify your email by clicking on this link</p>
				<br>
				<a href="http:localhost:4000/auth/verify-email/${user.id}-${token}">
					Verify you email
				</a>
				`
			});

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
