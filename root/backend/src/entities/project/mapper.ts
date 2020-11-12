import { IContext } from "../../types";
import { mapProjectRequest } from "../projectRequest/mapper";
import { ProjectRequest } from "../projectRequest/model";
import { mapSkillIds } from "../skill/mapper";
import { mapUserId, mapUserIds } from "../user/mapper";
import { IProjectDocument, Project } from "./model";
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
		stars: mapUserIds(project.details.stars, context),
		requests: async () =>
			(await ProjectRequest.find({ to: project.id })).map(request =>
				mapProjectRequest(request, context)
			) as any
	},
	isStarredByMe: project.details.stars.includes(context.req.session.userId),
	state: project.state,
	createdAt: project.createdAt,
	updatedAt: project.updatedAt
});
