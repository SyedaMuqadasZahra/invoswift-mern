import { combineReducers } from "redux";
import { pageReducer } from "./pageReducers";

const authReducers = combineReducers({
  pageReducer,
});

export default authReducers;
