import { User } from "../Model";

//local
import { mapUsers } from "../mapper";

export default {
	Query: {
		users: async (parent: any, args: any, context: any, info: any) =>
			mapUsers(await User.find({}))
	}
};
