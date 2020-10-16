import { AuthenticationError } from "apollo-server-express";

//local
import User from "../../entities/User/Model/model";
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

	if (!user) throw new AuthenticationError("Cannot find email");

	if (!(await user.comparePassword(password)))
		throw new AuthenticationError("Incorrect password.");

	req.session.userId = user.id;

	return user;
};

export const attemptSignOut = (req: any, res: any) => {
	return new Promise((resolve, reject) => {
		req.session.destroy(err => {
			if (err) reject(err);
			res.clearCookie(SessionConfig.sessionName);
			resolve(true);
		});
	});
};
