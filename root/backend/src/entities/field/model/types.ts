import { Model, Document } from "mongoose";

export interface IField {
	name: string;
	description: string;
	color: string;
}

interface IFieldBaseDocument extends IField, Document {}

export interface IFieldDocument extends IFieldBaseDocument {}

export interface IFieldModel extends Model<IFieldDocument> {}
