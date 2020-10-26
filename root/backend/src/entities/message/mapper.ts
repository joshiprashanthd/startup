import { IContext } from "../../types";
import { mapUser } from "../user/mapper";
import { IMessageDocument } from "./model";
import { IMessage } from "./typedef";

export const mapMessage = (
	message: IMessageDocument,
	context: IContext
): IMessage => ({
	id: message.id,
	body: message.body,
	read: message.read,
	createdAt: message.createdAt,
	updatedAt: message.updatedAt,
	sender: async () =>
		mapUser(
			await context.dataloaders.userLoader.load(message.sender.toString()),
			context
		),
	receiver: async () =>
		mapUser(
			await context.dataloaders.userLoader.load(message.receiver.toString()),
			context
		)
});

export const mapMessages = (
	messages: IMessageDocument[],
	context: IContext
): IMessage[] => messages.map(message => mapMessage(message, context));
