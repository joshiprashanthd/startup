import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import { AuthProvider } from "./components/auth-provider";
import { IAuthInfo } from "./contexts/auth-context";
import { ME } from "./graphql/user/query";
import { useProvideAuth } from "./hooks/useProvideAuth";
import { AuthPage } from "./pages/auth-page";
import { CreatePage } from "./pages/create-page";
import { HomePage } from "./pages/home-page";
import { IssuesPage } from "./pages/issues-page";
import { ProfilePage } from "./pages/profile-page";

export default function App() {
  const { data } = useQuery(ME);
  const auth = useProvideAuth();

  useEffect(() => {
    if (data) {
      const user: IAuthInfo = {
        id: data.me.id,
        email: data.me.accountInfo.email,
        handler: data.me.accountInfo.handler,
        name: data.me.accountInfo.name,
      };
      auth.signIn(user);
    }
  }, [data]);

  return (
    <AuthProvider value={auth}>
      <Router>
        <Switch>
          {auth.user === null && <Redirect exact from="/" to="/auth" />}
          {auth.user && <Redirect exact from="/auth" to="/home" />}
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/profile/:handler">
            <ProfilePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/issues">
            <IssuesPage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
