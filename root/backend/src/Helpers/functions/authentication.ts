import { ApolloError, AuthenticationError } from "apollo-server-express";

//local
import { User } from "../../entities/user/model";
import { SessionConfig } from "../../utils/config";

export const ensureSignedIn = req => {
	if (!req.session.userId)
		throw new AuthenticationError("You must be signed in.");
};

export const ensureSignedOut = req => {
	if (req.session.userId)
		throw new AuthenticationError("You must be signed out.");
};

export const attemptSignIn = async (
	email: string,
	password: string,
	req: any
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

	req.session.userId = user.id;

	return result;
};

export const attemptSignOut = (req: any, res: any) => {
	return new Promise((resolve, reject) => {
		User.updateOne(
			{ _id: req.session.userId },
			{ isOnline: false },
			(err, res) => {
				if (err) reject(err);
			}
		);
		req.session.destroy(err => {
			if (err) reject(err);
			res.clearCookie(SessionConfig.sessionName);
			resolve(true);
		});
	});
};
