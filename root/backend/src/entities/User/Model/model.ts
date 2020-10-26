import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

// local
import { IUserDocument, IUserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
	{
		accountInfo: {
			email: { type: String, required: true },
			password: { type: String, required: true },
			name: { type: String, required: true },
			handler: { type: String, required: true },
			verifiedEmail: { type: Boolean, default: false }
		},
		personalInfo: {
			bio: { type: String, default: null },
			birthDate: { type: Date, default: null },
			interests: [{ type: Schema.Types.ObjectId, ref: "Field" }]
		},
		statusInfo: {
			isOnline: { type: Boolean, required: true, default: false },
			lastActive: { type: Date, default: null }
		}
	},
	{ timestamps: true, versionKey: "schemaVersion" }
);

// hooks
UserSchema.pre<IUserDocument>("save", async function () {
	if (this.isModified("accountInfo.password")) {
		this.accountInfo.password = await hash(this.accountInfo.password, 12);
	}
});

// instance methods
UserSchema.methods.comparePassword = function (password: string) {
	return compare(password, this.accountInfo.password);
};

// validators
UserSchema.path("accountInfo.handler").validate(async function (value: string) {
	const User = mongoose.model<IUserDocument, IUserModel>("User");
	return (await User.findOne({ "accountInfo.handler": value })) === null;
}, "Handler `{VALUE}` already exist");

UserSchema.path("accountInfo.email").validate(async function (value) {
	const User = mongoose.model<IUserDocument, IUserModel>("User");
	return (await User.findOne({ "accountInfo.email": value })) === null;
}, "Email `{VALUE}` already registered.");

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
