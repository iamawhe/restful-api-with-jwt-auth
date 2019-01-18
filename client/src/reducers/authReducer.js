import { AUTH_SIGN_UP, AUTH_ERROR } from '../actions/types';

const DEFUALT_STATE = {
	isAuthed: false,
	token: '',
	errorMsg: ''
};

export default (state = DEFUALT_STATE, action) => {
	switch (action.type) {
		case AUTH_SIGN_UP:
			return { ...state, isAuthed: true, token: action.payload, errorMsg: '' };
		case AUTH_ERROR:
			return { ...state, errorMsg: action.payload };
		default:
			return state;
	}
};
