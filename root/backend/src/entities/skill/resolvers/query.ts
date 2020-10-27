import { IContext } from "../../../types";
import { mapSkill } from "../mapper";
import { Skill } from "../model";

export default {
	Query: {
		skills: async (parent: any, args: any, context: IContext, info: any) =>
			(await Skill.find({})).map(skill => mapSkill(skill))
	}
};
