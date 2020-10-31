import React from "react";

export interface IUserAccountInfo {
  id: string | null;
  email: string | null;
  password: string | null;
  handler: string | null;
  name: string | null;
}

export interface IAuthContext {
  user: IUserAccountInfo | null;
  signIn: ((accountInfo: IUserAccountInfo) => void) | null;
  signOut: (() => void) | null;
}

export default React.createContext<IAuthContext>({
  user: null,
  signIn: null,
  signOut: null,
});
