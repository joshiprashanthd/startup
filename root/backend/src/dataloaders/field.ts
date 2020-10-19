import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import { IFieldDocument } from "../entities/field/model";

async function batchFields(ids: string[]): Promise<IFieldDocument[]> {
	const Field = mongoose.model("Field");
	const fields = await Field.find({ _id: { $in: ids } });
	const groupedFields = groupBy(field => field.id, fields);
	return map(id => groupedFields[id], ids);
}

export default () => new Dataloader<string, IFieldDocument>(batchFields);
