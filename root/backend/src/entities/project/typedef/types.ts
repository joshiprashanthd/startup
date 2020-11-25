import { IProjectRequest } from "../../projectRequest/typedef";
import { ISkill, ISkillIdInput } from "../../skill/typedef";
import { IUser } from "../../user/typedef";
import { ProjectStateEnum } from "../model/types";

type Nullable<T> = T | null;

export interface IStrictProjectInput {
	details: Omit<IProjectDetails, "stars" | "creator" | "requests">;
}

export interface ILooseProjectInput {
	details?: Omit<Partial<IProjectDetails>, "stars" | "creator" | "requests">;
}

interface IProjectDetails {
	title: string;
	description: string;
	startingOn: Date;
	maxTeamMembers: number;
	duration: number;
	creator: IUser | (() => Promise<IUser>);
	skillSet: ISkill[] | ISkillIdInput[] | (() => Promise<ISkill[]>);
	stars: Nullable<IUser[]> | (() => Promise<IUser[]>);
	requests: Nullable<IProjectRequest[]> | (() => Promise<IProjectRequest[]>);
}

export interface IProject {
	id: string;
	details: IProjectDetails;
	state: ProjectStateEnum;
	isStarred: boolean;
	isRequested: boolean | (() => Promise<boolean>);
	createdAt: Date;
	updatedAt: Date;
}
