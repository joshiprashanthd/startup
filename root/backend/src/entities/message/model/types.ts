import { Document, Model, Types } from "mongoose";

export interface IMessageBaseDocument extends Document {
	sender: Types.ObjectId;
	receiver: Types.ObjectId;
	body: string;
	read: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IMessageDocument extends IMessageBaseDocument {}

export interface IMessageModel extends Model<IMessageDocument> {}
