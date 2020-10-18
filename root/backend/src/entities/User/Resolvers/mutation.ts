import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// local
import emailer from "../../../utils/emailer";
import { TokenConfig } from "../../../utils/config";
import { Token } from "../../token/model";
import { User } from "../model";
import { IStrictUserInput } from "../typedef";
import {
	ensureSignedIn,
	ensureSignedOut,
	attemptSignIn,
	attemptSignOut
} from "../../../helpers/functions/authentication";
import { mapUser } from "../mapper";

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: any,
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

			return mapUser(user);
		},

		signIn: async (
			parent: any,
			{ email, password }: { email: string; password: string },
			{ req },
			info: any
		) => {
			ensureSignedOut(req);
			return mapUser(await attemptSignIn(email, password, req));
		},

		signOut: async (parent: any, args: any, { req, res }, info: any) => {
			ensureSignedIn(req);
			return attemptSignOut(req, res);
		}
	}
};
