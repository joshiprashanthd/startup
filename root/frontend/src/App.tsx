import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import AuthContext from "./contexts/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <AuthContext.Provider
      value={{ user: null, signIn: null, signOut: null, signUp: null }}
    >
      <Router>
        <Switch>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
