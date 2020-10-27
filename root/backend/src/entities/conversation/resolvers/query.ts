import { IContext } from "../../../types";
import { mapConversations } from "../mapper";
import { Conversation } from "../model";

export default {
	Query: {
		conversationsByUser: async (
			parent: any,
			args: { converserId: string },
			context: IContext,
			info: any
		) => {},

		conversations: async (
			parent: any,
			args: any,
			context: IContext,
			info: any
		) => mapConversations(await Conversation.find({}), context)
	}
};
