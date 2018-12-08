import { combineReducers } from 'redux';
import itemReducer from './item-reducer.js';

export default combineReducers({
	item: itemReducer,
});
