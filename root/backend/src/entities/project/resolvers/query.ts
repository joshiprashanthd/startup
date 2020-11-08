import { IContext } from "../../../types";
import { mapProject } from "../mapper";
import { Project } from "../model";

export default {
	Query: {
		projects: async (parent: any, args: any, context: IContext, info: any) =>
			(await Project.find({})).map(project => mapProject(project, context))
	}
};
