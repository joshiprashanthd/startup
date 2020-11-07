import mongoose from "mongoose";
import { IProjectDocument, IProjectModel } from "./types";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema<IProjectDocument>({
	details: {
		title: { type: String, required: true },
		description: { type: String, required: true },
		startingOn: { type: Date, required: true },
		duration: { type: Number, required: true },
		maxTeamMembers: { type: Number, required: true },
		creator: { type: Schema.Types.ObjectId, ref: "User" },
		skillSet: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
		stars: [{ type: Schema.Types.ObjectId, ref: "User" }]
	},
	state: {
		type: String,
		enum: ["OPEN", "CLOSED", "STARTED", "ENDED"],
		default: "OPEN"
	}
});

export default mongoose.model<IProjectDocument, IProjectModel>(
	"Project",
	ProjectSchema
);
