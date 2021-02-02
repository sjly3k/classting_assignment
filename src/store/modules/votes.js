import {handleActions} from "redux-actions";
import firebase from 'firebase/app';

// 액션
const GET_VOTES = 'votes/GET_VOTES'
const GET_VOTES_SUCCESS = 'votes/GET_VOTES_SUCCESS'
const GET_VOTES_FAILURE = 'votes/GET_VOTES_FAILURE'

const UPDATE_VOTE = 'votes/SAVE_VOTE'
const UPDATE_VOTE_SUCCESS = 'votes/UPDATE_VOTE_SUCCESS'
const UPDATE_VOTE_FAILURE = 'votes/UPDATE_VOTE_FAILURE'
const ADD_VOTE = 'votes/ADD_VOTE'
const ADD_VOTE_SUCCESS = 'votes/ADD_VOTE_SUCCESS'
const ADD_VOTE_FAILURE = 'votes/ADD_VOTE_FAILURE'
const REMOVE_VOTE = 'votes/REMOVE_VOTE'
const REMOVE_VOTE_SUCCESS = 'votes/REMOVE_VOTE_SUCCESS'
const REMOVE_VOTE_FAILURE = 'votes/REMOVE_VOTE_FAILURE'
const UPDATE_VOTE = 'votes/UPDATE_VOTE'
const UPDATE_VOTE_SUCCESS = 'votes/UPDATE_VOTE_SUCCESS'
const UPDATE_VOTE_FAILURE = 'votes/UPDATE_VOTE_FAILURE'

const getVotes = () => {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection('projects')
			.get()
			.then((votes) => {
				dispatch({type : GET_VOTES_SUCCESS, votes})
			})
			.catch((error) => {
				dispatch({type : GET_VOTES_FAILURE, error})
			})
	}
}

const addVote = (vote) => {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection('projects')
			.add({
				...vote,
				name : "Jamie",
			})
			.then((vote) => {
				dispatch({type : ADD_VOTE_SUCCESS}, vote)
			})
			.catch((error) => {
				dispatch({type : ADD_VOTE_FAILURE}, error)
			})
	}
}

const updateVote = (id, question) => {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection('projects')
			.doc(
				id
			)
			.update({
				question
			})
			.then((id) => {
				dispatch({type : UPDATE_VOTE_SUCCESS}, id)
			})
			.catch((error) => {
				dispatch({type : UPDATE_VOTE_FAILURE}, error)
			})
	}
}

const removeVote = (id) => {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection('projects')
			.where(
				'id',
				'==',
				id
			)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.ref.delete().then(() => {
						dispatch({type : REMOVE_VOTE_SUCCESS}, id)
					}).catch((error) => {
						dispatch({type : REMOVE_VOTE_FAILURE}, error)
					});
				});
			})
			.catch((error) => {
				dispatch({type : REMOVE_VOTE_FAILURE}, error)
			})
	}
}

const initialState = {
	votes : [],
	error : null,
}

export default handleActions({
	[GET_VOTES] : (state) => ({
		...state,
		error : null
	}),
	[GET_VOTES_SUCCESS] : (state, { payload : votes }) => ({
		...state,
		error : null,
		votes : state.votes.concat(votes),
	}),
	[GET_VOTES_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[UPDATE_VOTE] : (state) => ({
		...state,
		error : null
	}),
	[UPDATE_VOTE_SUCCESS] : (state, { payload : id, question } ) => ({
		...state,
		error : null,
		votes : state.votes.map(item => item.id === id ? {
			...item, question
		} : item),
	}),
	[UPDATE_VOTE_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[ADD_VOTE] : (state) => ({
		...state,
		error : null
	}),
	[ADD_VOTE_SUCCESS] : (state, { payload : vote } ) => ({
		...state,
		error : null,
		votes : state.votes.concat(vote),
	}),
	[ADD_VOTE_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[REMOVE_VOTE] : (state) => ({
		...state,
		error : null
	}),
	[REMOVE_VOTE_SUCCESS] : (state, { payload : id } ) => ({
		...state,
		error : null,
		votes : state.votes.filter(item => item.id !== id)
	}),
	[REMOVE_VOTE_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),
}, initialState)
