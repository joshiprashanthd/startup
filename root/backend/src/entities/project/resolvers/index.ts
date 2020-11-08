import QueryResolver from "./query";
import MutationResolver from "./mutation";
// import SubscriptionResolver from "./subscription";

export default { ...MutationResolver, ...QueryResolver };
