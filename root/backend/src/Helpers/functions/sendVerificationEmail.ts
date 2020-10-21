import jwt from "jsonwebtoken";

//local
import { IUserDocument } from "../../entities/user/model";
import { TokenConfig } from "../../config";
import emailer from "../emailer";

export const sendVerificationEmail = (user: IUserDocument) => {
	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		TokenConfig.tokenSecret,
		{ expiresIn: parseInt(TokenConfig.tokenExpiry) }
	);

	emailer.sendMail({
		from: '"Prashant Joshi (CEO)" <no-reply@collabs.com>',
		to: `${user.email}`,
		subject: "Please verify your email address",
		html: `
		<html>
		<head>
			<style>
				* {
					font-family: "Proxima Nova";
				}
				
				div.main {
					width: fit-content;
					margin: 2rem auto;
				}
					
				p {
					font-size: 1rem;
				}
				
				a {
					margin: 1rem auto;
					display: inline-block;
					padding: 1rem;
					text-decoration: none;
					border-radius: 4pt;
					background-color: blue;
					font-weight: bold;
					color: white;
				}
				
				a:hover {
					background-color: darkblue;
					color: white;
				}

				p.footer {
					font-size: .8rem;
					color: grey;
				}
			</style>
		</head>
		<body>
			<div class="main">
			<h1>
				Thank you for registering for Collabs.io
			</h1>
			<hr>
			<p>
				Hey,<br>
				I am the CEO of <b>Collabs.io</b>, and you have a great journey ahead with us.<br>
				You can confirm your email by cliking the button below.
			</p>
			<a href="http:localhost:4000/auth/verify-email/${user.id}-${token}">
				Confirm your email
			</a>
			<p class="footer">
				Collabs.io
			</p>
		</div>
		</body>
	</html>	
    `
	});

	return token;
};
