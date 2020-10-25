import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import { ISkillDocument, ISkillModel } from "../entities/skill/model";

async function batchSkills(ids: string[]): Promise<ISkillDocument[]> {
	const Skill = mongoose.model<ISkillDocument, ISkillModel>("Skill");
	const skills = await Skill.find({ _id: { $in: ids } });
	const groupedSkills = groupBy<ISkillDocument>(skill => skill.id, skills);
	return map(id => groupedSkills[id][0], ids);
}

export default () => new Dataloader<string, ISkillDocument>(batchSkills);
