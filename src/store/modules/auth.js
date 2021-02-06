import firebase from 'firebase/app';
import {handleActions} from "redux-actions";
import {removeStorage, setStorage} from "../../utils/localStorage";
import {toast} from "react-toastify";

const SIGNIN = 'auth/SIGNIN'
const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS'
const SIGNIN_ERROR = 'auth/SIGNIN_ERROR'

const SIGNOUT = 'auth/SIGNOUT'
const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS'
const SIGNOUT_ERROR = 'auth/SIGNOUT_ERROR'

const SIGNUP = 'auth/SIGNUP'
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
const SIGNUP_ERROR = 'auth/SIGNUP_ERROR'

// 로그인
export const signIn = credentials => {
	return (dispatch) => {
		dispatch({type : SIGNIN});
		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then((user) => {
				setStorage("USER_INFO", user.user);
				dispatch({ type: SIGNIN_SUCCESS });
				toast.success("로그인에 성공하였습니다.")
			})
			.catch(error => {
				dispatch({ type: SIGNIN_ERROR, payload : error.message });
				toast.error(error.message)
			});
	};
};

// 로그아웃
export const signOut = () => {
	return (dispatch) => {
		dispatch({type : SIGNOUT});
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: SIGNOUT_SUCCESS });
				removeStorage();
				toast.success("로그아웃에 성공하였습니다.")
			}).catch((error) => {
				dispatch({type : SIGNOUT_ERROR, payload : error.message})
				toast.error(error.message)
		});
	};
};

// 회원가입
export const signUp = newUser => {
	return (dispatch) => {
		dispatch({type : SIGNUP});
		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((user) => {
				setStorage("USER_INFO", user.user);
				dispatch({ type : SIGNUP_SUCCESS })
				toast.success("회원가입에 성공하였습니다.")
			})
			.catch((error) => {
				dispatch({type : SIGNUP_ERROR, payload : error.message })
				toast.error(error.message)
		});
	};
};

const initialState = {
	authError : null
}

export default handleActions({
	[SIGNIN] : (state) => ({
		...state,
		authError : null
	}),
	[SIGNIN_SUCCESS] : (state) => {
		return ({
			...state,
		})
	},
	[SIGNIN_ERROR] : (state, { payload : error }) => {
		return ({
			...state,
			authError : error
		})
	},

	[SIGNOUT] : (state) => ({
		...state,
		authError : null
	}),
	[SIGNOUT_SUCCESS] : (state) => ({
		...state,
	}),
	[SIGNOUT_ERROR] : (state, { payload : error }) => ({
		...state,
		authError : error
	}),

	[SIGNUP] : (state) => ({
		...state,
		authError : null
	}),
	[SIGNUP_SUCCESS] : (state) => {
		return ({
			...state,
		})
	},
	[SIGNUP_ERROR] : (state, { payload : error }) => {
		return ({
			...state,
			authError : error
		})
	},
}, initialState)