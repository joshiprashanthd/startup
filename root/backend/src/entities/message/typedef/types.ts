import { IConversation } from "../../conversation/typedef";
import { IUser } from "../../user/typedef";

export interface IMessage {
	id: string;
	sender: IUser | (() => Promise<IUser>);
	receiver: IUser | (() => Promise<IUser>);
	body: string;
	read: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IStrictMessageInput {
	senderId: string;
	receiverId: string;
	body: string;
}
