import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { cache } from "./utils/cache";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: cache,
});

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

export default client;
