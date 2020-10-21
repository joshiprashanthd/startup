import * as dotenv from "dotenv";
dotenv.config();

export default {
	tokenSecret: process.env.TOKEN_SECRET ?? "pokjnlakjdshq",
	tokenExpiry: process.env.TOKEN_EXPIRY ?? (60 * 60 * 12).toString()
};
