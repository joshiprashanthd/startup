export interface ISkill {
	id: string;
	name: string;
	description: string;
	color: string;
}

export interface ISkillIdInput {
	skillId: string;
}

export interface IStrictSkillInput extends Omit<ISkill, "id"> {}

export interface ILooseSkillInput extends Omit<Partial<ISkill>, "id"> {
	skillId: string;
}
