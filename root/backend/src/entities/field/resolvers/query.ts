import { Field } from "../model";

export default {
	Query: {
		fields: (parent: any, args: any, context: any, info: any) => Field.find({})
	}
};
