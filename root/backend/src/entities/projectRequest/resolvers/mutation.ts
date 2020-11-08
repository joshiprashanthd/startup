//local
import { IContext } from "../../../types";
import { mapProjectRequest } from "../mapper";
import { ProjectRequest } from "../model";

export default {
	Mutation: {
		requestProject: async (
			parent: any,
			args: { message: string; projectId: string },
			context: IContext,
			info: any
		) => {
			const projectRequest = await ProjectRequest.create({
				from: context.req.session.userId,
				to: args.projectId,
				message: args.message,
				status: "PENDING"
			});

			return mapProjectRequest(projectRequest, context);
		}
	}
};
