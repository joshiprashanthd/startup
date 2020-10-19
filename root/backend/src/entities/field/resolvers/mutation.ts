import { Field } from "../model";
import { IStrictFieldInput } from "../typedef";

export default {
	Mutation: {
		createField: (
			parent: any,
			args: { input: IStrictFieldInput },
			context: any,
			info: any
		) => {
			return Field.create(args.input);
		}
	}
};
