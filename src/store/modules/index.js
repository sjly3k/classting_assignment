import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import votes from "./votes";
import auth from "./auth";

export default combineReducers({
	votes,
	auth,
	firebase : firebaseReducer,
	firestore : firestoreReducer
})