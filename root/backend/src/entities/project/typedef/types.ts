import { ISkill, ISkillIdInput } from "../../skill/typedef";
import { IUser } from "../../user/typedef";

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

enum IProjectState {
	OPEN,
	CLOSED,
	STARTED,
	ENDED
}

export interface IProject {
	id: string;
	details: IProjectDetails;
	state: IProjectState;
}
