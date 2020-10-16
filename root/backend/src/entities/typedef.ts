import { DocumentNode } from "graphql";
import { RootTypeDef } from "./Root";
import { UserTypeDef } from "./User";
import { CustomScalarTypeDefs } from "./CustomScalars";

export default [...RootTypeDef, ...UserTypeDef, CustomScalarTypeDefs];
