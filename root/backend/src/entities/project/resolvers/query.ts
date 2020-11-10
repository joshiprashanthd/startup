import { IContext } from "../../../types";
import { User } from "../../user/model";
import { mapProject } from "../mapper";
import { Project } from "../model";

export default {
	Query: {
		projects: async (parent: any, args: any, context: IContext, info: any) =>
			(await Project.find({})).map(project => mapProject(project, context)),
		projectsByUserInterests: async (
			parent: any,
			args: { userId: string },
			context: IContext,
			info: any
		) => {
			const user = await User.findById(args.userId);
			const skillIds = user.personalInfo.interests;
			console.log(skillIds);
			return (
				await Project.find({ "details.skillSet": { $in: skillIds } })
			).map(project => mapProject(project, context));
		}
	}
};
