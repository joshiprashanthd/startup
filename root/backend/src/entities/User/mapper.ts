import { IContext } from "../../types";
import { mapFields } from "../field/mapper";
import { IFieldDocument } from "../field/model";
import { IFieldType } from "../field/typedef";
import { IUserDocument } from "./Model";
import { IUserType } from "./TypeDef";

interface IMapUserType extends Omit<IUserType, "interests"> {
	interests: () => Promise<(IFieldType | Error)[]>;
}

export const mapUser = (
	user: IUserDocument,
	context: IContext
): IMapUserType => ({
	id: user.id,
	name: user.name,
	email: user.email,
	handler: user.handler,
	password: null,
	bio: user.bio,
	birthDate: user.birthDate,
	isOnline: user.isOnline,
	lastActive: user.lastActive,
	verifiedAccount: user.verifiedAccount,
	interests: async () =>
		mapFields(
			(await context.dataloaders.fieldLoader.loadMany(
				user.interests
			)) as IFieldDocument[]
		)
});

export const mapUsers = (
	users: IUserDocument[],
	context: IContext
): IMapUserType[] => users.map(user => mapUser(user, context));
