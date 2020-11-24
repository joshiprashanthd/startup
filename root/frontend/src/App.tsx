import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

//local
import { AuthProvider } from "./providers/auth-provider";
import { useProvideAuth } from "./hooks/useProvideAuth";
import { AuthPage } from "./pages/auth-page";
import { CreatePage } from "./pages/create-page";
import { HomePage } from "./pages/home-page";
import { IssuesPage } from "./pages/issues-page";
import { ProfilePage } from "./pages/profile-page";
import { ProjectPage } from "./pages/project-page";

export default function App() {
  const auth = useProvideAuth();

  return (
    <AuthProvider value={auth}>
      <Router>
        {!auth.loading && (
          <Switch>
            {!auth.user && <Redirect exact from="/" to="/auth" />}
            {auth.user && <Redirect exact from="/auth" to="/home" />}
            {!auth.user && <Redirect exact from="/home" to="/auth" />}
            {!auth.user && <Redirect exact from="/profile" to="/auth" />}

            <Route path="/auth">
              <AuthPage />
            </Route>
            <Route path="/project/:projectId">
              <ProjectPage />
            </Route>
            <Route path="/profile/:userId">
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
            <Route path="/home">
              <HomePage />
            </Route>
          </Switch>
        )}
      </Router>
    </AuthProvider>
  );
}
