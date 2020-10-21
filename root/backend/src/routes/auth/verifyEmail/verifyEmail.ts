import jwt from "jsonwebtoken";
import { Token } from "../../../entities/token/model";

//local
import { TokenConfig } from "../../../config";

export default async function (req, res, next) {
	const { tokenDoc, user } = req;
	try {
		const payload = (await jwt.verify(
			tokenDoc.token,
			TokenConfig.tokenSecret
		)) as { userId: string; email: string };

		await user.updateOne({ verifiedAccount: true });
		await Token.deleteOne({ _id: tokenDoc.id });

		res.send(`<h1>Your email ${payload.email} is verified</h1>`);
		next();
	} catch (err) {
		res.send("<h1>Invalid token.</h1>");
		next();
	}
}
