import { RootTypeDef } from "./root";
import { UserTypeDef } from "./user";
import { CustomScalarTypeDefs } from "./customScalars";

export default [...RootTypeDef, ...UserTypeDef, CustomScalarTypeDefs];
