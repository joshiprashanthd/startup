import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

// local
import { IUserDocument, IUserModel } from "./types";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
	{
		email: {
			type: String,
			required: true,
			validate: {
				validator: async email =>
					(await mongoose
						.model<IUserDocument, IUserModel>("User")
						.findOne({ email })) === null,
				message: props => `Email ${props} is already registered.`
			}
		},
		password: { type: String, required: true },
		handler: {
			type: String,
			required: true,
			validate: {
				validator: async handler =>
					(await mongoose
						.model<IUserDocument, IUserModel>("User")
						.findOne({ handler })) === null,
				message: props =>
					`Handler ${props} is already exist. Choose a different one.`
			}
		},
		name: { type: String, required: true },
		bio: String,
		birthDate: Date,
		lastActive: { type: Date, default: null },
		isOnline: { type: Boolean, required: true, default: false },
		verifiedAccount: { type: Boolean, require: true, default: false },
		interests: [{ type: Schema.Types.ObjectId, ref: "Field" }]
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
