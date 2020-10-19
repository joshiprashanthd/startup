import QueryResolver from "./query";
import MutationResolver from "./mutation";

export default {
	...QueryResolver,
	...MutationResolver
};
