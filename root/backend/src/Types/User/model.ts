import mongoose, { Model, Document } from "mongoose";

// local
import { StringRequired } from "../virtual_types";

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

export default mongoose.model("User", UserSchema);
