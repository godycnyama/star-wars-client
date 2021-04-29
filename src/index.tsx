import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { store }  from "./state/store";
import theme from "./utils/theme";
import client from "./common/apolloClient";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
