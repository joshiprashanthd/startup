import { RootTypeDef } from "./root";
import { UserTypeDef } from "./user";
import { ConversationTypeDef } from "./conversation";
import { MessageTypeDef } from "./message";
import { SkillTypeDef } from "./skill";
import { ProjectTypeDef } from "./project";
import { CustomScalarTypeDef } from "./customScalars";
import { DirectivesTypeDef } from "./customDirectives";

export default [
	CustomScalarTypeDef,
	DirectivesTypeDef,
	RootTypeDef,
	UserTypeDef,
	SkillTypeDef,
	MessageTypeDef,
	ProjectTypeDef,
	ConversationTypeDef
];
