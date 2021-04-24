import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

//store stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers"; //importing the default export from index inside reducers folder

//importing middlewares
import middleware from "./middleware";
//todo: if the account is already available, then automatically start instead of using immediate to true
import {MetaMaskProvider} from "metamask-react";

const store = createStore(reducer, middleware);


ReactDOM.render(
  <Provider store={store}>
   <MetaMaskProvider>
  		<App />
   </MetaMaskProvider >
  </Provider>,
  document.getElementById("root")
);
