import mongoose, { Document, Query, Model } from "mongoose";

export interface IUser {
	email: string;
	password: string;
	handler: string;
	name: string;
	lastActive?: Date;
}

interface IUserBaseDocument extends IUser, Document {
	email: string;
	password: string;
	handler: string;
	name: string;
	lastActive?: Date;
}

export interface IUserDocument extends IUserBaseDocument {}

export interface IUserModel extends Model<IUserDocument> {}
