import UserLoader from "./user";
import FieldLoader from "./field";

export interface IDataloaders {
	userLoader: ReturnType<typeof UserLoader>;
	fieldLoader: ReturnType<typeof FieldLoader>;
}

export default {
	userLoader: UserLoader(),
	fieldLoader: FieldLoader()
} as IDataloaders;
