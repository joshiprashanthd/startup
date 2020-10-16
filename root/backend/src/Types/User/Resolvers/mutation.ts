// local
import User from "../Model/model";
import { IStrictUserInput } from "../TypeDef";
import {
	ensureSignedIn,
	ensureSignedOut,
	attemptSignIn,
	attemptSignOut
} from "../../../helpers/functions/authentication";

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
			ensureSignedOut(req);
			return attemptSignIn(email, password, req);
		},

		signOut: async (parent: any, args: any, { req, res }, info: any) => {
			ensureSignedIn(req);
			return attemptSignOut(req, res);
		}
	}
};
