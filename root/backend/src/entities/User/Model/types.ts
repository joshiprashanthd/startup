import { Document, Model, NativeDate, Schema, Types } from "mongoose";

type Nullable<T> = T | null;

export interface IAccountInfo {
	email?: string;
	password?: string;
	handler?: string;
	name?: string;
	verifiedEmail?: boolean;
}

export interface IPersonalInfo {
	bio?: string;
	birthDate?: NativeDate;
	interests?: Types.Array<string> | string[];
}

export interface IStatus {
	isOnline?: boolean;
	lastActive?: Nullable<NativeDate>;
}

export interface IUserBaseDocument extends Document {
	accountInfo?: IAccountInfo;
	personalInfo?: IPersonalInfo;
	status?: IStatus;
}

export interface IUserDocument extends IUserBaseDocument {
	comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}
