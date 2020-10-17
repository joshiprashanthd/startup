import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

// local
import { IUserDocument, IUserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		handler: { type: String, required: true },
		name: { type: String, required: true },
		bio: { type: String, required: true },
		birthDate: Date,
		lastActive: { type: Date, default: null },
		isOnline: { type: Boolean, required: true, default: false }
	},
	{ timestamps: true }
);

UserSchema.pre<IUserDocument>("save", async function () {
	if (this.isModified("password")) {
		this.password = await hash(this.password, 15);
	}
});

UserSchema.methods.comparePassword = function (password: string) {
	return compare(password, this.password);
};

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
