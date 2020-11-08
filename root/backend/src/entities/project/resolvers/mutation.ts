import { IContext } from "../../../types";
import { mapProject } from "../mapper";
import { IProjectDocument, Project } from "../model";
import { IStrictProjectInput } from "../typedef/types";

type DeepPartial<T> = {
	[K in keyof T]?: Partial<T[K]>;
};

export default {
	Mutation: {
		createProject: async (
			parent: any,
			args: { input: IStrictProjectInput },
			context: IContext,
			info: any
		) => {
			const skillSet = args.input.details.skillSet as any;
			const input = {
				details: {
					...args.input.details,
					skillSet: skillSet.map(obj => obj.skillId),
					creator: context.req.session.userId
				}
			};

			const project = await Project.create<DeepPartial<IProjectDocument>>(
				input
			);

			return mapProject(project, context);
		}
	}
};
