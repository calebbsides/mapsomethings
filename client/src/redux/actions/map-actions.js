import * as types from './types';

export const initMap = () => dispatch => {
	//Return a promise to ensure the map has been created
	return new Promise((resolve, reject) => {
		var map = null;

		window.initMap = () => {
			map = new window.google.maps.Map(document.getElementById('map'), {
				center: {
					lat: 0,
					lng: 0,
				},
				zoom: 3,
				disableDefaultUI: true,
			});

			dispatch({
				type: types.SET_MAP,
				data: map,
			});
			resolve();
		};
	});
};
