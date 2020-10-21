import * as dotenv from "dotenv";
dotenv.config();

export default {
	gmailUser: process.env.GMAIL_USER ?? "",
	gmailPassword: process.env.GMAIL_PASSWORD ?? "",
	gmailSender: process.env.GMAIL_SENDER ?? "prashantjoshi@collabs.com"
};
