import jwt from "jsonwebtoken";

//local
import { TokenConfig } from "../../../config";
import { User } from "../../../entities/user/model";

export default async function (req, res, next) {
	const { token } = req.params;
	try {
		const payload = (await jwt.verify(token, TokenConfig.tokenSecret)) as {
			userId: string;
			email: string;
		};

		await User.findByIdAndUpdate(payload.userId as string, {
			"accountInfo.verifiedEmail": true
		});

		res.send(`<h1>Your email ${payload.email} is verified</h1>`);
		next();
	} catch (err) {
		res.send("<h1>Token is expired</h1>");
		next();
	}
}
