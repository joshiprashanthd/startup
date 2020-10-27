import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import {
	IConversationDocument,
	IConversationModel
} from "../entities/conversation/model";

async function batchConversations(
	ids: string[]
): Promise<IConversationDocument[]> {
	const Conversation = mongoose.model<
		IConversationDocument,
		IConversationModel
	>("Conversation");
	const conversations = await Conversation.find({ _id: { $in: ids } });
	const groupedConversations = groupBy<IConversationDocument>(
		conversation => conversation.id,
		conversations
	);
	return map(id => groupedConversations[id][0], ids);
}

export default () =>
	new Dataloader<string, IConversationDocument>(batchConversations);
