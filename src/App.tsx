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
import { NotFoundPage } from "./pages/not-found-page";

export default function App() {
  const auth = useProvideAuth();

  return (
    <AuthProvider value={auth}>
      <Router>
        {!auth.loading && (
          <Switch>
            {!auth.user && <Redirect exact from="/" to="/auth" />}
            <Route path="/auth">
              <AuthPage />
            </Route>
            <Route
              path="/project/:projectId"
              render={() => auth.user && <ProjectPage />}
            />
            <Route
              path="/profile/:userId"
              render={() => auth.user && <ProfilePage />}
            />
            <Route
              path="/profile"
              render={() => auth.user && <ProfilePage />}
            />
            <Route path="/issues" render={() => auth.user && <IssuesPage />} />
            <Route path="/create" render={() => auth.user && <CreatePage />} />
            <Route path="/home" render={() => auth.user && <HomePage />} />
            <Route path="/">
              <NotFoundPage />
            </Route>
          </Switch>
        )}
      </Router>
    </AuthProvider>
  );
}
