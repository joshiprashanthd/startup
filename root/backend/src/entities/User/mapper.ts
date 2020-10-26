//local
import { IContext } from "../../types";
import { mapSkills } from "../skill/mapper";
import { ISkillDocument } from "../skill/model";
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
			interests: async () =>
				mapSkills(
					(await context.dataloaders.skillLoader.loadMany(
						user.personalInfo.interests
					)) as ISkillDocument[]
				)
		},
		statusInfo: user.statusInfo
	};
};

export const mapUsers = (users: IUserDocument[], context: IContext): IUser[] =>
	users.map(user => mapUser(user, context));
