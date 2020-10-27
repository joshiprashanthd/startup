import { IContext } from "../../../types";
import { IMessageDocument, Message } from "../../message/model";
import { mapConversation } from "../mapper";
import { Conversation, IConversationDocument } from "../model";
import { IStrictConversationInput } from "../typedef";

export default {
	Mutation: {
		createConversation: async (
			parent: any,
			args: { input: IStrictConversationInput },
			context: IContext,
			info: any
		) => {
			const newMessage = await Message.create<Partial<IMessageDocument>>({
				sender: args.input.converserOne,
				receiver: args.input.converserTwo,
				body: args.input.body
			});

			const conversation = await Conversation.create<
				Partial<IConversationDocument>
			>({
				converserOne: args.input.converserOne,
				converserTwo: args.input.converserTwo,
				messages: [newMessage.id]
			});

			return mapConversation(conversation, context);
		}
	}
};
