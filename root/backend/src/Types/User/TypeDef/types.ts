export interface IStrictUserInput {
	email: string;
	password: string;
	handler: string;
	name: string;
}

export interface ILooseUserInput {
	userId: string;
	handler?: string;
	email?: string;
	password?: string;
	name?: string;
	bio?: string;
}

export interface IUserType {
	id: string;
	name: string;
	email: string;
	password: string;
	handler: string;
	bio: string;
	isOnline: boolean;
	lastActive?: Date;
}
