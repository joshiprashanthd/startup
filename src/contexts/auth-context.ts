import { createContext } from "react";

export interface IAuthInfo {
  id: string | null;
  name: string | null;
  handler: string | null;
  email: string | null;
}

export interface IAuthContext {
  user: IAuthInfo | null;
  signIn: ((user: IAuthInfo) => void) | null;
  signOut: (() => void) | null;
  signUp: ((user: IAuthInfo) => void) | null;
  loading: boolean;
}

export default createContext<IAuthContext>({
  user: null,
  signIn: null,
  signOut: null,
  signUp: null,
  loading: false,
});
