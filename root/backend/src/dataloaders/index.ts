import UserLoader from "./user";
import SkillLoader from "./skill";

export interface IDataloaders {
	userLoader: ReturnType<typeof UserLoader>;
	skillLoader: ReturnType<typeof SkillLoader>;
}

export default {
	userLoader: UserLoader(),
	skillLoader: SkillLoader()
} as IDataloaders;
