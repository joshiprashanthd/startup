import { ISkill, ISkillIdInput } from "../../skill/typedef";
import { IUser } from "../../user/typedef";
import { ProjectStateEnum } from "../model/types";

type Nullable<T> = T | null;

export interface IStrictProjectInput {
	details: Omit<IProjectDetails, "stars" | "creator">;
}

export interface ILooseProjectDetailsInput {}

interface IProjectDetails {
	title: string;
	description: string;
	startingOn: Date;
	maxTeamMembers: number;
	duration: number;
	creator: IUser | (() => Promise<IUser>);
	skillSet: ISkill[] | ISkillIdInput[] | (() => Promise<ISkill[]>);
	stars: Nullable<IUser[]> | (() => Promise<IUser[]>);
}

export interface IProject {
	id: string;
	details: IProjectDetails;
	state: ProjectStateEnum;
	createdAt: Date;
	updatedAt: Date;
}
