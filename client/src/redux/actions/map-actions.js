import * as types from './types';

export const setMap = map => {
	return {
		type: types.SET_MAP,
		data: map,
	};
};
