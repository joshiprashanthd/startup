import { Document, Model, NativeDate, Schema, Types } from "mongoose";

type Nullable<T> = T | null;

export interface IUser {
	email: string;
	password: string;
	handler: string;
	name: string;
	bio: string;
	birthDate: Date;
	lastActive: Nullable<Date>;
	isOnline: boolean;
	verifiedAccount: boolean;
	interests: string[];
}

interface IUserBaseDocument extends IUser, Document {
	interests: Types.Array<string>;
	birthDate: NativeDate;
	lastActive: Nullable<NativeDate>;
}

export interface IUserDocument extends IUserBaseDocument {
	comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}
