import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "./goblalStyles";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route exact path="/auth">
            <AuthPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
