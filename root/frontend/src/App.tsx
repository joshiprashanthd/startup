import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "./goblalStyles";
import AuthPage from "./pages/AuthPage";
import AuthContext, { IUserAccountInfo } from "./context/AuthContext";

function App() {
  const [user, setUser] = React.useState<IUserAccountInfo | null>(null);

  const signIn = (accountInfo: IUserAccountInfo) => setUser(accountInfo);
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user: user, signIn: signIn, signOut: signOut }}
    >
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route exact path="/auth">
            <AuthPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
