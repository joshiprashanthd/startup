import mongoose from "mongoose";
import { hash } from "bcrypt";

// local
import { StringRequired } from "../../virtual_types";
import { UserDocument, UserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: StringRequired,
		password: StringRequired,
		handler: StringRequired,
		name: StringRequired,
		lastActive: Date
	},
	{ timestamps: true }
);

UserSchema.pre<UserDocument>("save", async function () {
	if (this.isModified("password")) {
		this.password = await hash(this.password, 15);
	}
});

export default mongoose.model<UserDocument, UserModel>("User", UserSchema);
