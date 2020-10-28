import { IMessage } from "../../message/typedef";
import { IUser } from "../../user/typedef";

export interface IConversation {
	id: string;
	conversers: IUser[] | (() => Promise<IUser[]>);
	messages: IMessage[] | (() => Promise<IMessage[]>);
	createdAt: Date;
	updatedAt: Date;
}
