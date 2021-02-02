import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import votes from "./votes";

export default combineReducers({
	votes,
	firebase : firebaseReducer,
	firestore : firestoreReducer
})