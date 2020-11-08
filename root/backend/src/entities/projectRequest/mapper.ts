import { IContext } from "../../types";
import { Project } from "../project/model";
import { mapUserId } from "../user/mapper";
import { IProjectRequestDocument } from "./model/types";

export const mapProjectRequest = (
	projectRequest: IProjectRequestDocument,
	context: IContext
) => ({
	id: projectRequest.id,
	from: mapUserId(projectRequest.from, context),
	to: async () => Project.findById(projectRequest.to),
	message: projectRequest.message,
	status: projectRequest.status,
	createdAt: projectRequest.createdAt,
	updatedAt: projectRequest.updatedAt
});
