type Nullable<T> = T | null;

export interface IStrictUserInput {
	email: string;
	password: string;
	handler: string;
	name: string;
	bio: string;
	birthDate: Date;
}

export interface ILooseUserInput {
	userId: string;
	handler?: string;
	email?: string;
	password?: string;
	name?: string;
	bio?: string;
	birthDate?: Date;
}

export interface IUserType {
	id: string;
	name: string;
	email: string;
	password: Nullable<string>;
	handler: string;
	bio: string;
	birthDate: Date;
	isOnline: boolean;
	lastActive: Nullable<Date>;
}
