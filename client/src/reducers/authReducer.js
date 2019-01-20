import {
	AUTH_SIGN_UP,
	AUTH_LogIn,
	AUTH_ERROR,
	AUTH_LOG_OUT
} from '../actions/types';

const DEFUALT_STATE = {
	isAuthed: false,
	token: '',
	errorMsg: ''
};

export default (state = DEFUALT_STATE, action) => {
	switch (action.type) {
		case AUTH_SIGN_UP:
			return { ...state, isAuthed: true, token: action.payload, errorMsg: '' };
		case AUTH_LogIn:
			return { ...state, isAuthed: true, token: action.payload, errorMsg: '' };
		case AUTH_ERROR:
			return { ...state, errorMsg: action.payload };
		case AUTH_LOG_OUT:
			return {
				...state,
				isAuthed: false,
				token: action.payload,
				errorMsg: ''
			};
		default:
			return state;
	}
};
