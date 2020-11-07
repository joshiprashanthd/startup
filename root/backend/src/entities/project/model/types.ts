import { Document, Model } from "mongoose";

type Nullable<T> = T | null;

interface IProjectDetails {
	title: string;
	description: string;
	startingOn: Date;
	duration: number;
	maxTeamMembers: number;
	creator: string;
	skillSet: string[];
	stars: string[];
}

enum ProjectState {
	OPEN,
	CLOSED,
	STARTED,
	ENDED
}

export interface IProjectBaseDocument extends Document {
	details: IProjectDetails;
	state: ProjectState;
}

export interface IProjectDocument extends IProjectBaseDocument {}

export interface IProjectModel extends Model<IProjectDocument> {}
