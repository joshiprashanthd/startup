import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import { AuthProvider } from "./components/auth-provider";
import { useProvideAuth } from "./hooks/useProvideAuth";
import { AuthPage } from "./pages/auth-page";
import { CreatePage } from "./pages/create-page";
import { HomePage } from "./pages/home-page";
import { IssuesPage } from "./pages/issues-page";
import { ProfilePage } from "./pages/profile-page";

export default function App() {
  const auth = useProvideAuth();

  return (
    <AuthProvider value={auth}>
      <Router>
        <Switch>
          {auth.user && <Redirect exact from="/auth" to="/home" />}
          {auth.user && <Redirect exact from="/" to="/home" />}
          {auth.user === null && <Redirect exact from="/" to="/auth" />}
          {auth.user === null && <Redirect exact from="/home" to="/auth" />}
          <Route path="/home" component={HomePage} />
          <Route path="/profile/:userId" component={ProfilePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/issues" component={IssuesPage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/" component={AuthPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
