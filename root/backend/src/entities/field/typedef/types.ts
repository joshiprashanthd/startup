import { IField } from "../model";

export interface IFieldType {
	id: string;
	name: string;
	description: string;
	color: string;
}

export interface IFieldIdInput {
	fieldId: string;
}

export interface IStrictFieldInput extends Pick<IField, keyof IField> {
	name: string;
	description: string;
	color: string;
}

export interface ILooseFieldInput {
	fieldId: string;
	name?: string;
	description?: string;
	color?: string;
}
