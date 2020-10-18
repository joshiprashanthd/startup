import { Document, Model, NativeDate } from "mongoose";

export interface IToken {
	email: string;
	userId: string;
	token: string;
	date: Date;
}

interface ITokenBaseDocument extends IToken, Document {
	date: NativeDate;
}

export interface ITokenDocument extends ITokenBaseDocument {}

export interface ITokenModel extends Model<ITokenDocument> {}
