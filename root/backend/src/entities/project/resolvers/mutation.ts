import { ApolloError } from "apollo-server-express";
import { ProjectTypeDef } from "..";
import { attemptSignIn } from "../../../helpers/functions/authentication";
import { IContext } from "../../../types";
import { mapProject } from "../mapper";
import { IProjectDocument, Project } from "../model";
import { ILooseProjectInput, IStrictProjectInput } from "../typedef/types";

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

		editProject: async (
			parent: any,
			args: { input: ILooseProjectInput },
			context: IContext,
			info: any
		) => {
			const project = await Project.findById(args.input.projectId);

			if (!project) throw new ApolloError("Project not found.");

			if (
				project.details.creator.toString() !==
				context.req.session.userId.toString()
			)
				throw new ApolloError("You cannot edit this project.");

			let skillSet = project.details.skillSet;

			if ("skillSet" in args.input.details) {
				const set = args.input.details.skillSet as any;
				skillSet = set.map(obj => obj.skillId);
			}

			const doc = {
				details:
					"details" in args.input
						? {
								...project.toObject().details,
								...args.input.details,
								skillSet
						  }
						: project.toObject().details
			};

			await project.updateOne(doc, (err, raw) => {
				if (err) throw new ApolloError(err);
			});

			return mapProject(Object.assign(project, doc), context);
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
