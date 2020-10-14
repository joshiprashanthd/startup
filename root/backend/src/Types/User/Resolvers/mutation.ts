import { User } from "../Model/";
import { StrictUserInput } from "../TypeDef";

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: StrictUserInput },
			context: any,
			info: any
		) => {
			return User.create(args.input);
		}
	}
};
