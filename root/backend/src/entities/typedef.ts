import { RootTypeDef } from "./root";
import { UserTypeDef } from "./user";
import { SkillTypeDef } from "./skill";
import { CustomScalarTypeDef } from "./customScalars";
import { DirectivesTypeDef } from "./customDirectives";

export default [
	CustomScalarTypeDef,
	DirectivesTypeDef,
	...RootTypeDef,
	...UserTypeDef,
	...SkillTypeDef
];
