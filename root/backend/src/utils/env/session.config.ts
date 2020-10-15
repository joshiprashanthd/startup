import * as dotenv from "dotenv";
dotenv.config();

export default {
	sessionName: process.env.SESSION_NAME ?? "",
	sessionLifetime: process.env.SESSION_LIFETIME ?? 1800000,
	sessionSecret: process.env.SESSION_SECRET ?? "secret"
};
