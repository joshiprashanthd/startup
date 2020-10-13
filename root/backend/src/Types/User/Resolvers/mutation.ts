import User from "../model";

export default {
	Mutation: {
		createUser: async (parent: any, args: any, context: any, info: any) => {
			return User.create(args.input);
		}
	}
};
