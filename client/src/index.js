import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import App from './components/App/App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

//set default state of redux store
const jwtToken = localStorage.getItem('JWT_Token');
//set default header fro axios
axios.defaults.headers.common['Authorization'] = jwtToken;
//test
window.axios = axios;

const store = createStore(
	reducers,
	{
		auth: {
			token: jwtToken,
			isAuthed: jwtToken ? true : false
		}
	},
	applyMiddleware(reduxThunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
