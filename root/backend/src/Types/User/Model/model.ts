import mongoose from "mongoose";
import { hash } from "bcrypt";

// local
import { BooleanRequired, StringRequired } from "../../virtual_types";
import { IUserDocument, IUserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
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

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
