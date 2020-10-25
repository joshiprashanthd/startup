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

export const mapSkills = (skills: ISkillDocument[]): ISkill[] =>
	skills.map(doc => mapSkill(doc));
