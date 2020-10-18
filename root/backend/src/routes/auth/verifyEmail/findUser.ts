import { RSA_NO_PADDING } from "constants";
import { User } from "../../../entities/user/model";

export default async function (req, res, next, value) {
	const user = await User.findOne({ _id: value });
	if (!user || user.verifiedAccount) {
		res.status(404).send("<h1>Token invalid</h1>");
		next();
	}
	req.user = user;
	next();
}
