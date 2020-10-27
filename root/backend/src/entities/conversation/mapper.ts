import { IContext } from "../../types";
import { mapMessages } from "../message/mapper";
import { IMessageDocument } from "../message/model";
import { mapUser } from "../user/mapper";
import { Conversation, IConversationDocument } from "./model";
import { IConversation } from "./typedef";

export const mapConversation = (
	conversation: IConversationDocument,
	context: IContext
): IConversation => ({
	id: conversation.id,
	converserOne: async () =>
		mapUser(
			await context.dataloaders.userLoader.load(
				conversation.converserOne.toString()
			),
			context
		),
	converserTwo: async () =>
		mapUser(
			await context.dataloaders.userLoader.load(
				conversation.converserTwo.toString()
			),
			context
		),
	messages: async () =>
		mapMessages(
			(await context.dataloaders.messageLoader.loadMany(
				conversation.messages.map(message => message.toString())
			)) as IMessageDocument[],
			context
		),
	createdAt: conversation.createdAt,
	updatedAt: conversation.updatedAt
});

export const mapConversations = (
	conversations: IConversationDocument[],
	context: IContext
) => conversations.map(conversation => mapConversation(conversation, context));
