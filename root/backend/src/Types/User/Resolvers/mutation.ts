import User from "../model";

export default {
  Mutation: {
    createUser: async (parent, args, context, info) => {
      return User.create(args.input);
    }
  }
}