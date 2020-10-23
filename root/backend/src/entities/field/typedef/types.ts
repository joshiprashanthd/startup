import { IField } from "../model";

export interface IField {
	id: string;
	name: string;
	description: string;
	color: string;
}

export interface IFieldIdInput {
	fieldId: string;
}

export interface IStrictFieldInput extends Omit<IField, "id"> {}

export interface ILooseFieldInput extends Omit<Partial<IField>, "id"> {
	fieldId: string;
}
