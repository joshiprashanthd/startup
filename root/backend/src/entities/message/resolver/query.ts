import { IContext } from "../../../types";
import { mapMessage } from "../mapper";
import { Message } from "../model";

export default {
	Query: {
		messages: async (parent: any, args: any, context: IContext, info: any) =>
			(await Message.find({})).map(message => mapMessage(message, context))
	}
};
