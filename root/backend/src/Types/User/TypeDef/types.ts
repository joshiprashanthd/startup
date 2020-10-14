export interface StrictUserInput {
	email: string;
	password: string;
	handler: string;
	name: string;
	bio: string;
	lastActive: Date | null;
}

export interface LooseUserInput {
	userId: string;
	handler: string | null;
	email: string | null;
	password: string | null;
	name: string | null;
	bio: string | null;
}

export interface UserType {
	id: string;
	name: string;
	email: string;
	password: string;
	handler: string;
	bio: string;
	isOnline: boolean;
	lastActive: Date;
}
