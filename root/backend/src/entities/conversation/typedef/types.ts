import { IUser } from "../../user/typedef";

export interface IConversation {
	id: string;
	converserOne: IUser;
	converserTwo: IUser;
	messages: any[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IStrictConversationInput {
	converserOne: string;
	converserTwo: string;
	body: string;
}
