import { Model, Document } from "mongoose";

interface ISkillBaseDocument extends Document {
	name: string;
	description: string;
	color: string;
}

export interface ISkillDocument extends ISkillBaseDocument {}

export interface ISkillModel extends Model<ISkillDocument> {}
