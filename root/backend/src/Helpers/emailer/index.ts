import nodemailer from "nodemailer";
import { GmailConfig } from "../../config";

export default nodemailer.createTransport({
	service: "gmail",
	sender: GmailConfig.gmailSender,
	auth: {
		user: GmailConfig.gmailUser,
		pass: GmailConfig.gmailPassword
	}
});
