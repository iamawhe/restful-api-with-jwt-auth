import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from '../reducers/authReducer';
import resourceReducer from '../reducers/resourceReducer';

export default combineReducers({
	form: formReducer,
	auth: authReducer,
	resource: resourceReducer
});
