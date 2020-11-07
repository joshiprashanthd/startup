import jwt from "jsonwebtoken";
import { Token } from "../../../entities/token/model";

//local
import { TokenConfig } from "../../../config";
import { User } from "../../../entities/user/model";

export default async function (req, res, next) {
	const { tokenDoc } = req;
	try {
		const payload = (await jwt.verify(
			tokenDoc.token,
			TokenConfig.tokenSecret
		)) as { email: string };

		await User.findByIdAndUpdate(tokenDoc.userId as string, {
			"accountInfo.verifiedEmail": true
		});

		await Token.deleteOne({ _id: tokenDoc.id });

		res.send(`<h1>Your email ${payload.email} is verified</h1>`);
		next();
	} catch (err) {
		res.send("<h1>Token is expired</h1>");
		next();
	}
}
