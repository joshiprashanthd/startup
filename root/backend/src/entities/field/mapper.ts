import { IFieldDocument } from "./model";
import { IFieldType } from "./typedef";

export const mapField = (field: IFieldDocument): IFieldType => {
	return {
		id: field.id,
		name: field.name,
		color: field.color,
		description: field.description
	};
};

export const mapFields = (fields: IFieldDocument[]): IFieldType[] =>
	fields.map(doc => mapField(doc));
