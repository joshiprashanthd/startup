import UserLoader from "./user";
import SkillLoader from "./skill";
import MessageLoader from "./message";

export interface IDataloaders {
	userLoader: ReturnType<typeof UserLoader>;
	skillLoader: ReturnType<typeof SkillLoader>;
	messageLoader: ReturnType<typeof MessageLoader>;
}

export default {
	userLoader: UserLoader(),
	skillLoader: SkillLoader(),
	messageLoader: MessageLoader()
} as IDataloaders;
