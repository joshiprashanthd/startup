import { AuthDirective, GuestDirective, PrivateDirective } from "./definitions";

export { default as DirectivesTypeDef } from "./typedef";
export default {
	auth: AuthDirective,
	guest: GuestDirective,
	private: PrivateDirective
};
