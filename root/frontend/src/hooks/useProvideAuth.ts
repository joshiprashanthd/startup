import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

//local
import { IAuthInfo } from "../contexts/auth-context";
import { SIGN_OUT } from "../graphql/user/mutation";
import { ME } from "../graphql/user/query";

export const useProvideAuth = function () {
  const [user, setUser] = useState<IAuthInfo | null>(null);
  const { data, loading } = useQuery(ME);

  useEffect(() => {
    if (data) {
      const user: IAuthInfo = {
        id: data.me.id,
        email: data.me.accountInfo.email,
        handler: data.me.accountInfo.handler,
        name: data.me.accountInfo.name,
      };
      setUser(user);
    }
  }, [data]);

  const signIn = (user: IAuthInfo): void => {
    setUser(user);
  };

  const signOut = () => setUser(null);

  return {
    user,
    signIn,
    signOut,
    signUp: null,
    loading,
  };
};
