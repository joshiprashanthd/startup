import { Model, Document, Types } from "mongoose";

export interface IConversationBaseDocument extends Document {
	conversers: Types.Array<Types.ObjectId>;
	messages: Types.Array<Types.ObjectId>;
	createdAt: Date;
	updatedAt: Date;
}

export interface IConversationDocument extends IConversationBaseDocument {}

export interface IConversationModel extends Model<IConversationDocument> {}
