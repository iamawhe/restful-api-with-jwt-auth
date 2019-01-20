import { AUTHO_RESOURCE } from '../actions/types';

const DEFUALT_STATE = {
	secret: ''
};

export default (state = DEFUALT_STATE, action) => {
	switch (action.type) {
		case AUTHO_RESOURCE:
			return { ...state, secret: action.payload };
		default:
			return state;
	}
};
