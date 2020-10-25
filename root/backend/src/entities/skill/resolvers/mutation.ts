import { Skill } from "../model";
import { IStrictSkillInput } from "../typedef";

export default {
	Mutation: {
		createSkill: (
			parent: any,
			args: { input: IStrictSkillInput },
			context: any,
			info: any
		) => {
			return Skill.create(args.input);
		}
	}
};
