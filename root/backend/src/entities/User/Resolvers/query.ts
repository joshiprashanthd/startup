//local
import { User } from "../model";
import { mapUser } from "../mapper";
import { IContext } from "../../../types";

export default {
	Query: {
		users: async (parent: any, args: any, context: IContext, info: any) =>
			(await User.find({})).map(userDoc => mapUser(userDoc, context)),
		me: async (parent: any, args: any, context: IContext, info: any) =>
			mapUser(await User.findById(context.req.session.userId), context),
		user: async (
			parent: any,
			args: { userId: string },
			context: IContext,
			info: any
		) => mapUser(await User.findById(args.userId), context)
	}
};
