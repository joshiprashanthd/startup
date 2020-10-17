import { IUserDocument } from "./Model";
import { IUserType } from "./TypeDef";

export const mapUser = (user: IUserDocument): IUserType => ({
	id: user.id,
	name: user.name,
	email: user.email,
	handler: user.handler,
	password: null,
	bio: user.bio,
	birthDate: user.birthDate,
	isOnline: user.isOnline as boolean,
	lastActive: user.lastActive
});

export const mapUsers = (users: IUserDocument[]): IUserType[] =>
	users.map(user => mapUser(user));
