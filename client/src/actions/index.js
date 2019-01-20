import axios from 'axios';

import {
	AUTH_SIGN_UP,
	AUTH_LogIn,
	AUTH_ERROR,
	AUTH_GOOGLE,
	AUTH_FACEBOOK,
	AUTH_LOG_OUT,
	AUTHO_RESOURCE
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

export const logIn = data => async dispatch => {
	try {
		//make request to server with data
		const res = await axios.post('/api/auth/login', data);

		//dispatch action type with payload to reducer
		dispatch({ type: AUTH_LogIn, payload: res.data.token });

		//save response(token) to localStorage
		localStorage.setItem('JWT_Token', res.data.token);
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: error.message });
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

export const getPrivateResource = () => async dispatch => {
	try {
		const res = await axios.get('/api/hiddenResource');
		dispatch({ type: AUTHO_RESOURCE, payload: res.data.secret });
	} catch (err) {
		dispatch({ type: AUTHO_RESOURCE, payload: err.message });
	}
};

//signOut
export const logOut = () => dispatch => {
	try {
		//delete token from localStorage
		localStorage.removeItem('JWT_Token');
		dispatch({ type: AUTH_LOG_OUT, payload: '' });
		//axios.defaults.headers.common['Authorization'] = '';
	} catch (error) {
		dispatch({ type: AUTH_LOG_OUT, payload: error.message });
	}
};
