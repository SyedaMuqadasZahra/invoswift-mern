import { combineReducers } from "redux";
import { blogReducer } from "./blogReducers";

const authReducers = combineReducers({
  blogReducer,
});

export default authReducers;
