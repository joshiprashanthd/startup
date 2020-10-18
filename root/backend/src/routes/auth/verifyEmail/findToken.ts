import { Token } from "../../../entities/token/model";

export default async function (req, res, next, value) {
	const tokenDoc = await Token.findOne({ token: value });

	if (!tokenDoc) {
		res.send("<h1>Token is expired</h1>");
		next();
	}
	req.tokenDoc = tokenDoc;
	next();
}
