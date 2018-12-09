import * as types from '../actions/types';

const initialState = {
	map: null,
	numMarkers: 2000,
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_MAP:
			return {
				...state,
				map: action.data,
			};
		default:
			return state;
	}
};

export default mapReducer;
