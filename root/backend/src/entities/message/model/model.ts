import mongoose from "mongoose";

//local
import { IMessageDocument, IMessageModel } from "./types";

const Schema = mongoose.Schema;

const MessageSchema = new Schema<IMessageDocument>(
	{
		sender: { type: Schema.Types.ObjectId, ref: "User" },
		receiver: { type: Schema.Types.ObjectId, ref: "User" },
		body: { type: String, required: true },
		read: { type: Boolean, required: true, default: false }
	},
	{ timestamps: true }
);

export default mongoose.model<IMessageDocument, IMessageModel>(
	"Message",
	MessageSchema
);
