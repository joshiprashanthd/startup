//local
import { IContext } from "../../../types";
import { mapProjectRequest } from "../mapper";
import { ProjectRequest } from "../model";
import { IProjectRequestDocument } from "../model/types";

export default {
	Mutation: {
		requestProject: async (
			parent: any,
			args: { message: string; projectId: string },
			context: IContext,
			info: any
		) => {
			const projectRequest = await ProjectRequest.create<
				Partial<IProjectRequestDocument>
			>({
				from: context.req.session.userId,
				to: args.projectId,
				message: args.message,
				status: "PENDING"
			});

			return mapProjectRequest(projectRequest, context);
		}
	}
};
