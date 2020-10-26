import { Model, Document, Types } from "mongoose";

export interface IConversationBaseDocument extends Document {
	converserOne: Types.ObjectId;
	converserTwo: Types.ObjectId;
	messages: Types.Array<Types.ObjectId>;
	createdAt: Date;
	updatedAt: Date;
}

export interface IConversationDocument extends IConversationBaseDocument {}

export interface IConversationModel extends Model<IConversationDocument> {}
