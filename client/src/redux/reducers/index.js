import { combineReducers } from 'redux';
import markerReducer from './marker-reducer.js';
import mapReducer from './map-reducer';

export default combineReducers({
	marker: markerReducer,
	map: mapReducer,
});
