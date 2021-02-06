import {handleActions} from "redux-actions";
import firebase from 'firebase/app';
import {toast} from "react-toastify";

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

export const getVotes = () => {
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

export const addVote = (vote) => {
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
				toast.info("새로운 투표를 생성하셨습니다.")
				window.location.reload();
			})
			.catch((error) => {
				dispatch({type : ADD_VOTE_FAILURE, payload : error})
				toast.error("투표를 추가할 때 문제가 발생했습니다.")
			})
	}
}

export const updateVote = (id, options) => {
	return (dispatch) => {
		dispatch({type : UPDATE_VOTE});
		firebase
			.firestore()
			.collection('projects')
			.doc(id)
			.update({
				options
			})
			.then(() => {
				dispatch({type : UPDATE_VOTE_SUCCESS, payload : id, options})
				toast.success("투표 옵션들의 제목을 변경하셨습니다.")
			})
			.catch((error) => {
				dispatch({type : UPDATE_VOTE_FAILURE, payload : error})
				toast.error(`${error} 투표 옵션들의 제목을 변경할 때 문제가 발생했습니다.`)
			})
	}
}

export const removeVote = (id) => {
	return (dispatch) => {
		dispatch({type : REMOVE_VOTE});
		firebase
			.firestore()
			.collection('projects')
			.doc(id)
			.delete()
			.then(() => {
				dispatch({type : REMOVE_VOTE_SUCCESS, payload : id});
				toast.info("투표를 삭제하셨습니다.")
			})
			.catch((error) => {
				console.log(error)
				dispatch({type : REMOVE_VOTE_FAILURE, payload : error})
				toast.error("투표를 삭제할 때 문제가 발생했습니다.")
			})
	}
}

export const countVoting = (docId, newOption) => {
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
				toast.info("투표에 참여해주셔서 감사합니다.")
			})
			.catch((error) => {
				dispatch({type : VOTING_ACTION_FAILURE, payload : error})
				toast.error("투표에 참여할 때 문제가 발생했습니다.")
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
	[UPDATE_VOTE_SUCCESS] : (state, { payload : id, options } ) => {
		return ({
			...state,
			error: null,
			votes: state.votes.map(vote => vote.id === id ? {
				...vote, options
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