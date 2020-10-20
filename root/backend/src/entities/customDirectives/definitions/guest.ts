import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { ensureSignedOut } from "../../../helpers/functions/authentication";
import { IContext } from "../../../types";

export default class GuestDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...args) {
			const [_, __, context] = args;
			ensureSignedOut(context as IContext);
			return resolve.apply(this, args);
		};
	}
}
