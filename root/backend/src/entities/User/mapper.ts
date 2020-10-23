import { PartialDeep } from "type-fest";

//local
import { IContext } from "../../types";
import { mapFields } from "../field/mapper";
import { IFieldDocument } from "../field/model";
import { IUserDocument } from "./Model";
import { IUser } from "./typedef";

export const mapUser = (
	user: IUserDocument,
	context: IContext
): PartialDeep<IUser> => ({
	id: user.id,
	accountInfo: {
		...user.accountInfo
	},
	personalInfo: {
		...user.personalInfo,
		interests: async () =>
			mapFields(
				(await context.dataloaders.fieldLoader.loadMany(
					user.personalInfo.interests
				)) as IFieldDocument[]
			)
	},
	status: {
		...user.status
	}
});

export const mapUsers = (
	users: IUserDocument[],
	context: IContext
): PartialDeep<IUser>[] => users.map(user => mapUser(user, context));
