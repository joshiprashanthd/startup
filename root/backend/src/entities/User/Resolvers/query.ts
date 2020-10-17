import { User } from "../model";

export default {
	Query: {
		users: async () => await User.find({})
	}
};
