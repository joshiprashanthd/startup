import { IContext } from "../../types";
import { mapUserId } from "../user/mapper";
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
	sender: mapUserId(message.sender.toString(), context),
	receiver: mapUserId(message.receiver.toString(), context)
});

export const mapMessageIds = (
	ids: string[],
	context: IContext
): (() => Promise<IMessage[]>) => async () =>
	(await context.dataloaders.messageLoader.loadMany(ids)).map(message =>
		mapMessage(message as IMessageDocument, context)
	);
