import { ApolloError, AuthenticationError } from "apollo-server-express";

//local
import { User } from "../../entities/user/model";
import { IContext } from "../../types";
import { SessionConfig } from "../../config";

export const ensureSignedIn = (context: IContext) => {
	if (!context.req.session.userId)
		throw new AuthenticationError("You must be signed in.");
};

export const ensureSignedOut = (context: IContext) => {
	if (context.req.session.userId)
		throw new AuthenticationError("You must be signed out.");
};

export const attemptSignIn = async (
	email: string,
	password: string,
	context: IContext
) => {
	const user = await User.findOne({ email });

	if (!user)
		throw new AuthenticationError(
			"Incorrect password or email. Please try again"
		);

	if (!(await user.comparePassword(password)))
		throw new AuthenticationError(
			"Incorrect password or email. Please try again."
		);

	const result = await User.findByIdAndUpdate(
		user.id,
		{ isOnline: true },
		(err, res) => {
			if (err) throw new ApolloError(err);
		}
	);

	context.req.session.userId = user.id;

	return result;
};

export const attemptSignOut = (context: IContext) => {
	return new Promise((resolve, reject) => {
		User.updateOne(
			{ _id: context.req.session.userId },
			{ isOnline: false },
			(err, res) => {
				if (err) reject(err);
			}
		);
		context.req.session.destroy(err => {
			if (err) reject(err);
			context.res.clearCookie(SessionConfig.sessionName);
			resolve(true);
		});
	});
};
