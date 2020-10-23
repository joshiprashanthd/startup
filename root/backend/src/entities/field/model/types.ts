import { Model, Document } from "mongoose";

interface IFieldBaseDocument extends Document {
	name?: string;
	description?: string;
	color?: string;
}

export interface IFieldDocument extends IFieldBaseDocument {}

export interface IFieldModel extends Model<IFieldDocument> {}
