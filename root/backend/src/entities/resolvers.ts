import { UserResolvers } from "./user";
import { SkillResolvers } from "./skill";
import { MessageResolvers } from "./message";
import { ConversationResolvers } from "./conversation";
import { CustomScalarResolvers } from "./customScalars";

export default [
	UserResolvers,
	SkillResolvers,
	CustomScalarResolvers,
	MessageResolvers,
	ConversationResolvers
];
