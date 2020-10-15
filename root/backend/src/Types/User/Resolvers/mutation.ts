import User from "../Model/model";
import { IStrictUserInput } from "../TypeDef";

export default {
	Mutation: {
		createUser: async (
			parent: any,
			args: { input: IStrictUserInput },
			context: any,
			info: any
		) => {
			console.log(args.input);
			const user = await User.create<IStrictUserInput>(args.input);
			console.log(user);
			return user;
		}
	}
};
