import { Document, Model, Schema, Types } from "mongoose";

type Nullable<T> = T | null;

interface IAccountInfo {
	email: string;
	password: string;
	handler: string;
	name: string;
	verifiedEmail: boolean;
}

interface IPersonalInfo {
	bio: Nullable<string>;
	birthDate: Nullable<Date>;
	interests: Types.Array<string> | string[];
}

interface IStatusInfo {
	isOnline: boolean;
	lastActive: Nullable<Date>;
}

export interface IUserBaseDocument extends Document {
	accountInfo: IAccountInfo;
	personalInfo: IPersonalInfo;
	statusInfo: IStatusInfo;
	conversations: Types.Array<Types.ObjectId>;
}

export interface IUserDocument extends IUserBaseDocument {
	comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}
