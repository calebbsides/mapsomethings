import * as types from './types';

import MarkerBlue from '../../map/scss/assets/marker--blue.svg';
import MarkerRed from '../../map/scss/assets/marker--red.svg';
import MarkerGreen from '../../map/scss/assets/marker--green.svg';
import MarkerYellow from '../../map/scss/assets/marker--yellow.svg';

export const addMarker = marker => {
	return {
		type: types.ADD_MARKER,
		data: marker,
	};
};

export const removeMarker = marker => {
	return {
		type: types.REMOVE_MARKER,
		data: marker,
	};
};

export const deleteMarkers = () => {
	return {
		type: types.DELETE_MARKERS,
	};
};

const markerIconMap = {
	Northwest: MarkerBlue,
	Northeast: MarkerGreen,
	Southwest: MarkerYellow,
	Southeast: MarkerRed,
};

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getHemisphere(latLng) {
	let hemisphere = '';

	if (latLng.lat > 0) {
		hemisphere += 'North';
	} else {
		hemisphere += 'South';
	}

	if (latLng.lng > 0) {
		hemisphere += 'east';
	} else {
		hemisphere += 'west';
	}

	return hemisphere;
}

export const generateMarkers = (map, numMarkers) => dispatch => {
	for (let i = 0; i < numMarkers; i++) {
		let latLng = {
			lat: getRandom(-85, 85),
			lng: getRandom(-180, 180),
		};

		let hemisphere = getHemisphere(latLng);

		let marker = new window.google.maps.Marker({
			map: map,
			position: latLng,
			title: 'Marker:' + i,
			icon: markerIconMap[hemisphere],
		});

		dispatch({
			type: types.ADD_MARKER,
			data: {
				hemisphere: hemisphere,
				marker: marker,
			},
		});
	}
};

export const addHemisphere = hemisphere => {
	return {
		type: types.ADD_HEMISPHERE,
		data: hemisphere,
	};
};

export const removeHemisphere = hemisphere => {
	return {
		type: types.REMOVE_HEMISPHERE,
		data: hemisphere,
	};
};
