import { IContext } from "../../types";
import { mapMessageIds } from "../message/mapper";
import { mapUserId } from "../user/mapper";
import { IConversationDocument } from "./model";
import { IConversation } from "./typedef";

export const mapConversation = (
	conversation: IConversationDocument,
	context: IContext
): IConversation => ({
	id: conversation.id,
	converserOne: mapUserId(conversation.converserOne.toString(), context),
	converserTwo: mapUserId(conversation.converserTwo.toString(), context),
	messages: mapMessageIds(
		conversation.messages.map(id => id.toString()),
		context
	),
	createdAt: conversation.createdAt,
	updatedAt: conversation.updatedAt
});

export const mapConversations = (
	conversations: IConversationDocument[],
	context: IContext
) => conversations.map(conversation => mapConversation(conversation, context));
