import { IContext } from "../../../types";
import { mapProjectRequest } from "../mapper";
import { ProjectRequest } from "../model";

export default {
	Query: {
		projectRequests: async (
			parent: any,
			args: any,
			context: IContext,
			info: any
		) =>
			(await ProjectRequest.find({})).map(projectRequest =>
				mapProjectRequest(projectRequest, context)
			)
	}
};
