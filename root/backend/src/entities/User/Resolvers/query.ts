//local
import { User } from "../model";
import { mapUsers } from "../mapper";
import { IContext } from "../../../types";

export default {
	Query: {
		users: async (parent: any, args: any, context: IContext, info: any) =>
			mapUsers(await User.find({}), context)
	}
};
