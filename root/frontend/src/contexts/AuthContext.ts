import { createContext } from "react";

export interface IAuthInfo {
  id: string | null;
  name: string | null;
  handler: string | null;
  email: string | null;
}

export interface IAuthContext {
  user: IAuthInfo | null;
  signIn: ((email: string, password: string) => void) | null;
  signOut: (() => void) | null;
  signUp:
    | ((email: string, password: string, name: string, handler: string) => void)
    | null;
}

export default createContext<IAuthContext>({
  user: null,
  signIn: null,
  signOut: null,
  signUp: null,
});
