import * as types from '../actions/types';

const initialState = {
	items: [],
	isLoading: false,
};

const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ITEMS:
			return {
				...state,
				items: action.data,
				isLoading: false,
			};
		case types.DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.data),
			};
		case types.ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.data],
			};
		case types.ITEMS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default itemReducer;
