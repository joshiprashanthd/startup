import { IField } from "../../field/model";
import { IFieldIdInput } from "../../field/typedef";

type Nullable<T> = T | null;

export interface IStrictUserInput {
	accountInfo: Omit<IAccountInfo, "verifiedEmail">;
}

export interface ILooseUserInput {
	userId: IUser["id"];
	accountInfo?: Omit<Partial<IAccountInfo>, "verifiedEmail">;
	personalInfo?: Partial<IPersonalInfo>;
}

// base IUser
interface IAccountInfo {
	name: string;
	email: Nullable<string>;
	password: Nullable<string>;
	handler: string;
	verifiedEmail: boolean;
}

interface IPersonalInfo {
	bio: Nullable<string>;
	birthDate: Nullable<Date>;
	interests: Nullable<IField[]> | IFieldIdInput[] | (() => Promise<IField[]>);
}

interface IStatusInfo {
	lastOnline: Nullable<Date>;
	isOnline: boolean;
}

export interface IUser {
	id: string;
	accountInfo: IAccountInfo;
	personalInfo: IPersonalInfo;
	status: IStatusInfo;
}
