import mongoose from "mongoose";

//local
import { IProjectRequestDocument, IProjectRequestModel } from "./types";

const Schema = mongoose.Schema;

const ProjectRequestSchema = new Schema(
	{
		from: { type: Schema.Types.ObjectId, ref: "User" },
		to: { type: Schema.Types.ObjectId, ref: "Project" },
		message: String,
		status: {
			type: String,
			enum: ["PENDING", "ACCEPTED", "DENIED"],
			required: true,
			default: "PENDING"
		}
	},
	{ timestamps: true }
);

export default mongoose.model<IProjectRequestDocument, IProjectRequestModel>(
	"ProjectRequest",
	ProjectRequestSchema
);
