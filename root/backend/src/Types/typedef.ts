import { DocumentNode } from "graphql";
import { RootTypeDef } from "./Root";
import { UserTypeDef } from "./User";

export default [...RootTypeDef, ...UserTypeDef];
