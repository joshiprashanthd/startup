import User from "../Model";

export default {
	Query: {
		users: async () => await User.find({})
	}
};
