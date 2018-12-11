import * as types from '../actions/types';

const initialState = {
	hemispheres: ['Northwest', 'Northeast', 'Southeast', 'Southwest'],
	markers: [],
};

const markerReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_HEMISPHERE:
			return {
				...state,
				hemispheres: [...state.hemispheres, action.data],
			};
		case types.REMOVE_HEMISPHERE:
			return {
				...state,
				hemispheres: state.hemispheres.filter(hemisphere => hemisphere !== action.data),
			};
		case types.ADD_MARKER:
			return {
				...state,
				markers: [...state.markers, action.data],
			};
		case types.REMOVE_MARKER:
			return {
				...state,
				markers: state.markers.filter(marker => marker !== action.data),
			};
		case types.SET_MARKERS:
			return {
				...state,
				markers: action.data,
			};
		case types.DELETE_MARKERS:
			return {
				...state,
				markers: [],
			};
		default:
			return state;
	}
};

export default markerReducer;
