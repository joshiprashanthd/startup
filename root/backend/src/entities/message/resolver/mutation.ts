import { Schema } from "mongoose";
import { sendVerificationEmail } from "../../../helpers/functions/sendVerificationEmail";
import { IContext } from "../../../types";
import { Conversation } from "../../conversation/model";
import { mapMessage } from "../mapper";
import { IMessageDocument, Message } from "../model";
import { IStrictMessageInput } from "../typedef";

export default {
	Mutation: {
		createMessage: async (
			parent: any,
			args: { input: IStrictMessageInput },
			context: IContext,
			info: any
		) => {
			const message = await Message.create<Partial<IMessageDocument>>({
				sender: args.input.senderId,
				receiver: args.input.receiverId,
				body: args.input.body
			});

			const conversation = await Conversation.findOne({
				$or: [
					{
						converserOne: args.input.senderId as any,
						converserTwo: args.input.receiverId as any
					},
					{
						converserOne: args.input.receiverId as any,
						converserTwo: args.input.senderId as any
					}
				]
			});

			console.log(conversation);

			return mapMessage(message, context);
		},

		editMessage: async (
			parent: any,
			args: { body: string; messageId: string },
			context: IContext,
			info: any
		) => {
			const message = await Message.findByIdAndUpdate(
				args.messageId,
				{ body: args.body },
				{ new: true }
			);

			return mapMessage(message, context);
		},

		removeMessage: async (
			parent: any,
			args: { messageId: string },
			context: IContext,
			info: any
		) => {
			const result = await Message.findByIdAndDelete(args.messageId);
			if (result) return true;
			return false;
		}
	}
};
