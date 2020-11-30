import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

//local
import App from "./App";
import "./styles/styles.css";

const clientUri =
  process.env.NODE_ENV === "production"
    ? "https://collabs1.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

const link = new HttpLink({
  uri: clientUri,
  credentials: "include",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
