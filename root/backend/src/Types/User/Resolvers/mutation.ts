import { AuthenticationError } from "apollo-server-express";

// local
import User from "../Model/model";
import { IStrictUserInput } from "../TypeDef";
import SessionConfig from "../../../utils/env/session.config";

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: any,
			info: any
		) => {
			return await User.create<IStrictUserInput>(args.input);
		},

		signIn: async (
			parent: any,
			{ email, password }: { email: string; password: string },
			{ req },
			info: any
		) => {
			if (req.session.userId) {
				throw new AuthenticationError("You must be signed out.");
			}

			const user = await User.findOne({ email: email });

			if (!user) {
				throw new AuthenticationError("Cannot find email");
			}

			if (!(await user.comparePassword(password))) {
				throw new AuthenticationError("Incorrect password.");
			}

			req.session.userId = user.id;
			return user;
		},

		signOut: async (parent: any, args: any, { req, res }, info: any) => {
			if (!req.session.userId) {
				throw new AuthenticationError("You must be signed in!");
			}

			return new Promise((resolve, reject) => {
				req.session.destroy(err => {
					if (err) reject(err);
					res.clearCookie(SessionConfig.sessionName);
					resolve(true);
				});
			});
		}
	}
};
