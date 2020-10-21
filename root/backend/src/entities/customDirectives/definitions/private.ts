import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { IContext } from "../../../types";

export default class PrivateDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...arg) {
			const [parent, args, context, info] = arg;
			if (parent.id !== (context as IContext).req.session.userId)
				parent[field.name] = null;
			return resolve.apply(this, [parent, args, context, info]);
		};
	}
}
