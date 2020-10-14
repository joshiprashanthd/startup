import mongoose, { Document, Query, Model } from "mongoose";

export interface IUser {
	email: string;
	password: string;
	handler: string;
	name: string;
	bio: string;
	birthDate: Date;
	lastActive?: Date;
	isOnline: Boolean;
}

interface IUserBaseDocument extends IUser, Document {
	email: string;
	password: string;
	handler: string;
	name: string;
	bio: string;
	birthDate: Date;
	lastActive?: Date;
	isOnline: Boolean;
}

export interface IUserDocument extends IUserBaseDocument {}

export interface IUserModel extends Model<IUserDocument> {}
