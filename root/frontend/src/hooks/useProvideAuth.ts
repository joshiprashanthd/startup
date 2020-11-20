import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

//local
import { IAuthInfo } from "../contexts/auth-context";
import { SIGN_OUT } from "../graphql/user/mutation";
import { ME } from "../graphql/user/query";

export const useProvideAuth = function () {
  const [user, setUser] = useState<IAuthInfo | null>(null);
  const { data, loading } = useQuery(ME);
  const [mutate] = useMutation(SIGN_OUT);

  useEffect(() => {
    if (data) {
      const user: IAuthInfo = {
        id: data.me.id,
        email: data.me.accountInfo.email,
        handler: data.me.accountInfo.handler,
        name: data.me.accountInfo.name,
      };
      signIn(user);
    }
  }, [data]);

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
    loading,
  };
};
