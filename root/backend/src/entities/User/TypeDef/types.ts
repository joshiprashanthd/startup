import { PartialDeep } from "type-fest";

//local
import { ISkill, ISkillIdInput } from "../../skill/typedef";

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
	interests: Nullable<ISkill[]> | ISkillIdInput[] | (() => Promise<ISkill[]>);
}

interface IStatusInfo {
	lastActive: Nullable<Date>;
	isOnline: boolean;
}

export interface IUser {
	id: string;
	accountInfo: IAccountInfo;
	personalInfo: IPersonalInfo;
	statusInfo: IStatusInfo;
}
