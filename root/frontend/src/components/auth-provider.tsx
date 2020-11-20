import React from "react";
import authContext from "../contexts/auth-context";

export const AuthProvider = function (props: any) {
  return (
    <authContext.Provider value={props.value}>
      {props.children}
    </authContext.Provider>
  );
};
