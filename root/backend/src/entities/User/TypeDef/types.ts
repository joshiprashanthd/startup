import { IField } from "../../field/model";
import { IFieldIdInput } from "../../field/typedef";
import { IUser } from "../model";

type Nullable<T> = T | null;

export interface IStrictUserInput extends Pick<IUser, keyof IUser> {
	email: string;
	password: string;
	handler: string;
	name: string;
	birthDate: Date;
}

export interface ILooseUserInput {
	userId: string;
	handler?: string;
	email?: string;
	password?: string;
	name?: string;
	birthDate?: Date;
	interests?: IFieldIdInput[];
}

export interface IUserType {
	id: string;
	name: string;
	email: Nullable<string>;
	password: Nullable<string>;
	handler: string;
	bio: Nullable<string>;
	birthDate: Date;
	isOnline: boolean;
	lastActive: Nullable<Date>;
	verifiedAccount: boolean;
	interests: Nullable<IField[]>;
}
