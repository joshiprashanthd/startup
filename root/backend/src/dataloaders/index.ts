import UserLoader from "./user";
import SkillLoader from "./skill";
import MessageLoader from "./message";
import ConversationLoader from "./conversation";

export interface IDataloaders {
	userLoader: ReturnType<typeof UserLoader>;
	skillLoader: ReturnType<typeof SkillLoader>;
	messageLoader: ReturnType<typeof MessageLoader>;
	conversationLoader: ReturnType<typeof ConversationLoader>;
}

export default {
	userLoader: UserLoader(),
	skillLoader: SkillLoader(),
	messageLoader: MessageLoader(),
	conversationLoader: ConversationLoader()
} as IDataloaders;
