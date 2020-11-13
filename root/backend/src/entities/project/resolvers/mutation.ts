import { ApolloError } from "apollo-server-express";
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
		},

		toggleStarProject: async (
			parent: any,
			args: { projectId: string },
			context: IContext,
			info: any
		) => {
			const project = await Project.findById(args.projectId);

			const isStarred = project.details.stars.includes(
				context.req.session.userId
			);

			if (isStarred)
				await project.updateOne({
					$pull: { "details.stars": context.req.session.userId }
				});
			else
				await project.updateOne({
					$push: { "details.stars": context.req.session.userId }
				});

			return !isStarred;
		}
	}
};
