import mongoose from "mongoose";

//local
import { ISkillDocument, ISkillModel } from "./types";

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	}
});

export default mongoose.model<ISkillDocument, ISkillModel>(
	"Skill",
	SkillSchema
);
