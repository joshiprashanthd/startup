//local
import { IContext } from "../../types";
import { mapSkillIds } from "../skill/mapper";
import { IUserDocument } from "./Model";
import { IUser } from "./typedef";

export const mapUser = (user: IUserDocument, context: IContext): IUser => {
	return {
		id: user.id,
		accountInfo: {
			...user.accountInfo
		},
		personalInfo: {
			...user.personalInfo,
			interests: mapSkillIds(user.personalInfo.interests, context)
		},
		statusInfo: user.statusInfo
	};
};

export const mapUserId = (id: string, context: IContext) => async () =>
	mapUser(await context.dataloaders.userLoader.load(id), context);

export const mapUserIds = (
	ids: string[],
	context: IContext
): (() => Promise<IUser[]>) => async () =>
	(await context.dataloaders.userLoader.loadMany(ids)).map(user =>
		mapUser(user as IUserDocument, context)
	);
