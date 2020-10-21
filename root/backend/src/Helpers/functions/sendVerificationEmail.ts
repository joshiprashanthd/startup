import jwt from "jsonwebtoken";

//local
import { IUserDocument } from "../../entities/user/model";
import { TokenConfig } from "../../config";
import emailer from "../emailer";

export const sendVerificationEmail = async (user: IUserDocument) => {
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

	return [token, mailInfo];
};
