import { RootTypeDef } from "./root";
import { UserTypeDef } from "./user";
import { FieldTypeDef } from "./field";
import { CustomScalarTypeDef } from "./customScalars";
import { DirectivesTypeDef } from "./customDirectives";

export default [
	CustomScalarTypeDef,
	DirectivesTypeDef,
	...RootTypeDef,
	...UserTypeDef,
	...FieldTypeDef
];
