import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import { IMessageDocument, IMessageModel } from "../entities/message/model";

async function batchMessages(ids: string[]): Promise<IMessageDocument[]> {
	const Message = mongoose.model<IMessageDocument, IMessageModel>("Message");
	const messages = await Message.find({ _id: { $in: ids } });
	const groupedMessages = groupBy<IMessageDocument>(
		message => message.id,
		messages
	);
	return map(id => groupedMessages[id][0], ids);
}

export default () => new Dataloader<string, IMessageDocument>(batchMessages);
