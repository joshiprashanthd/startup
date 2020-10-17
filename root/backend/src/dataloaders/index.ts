import UserLoader from "./user";

export interface IDataloaders {
	userLoader: ReturnType<typeof UserLoader>;
}

export default {
	userLoader: UserLoader()
} as IDataloaders;
