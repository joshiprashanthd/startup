import mongoose, { Document, Query, Model } from "mongoose";

export interface User {
	email: string;
	password: string;
	handler: string;
	name: string;
	lastActive?: Date;
}

interface UserBaseDocument extends User, Document {
	email: string;
	password: string;
	handler: string;
	name: string;
	lastActive?: Date;
}

export interface UserDocument extends UserBaseDocument {}

export interface UserModel extends Model<UserDocument> {}
