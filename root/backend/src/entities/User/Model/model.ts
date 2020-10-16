import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

// local
import {
	BooleanRequired,
	StringRequired
} from "../../../helpers/virtual_types";
import { IUser, IUserDocument, IUserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
	{
		email: StringRequired,
		password: StringRequired,
		handler: StringRequired,
		name: StringRequired,
		bio: StringRequired,
		birthDate: Date,
		lastActive: { type: Date, default: null },
		isOnline: { ...BooleanRequired, default: false }
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
