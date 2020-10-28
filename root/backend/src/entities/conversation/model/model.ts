import mongoose from "mongoose";

//local
import { IConversationDocument, IConversationModel } from "./types";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema<IConversationDocument>(
	{
		conversers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "Message"
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.model<IConversationDocument, IConversationModel>(
	"Conversation",
	ConversationSchema
);
