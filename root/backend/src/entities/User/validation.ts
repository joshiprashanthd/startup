import Joi, { required } from "joi";

export const ValidationSchema = Joi.object({
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: {
			allow: ["com", "org", "net"]
		}
	}),
	handler: Joi.string().alphanum().min(6).max(20),
	password: Joi.string()
		.min(8)
		.max(30)
		.regex(/^(?=.*?[a-z])(?=.*?[0-9])./)
		.message("Password must be 8 characters long and must have one digit."),
	name: Joi.string(),
	birthDate: Joi.object()
});
