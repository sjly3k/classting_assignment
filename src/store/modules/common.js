import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = 'common/CHANGE_INPUT'

const changeInput = text => createAction(CHANGE_INPUT, text => text);

const initialState = {
	input : ''
}
export default handleActions({
	[CHANGE_INPUT] : (state, action) => ({
		...state,
		input : action.payload
	})
}, initialState)