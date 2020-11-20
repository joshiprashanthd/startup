import { useContext } from "react";

//local
import authContext, { IAuthContext } from "../contexts/auth-context";

export const useAuth = function () {
  return useContext<IAuthContext>(authContext);
};
