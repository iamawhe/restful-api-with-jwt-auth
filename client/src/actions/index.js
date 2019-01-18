import axios from 'axios';

import { AUTH_SIGN_UP, AUTH_ERROR } from './types';

export const signUp = data => async dispatch => {
	try {
		//make request to server with data
		const res = await axios.post('/api/auth/signup', data);

		//dispatch action type with res as payload
		dispatch({ type: AUTH_SIGN_UP, payload: res.data.token });

		//save response(token) to localStorage
		localStorage.setItem('JWT_Token', res.data.token);
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: 'Email already exist!' });
	}
};

export const getSecret = () => async dispatch => {
	try {
		//make request to server with data
		//get response (token)
		const r = await axios.get('/api/no-secret');
		//dispatch a msg with data

		//save response(token) to localStorage
		console.log('res:', r);
	} catch (error) {
		console.log(error.message);
	}
};
