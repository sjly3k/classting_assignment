import { combineReducers } from "redux";
import common from "./common";
import votes from "./votes";

export default combineReducers({
	common,
	votes
})