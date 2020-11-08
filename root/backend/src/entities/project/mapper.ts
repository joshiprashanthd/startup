import { IContext } from "../../types";
import { mapSkillIds } from "../skill/mapper";
import { mapUserId, mapUserIds } from "../user/mapper";
import { IProjectDocument } from "./model";
import { IProject } from "./typedef/types";

export const mapProject = (
	project: IProjectDocument,
	context: IContext
): IProject => ({
	id: project.id,
	details: {
		...project.details,
		skillSet: mapSkillIds(project.details.skillSet, context),
		creator: mapUserId(project.details.creator, context),
		stars: mapUserIds(project.details.stars, context)
	},
	state: project.state,
	createdAt: project.createdAt,
	updatedAt: project.updatedAt
});
