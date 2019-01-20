import axios from 'axios';

import {
	AUTH_SIGN_UP,
	AUTH_ERROR,
	AUTH_GOOGLE,
	AUTH_FACEBOOK,
	AUTH_LOG_OUT
} from './types';

export const signUp = data => async dispatch => {
	try {
		//make request to server with data
		const res = await axios.post('/api/auth/signup', data);

		//dispatch action type with payload to reducer
		dispatch({ type: AUTH_SIGN_UP, payload: res.data.token });

		//save response(token) to localStorage
		localStorage.setItem('JWT_Token', res.data.token);
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: 'Email already exist!' });
	}
};

export const googleOAuth = data => async dispatch => {
	try {
		const res = await axios.post('/api/auth/oauth/google', {
			access_token: data
		});
		dispatch({ type: AUTH_GOOGLE, payload: res.data.token });
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: error.message });
	}
};

export const facebookOAuth = data => async dispatch => {
	try {
		const res = await axios.post('/api/auth/oauth/facebook', {
			access_token: data
		});
		dispatch({ type: AUTH_FACEBOOK, payload: res.data.token });
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: error.message });
	}
};

//signOut
export const logOut = () => dispatch => {
	try {
		localStorage.removeItem('JWT_Token');
		dispatch({ type: AUTH_LOG_OUT, payload: '' });
	} catch (error) {
		dispatch({ type: AUTH_LOG_OUT, payload: error.message });
	}
};
