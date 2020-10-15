import User from "../Model/model";

export default {
	Query: {
		users: async () => await User.find({})
	}
};
