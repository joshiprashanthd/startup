import { Document, Model } from "mongoose";

export enum ProjectRequestStatusEnum {
	PENDING = "PENDING",
	ACCEPTED = "ACCEPTED",
	DENIED = "DENIED"
}

export interface IProjectRequestBaseDocument extends Document {
	from: string;
	to: string;
	message: string;
	status: ProjectRequestStatusEnum;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProjectRequestDocument extends IProjectRequestBaseDocument {}

export interface IProjectRequestModel extends Model<IProjectRequestDocument> {}
