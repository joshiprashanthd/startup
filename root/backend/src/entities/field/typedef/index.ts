import InputDef from "./input";
import TypeDef from "./type";
import MutationDef from "./mutation";
import QueryDef from "./query";

export {
	IFieldType,
	IFieldIdInput,
	IStrictFieldInput,
	ILooseFieldInput
} from "./types";

export default [InputDef, TypeDef, QueryDef, MutationDef];