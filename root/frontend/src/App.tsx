import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import { Loader } from "./components/core/loader";
import AuthContext, { IAuthInfo } from "./contexts/auth-context";
import { SIGN_OUT } from "./graphql/user/mutation";
import { Error } from "./components/error";
import { ME } from "./graphql/user/query";
import { AuthPage } from "./pages/auth-page";
import { CreatePage } from "./pages/create-page";
import { HomePage } from "./pages/home-page";
import { IssuesPage } from "./pages/issues-page";

export default function App() {
  const { data, loading } = useQuery(ME);
  const [user, setUser] = useState<IAuthInfo | null>(null);
  const [signOutMutation] = useMutation(SIGN_OUT);

  const signIn = (user: IAuthInfo) => {
    setUser(user);
  };

  const signOut = () => {
    signOutMutation()
      .then((data) => {
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  if (data && user === null)
    setUser({
      id: data.me.id,
      ...data.me.accountInfo,
    });

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signIn: signIn,
        signOut: signOut,
        signUp: null,
      }}
    >
      <Router>
        <Switch>
          {user === null && <Redirect exact from="/" to="/auth" />}
          {user === null && !loading && (
            <Redirect exact from="/home" to="/auth" />
          )}
          {user === null && !loading && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          {!loading && (
            <Route path="/home">
              <HomePage />
            </Route>
          )}
          <Route path="/issues">
            <IssuesPage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          {user !== null && <Redirect exact from="/auth" to="/home" />}
          {user !== null && <Redirect exact from="/" to="/home" />}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
