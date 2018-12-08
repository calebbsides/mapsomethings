import * as types from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
	dispatch(setItemsLoading());
	axios
		.get('/api/items')
		.then(res => {
			dispatch({
				type: types.GET_ITEMS,
				data: res.data,
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_ITEMS,
				data: [{ _id: '500', name: 'Error getting items.' }],
			});
			console.log('Error: ' + err.message);
		});
};

export const addItem = item => dispatch => {
	axios.post('api/items', item).then(res => {
		dispatch({
			type: types.ADD_ITEM,
			data: res.data,
		});
	});
};

export const deleteItem = id => dispatch => {
	axios.delete(`api/items/${id}`).then(res => {
		dispatch({
			type: types.DELETE_ITEM,
			data: id,
		});
	});
};

export const setItemsLoading = () => {
	return {
		type: types.ITEMS_LOADING,
	};
};
