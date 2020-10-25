//local
import { IContext } from "../../types";
import { mapSkills } from "../skill/mapper";
import { ISkillDocument } from "../skill/model";
import { IUserDocument } from "./Model";
import { IUser } from "./typedef";

type DeepPartial<T> = {
	[K in keyof T]?: Partial<T[K]>;
};

export const mapUser = (
	user: IUserDocument,
	context: IContext
): DeepPartial<IUser> => {
	return {
		id: user.id,
		accountInfo: {
			...user.accountInfo
		},
		personalInfo: {
			...user.personalInfo,
			interests: async () =>
				mapSkills(
					(await context.dataloaders.skillLoader.loadMany(
						user.personalInfo.interests
					)) as ISkillDocument[]
				)
		},
		status: {
			...user.status
		}
	};
};

export const mapUsers = (
	users: IUserDocument[],
	context: IContext
): DeepPartial<IUser>[] => users.map(user => mapUser(user, context));
