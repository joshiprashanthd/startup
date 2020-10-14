export interface StrictUserInput {
	email: string;
	password: string;
	handler: string;
	name: string;
}

export interface LooseUserInput {
	userId: string;
	handler?: string;
	email?: string;
	password?: string;
	name?: string;
	bio?: string;
}

export interface UserType {
	id: string;
	name: string;
	email: string;
	password: string;
	handler: string;
	bio: string;
	isOnline: boolean;
	lastActive?: Date;
}
