import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureSignedIn } from "../../../helpers/functions/authentication";
import { IContext } from "../../../types";

export default class AuthDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...args) {
			const [_, __, context] = args;
			ensureSignedIn(context as IContext);
			return resolve.apply(this, args);
		};
	}
}
