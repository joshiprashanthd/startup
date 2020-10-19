import { RootTypeDef } from "./root";
import { UserTypeDef } from "./user";
import { FieldTypeDef } from "./field";
import { CustomScalarTypeDef } from "./customScalars";

export default [
	CustomScalarTypeDef,
	...RootTypeDef,
	...UserTypeDef,
	...FieldTypeDef
];
