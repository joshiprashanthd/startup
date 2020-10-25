import { IContext } from "../../../types";
import { mapSkills } from "../mapper";
import { Skill } from "../model";

export default {
	Query: {
		skills: async (parent: any, args: any, context: IContext, info: any) =>
			mapSkills(await Skill.find({}))
	}
};
