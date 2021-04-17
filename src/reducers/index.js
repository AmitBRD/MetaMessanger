import { combineReducers } from "redux";

import authedUser from "./authedUser";
import users from "./users";
import tweets from "./tweets";
import metamaskUser from "./metamaskUser";

import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  authedUser,
  metamaskUser,
  users,
  tweets,
  loadingBar: loadingBarReducer
});
