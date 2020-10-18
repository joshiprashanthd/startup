import nodemailer from "nodemailer";

export default async function () {
	const testAccount = await nodemailer.createTestAccount();

	return nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	});
}
