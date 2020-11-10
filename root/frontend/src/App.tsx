import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import AuthContext, { IAuthInfo } from "./contexts/auth-context";
import { AuthPage } from "./pages/auth-page";
import { CreatePage } from "./pages/create-page";
import { HomePage } from "./pages/home-page";
import { IssuesPage } from "./pages/issues-page";

export default function App() {
  const [user, setUser] = useState<IAuthInfo | null>(null);

  const signIn = (user: IAuthInfo) => {
    console.log("signIn called");
    setUser(user);
  };
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user: user, signIn: signIn, signOut: signOut, signUp: null }}
    >
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/issues">
            <IssuesPage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          {user === null && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          {user === null && <Redirect exact from="/" to="/auth" />}
          {user !== null && <Redirect exact from="/auth" to="/home" />}
          {user !== null && <Redirect exact from="/" to="/home" />}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
