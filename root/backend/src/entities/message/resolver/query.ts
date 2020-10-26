import { IContext } from "../../../types";
import { mapMessages } from "../mapper";
import { Message } from "../model";

export default {
	Query: {
		messages: async (parent: any, args: any, context: IContext, info: any) =>
			mapMessages(await Message.find({}), context)
	}
};
