import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";

//local
import { IAuthInfo } from "../contexts/auth-context";
import { SIGN_OUT } from "../graphql/user/mutation";

export const useProvideAuth = function () {
  const [user, setUser] = useState<IAuthInfo | null>(null);
  const [mutate] = useMutation(SIGN_OUT);

  const signIn = (user: IAuthInfo, callback?: () => void): void => {
    setUser(user);
    if (callback) callback();
  };

  const signOut = (
    onResponse?: (data: any) => void,
    onError?: (err: any) => void
  ) => {
    mutate()
      .then((data) => {
        setUser(null);
        if (onResponse) onResponse(data);
      })
      .catch((err) => {
        if (onError) onError(err);
      });
  };

  return {
    user,
    signIn,
    signOut,
    signUp: null,
  };
};
