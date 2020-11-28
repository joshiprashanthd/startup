import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

//local
import App from "./App";
import "./styles/styles.css";

const clientUri =
  process.env.NODE_ENV === "production"
    ? "https://collabs1.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: clientUri,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
