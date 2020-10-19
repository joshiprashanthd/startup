export interface IFieldType {
	name: string;
	description: string;
	color: string;
}

export interface IFieldIdInput {
	fieldId: string;
}

export interface IStrictFieldInput {
	name: string;
	description: string;
	color: string;
}

export interface ILooseFieldInput {
	name?: string;
	description?: string;
	color?: string;
}
