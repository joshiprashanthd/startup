import { IContext } from "../../types";
import { ISkillDocument } from "./model";
import { ISkill } from "./typedef";

export const mapSkill = (skill: ISkillDocument): ISkill => {
	return {
		id: skill.id,
		name: skill.name,
		color: skill.color,
		description: skill.description
	};
};

export const mapSkillIds = (
	ids: string[],
	context: IContext
): (() => Promise<ISkill[]>) => async () =>
	(await context.dataloaders.skillLoader.loadMany(ids)).map(skill =>
		mapSkill(skill as ISkillDocument)
	);
