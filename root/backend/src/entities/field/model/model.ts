import mongoose from "mongoose";

//local
import { IFieldDocument, IFieldModel } from "./types";

const Schema = mongoose.Schema;

const FieldSchema = new Schema({
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

export default mongoose.model<IFieldDocument, IFieldModel>(
	"Field",
	FieldSchema
);
