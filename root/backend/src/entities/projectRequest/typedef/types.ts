import { IProject } from "../../project/typedef";
import { IUser } from "../../user/typedef";
import { ProjectRequestStatusEnum } from "../model/types";

export interface IProjectRequest {
	id: string;
	from: IUser | (() => Promise<IUser>);
	to: IProject | (() => Promise<IProject>);
	message: string;
	status: ProjectRequestStatusEnum;
	createdAt: Date;
	updatedAt: Date;
}
