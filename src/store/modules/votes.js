import {handleActions} from "redux-actions";
import firebase from 'firebase/app';

// 액션
const GET_VOTES = 'votes/GET_VOTES'
const GET_VOTES_SUCCESS = 'votes/GET_VOTES_SUCCESS'
const GET_VOTES_FAILURE = 'votes/GET_VOTES_FAILURE'

const UPDATE_VOTE = 'votes/UPDATE_VOTE'
const UPDATE_VOTE_SUCCESS = 'votes/UPDATE_VOTE_SUCCESS'
const UPDATE_VOTE_FAILURE = 'votes/UPDATE_VOTE_FAILURE'

const ADD_VOTE = 'votes/ADD_VOTE'
const ADD_VOTE_SUCCESS = 'votes/ADD_VOTE_SUCCESS'
const ADD_VOTE_FAILURE = 'votes/ADD_VOTE_FAILURE'

const REMOVE_VOTE = 'votes/REMOVE_VOTE'
const REMOVE_VOTE_SUCCESS = 'votes/REMOVE_VOTE_SUCCESS'
const REMOVE_VOTE_FAILURE = 'votes/REMOVE_VOTE_FAILURE'

const VOTING_ACTION = 'votes/VOTING_ACTION';
const VOTING_ACTION_SUCCESS = 'votes/VOTING_ACTION_SUCCESS';
const VOTING_ACTION_FAILURE = 'votes/VOTING_ACTION_FAILURE';

const getVotes = () => {
	return (dispatch) => {
		dispatch({type : GET_VOTES})
		firebase
			.firestore()
			.collection('projects')
			.get()
			.then((querySnapshot) => {
				const votes = querySnapshot.docs.map((doc) => {
					return { id : doc.id, ...doc.data() }
				})
				dispatch({type : GET_VOTES_SUCCESS, payload : votes})
			})
			.catch((error) => {
				dispatch({type : GET_VOTES_FAILURE, payload : error})
			})
	}
}

const addVote = (vote) => {
	return (dispatch) => {
		dispatch({type : ADD_VOTE});
		firebase
			.firestore()
			.collection('projects')
			.add({
				...vote,
			})
			.then((docRef) => {
				const addedVote = {
					...vote,
					id : docRef.id
				}
				dispatch({type : ADD_VOTE_SUCCESS, payload : addedVote})
			})
			.catch((error) => {
				dispatch({type : ADD_VOTE_FAILURE, payload : error})
			})
	}
}

const updateVote = (id, question) => {
	return (dispatch) => {
		dispatch({type : UPDATE_VOTE});
		firebase
			.firestore()
			.collection('projects')
			.doc(id)
			.update({
				question
			})
			.then(() => {
				dispatch({type : UPDATE_VOTE_SUCCESS, payload : id, question})
			})
			.catch((error) => {
				dispatch({type : UPDATE_VOTE_FAILURE, payload : error})
			})
	}
}

const removeVote = (id) => {
	return (dispatch) => {
		dispatch({type : REMOVE_VOTE});
		firebase
			.firestore()
			.collection('projects')
			.doc(id)
			.delete()
			.then(() => {
				dispatch({type : REMOVE_VOTE_SUCCESS, payload : id});
			})
			.catch((error) => {
				console.log(error)
				dispatch({type : REMOVE_VOTE_FAILURE, payload : error})
			})
	}
}

const countVoting = (docId, newOption) => {
	return (dispatch) => {
		dispatch({type : VOTING_ACTION})
		firebase
			.firestore()
			.collection('projects')
			.doc(docId)
			.update({
				options : newOption
			})
			.then(() => {
				dispatch({type : VOTING_ACTION_SUCCESS, payload : docId, newOption})
			})
			.catch((error) => {
				dispatch({type : VOTING_ACTION_FAILURE, payload : error})
			})
	}
}

const initialState = {
	votes : [],
	error : null,
	voteError : null,
}

export default handleActions({
	[GET_VOTES] : (state) => ({
		...state,
		error : null
	}),
	[GET_VOTES_SUCCESS] : (state, { payload : votes }) => {
		return ({
			...state,
			votes
		})
	},
	[GET_VOTES_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[UPDATE_VOTE] : (state) => ({
		...state,
		error : null
	}),
	[UPDATE_VOTE_SUCCESS] : (state, { payload : id, question } ) => {
		return ({
			...state,
			error: null,
			votes: state.votes.map(vote => vote.id === id ? {
				...vote, question
			} : vote),
		})
	},
	[UPDATE_VOTE_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[ADD_VOTE] : (state) => ({
		...state,
		error : null
	}),
	[ADD_VOTE_SUCCESS] : (state, { payload : addedVote } ) => ({
		...state,
		error : null,
		votes : state.votes.concat(addedVote),
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
	[REMOVE_VOTE_SUCCESS] : (state, { payload : id } ) => {
		return ({
			...state,
			error : null,
			votes : state.votes.filter(item => item.id !== id)
		})
	},
	[REMOVE_VOTE_FAILURE] : (state, { payload : error }) => ({
		...state,
		error : error
	}),

	// ==========================================
	[VOTING_ACTION] : (state) => ({
		...state,
		voteError : null
	}),
	[VOTING_ACTION_SUCCESS] : (state, { payload : docId, newOption }) => ({
		...state,
		votes : state.votes.map(vote => vote.id === docId ? {
			...vote, options : newOption,
		} : vote),
		voteError : null
	}),
	[VOTING_ACTION_FAILURE] : (state, { payload : error }) => ({
		...state,
		voteError : error
	}),
}, initialState)

export { getVotes, addVote, removeVote, updateVote, countVoting }