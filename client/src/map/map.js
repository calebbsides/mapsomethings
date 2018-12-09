import React, { Component } from 'react';
import { connect } from 'react-redux';

import Legend from '../legend/legend';

import './scss/map.scss';

import { generateMarkers } from '../redux/actions/marker-actions';
import { setMap } from '../redux/actions/map-actions';

class Map extends Component {
	componentDidMount() {
		const googleAPIScript = document.createElement('script');
		googleAPIScript.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOPhBla_Sx3cTRhbfdr_GPWgyvGsJUFwk&callback=initMap';
		googleAPIScript.async = true;
		document.body.appendChild(googleAPIScript);

		this.initMap();
	}

	initMap = () => {
		window.initMap = () => {
			const map = new window.google.maps.Map(document.getElementById('map'), {
				center: {
					lat: 0,
					lng: 0,
				},
				zoom: 3,
				disableDefaultUI: true,
			});

			this.props.setMap(map);

			this.props.generateMarkers(map, this.props.map.numMarkers);
		};
	};

	render() {
		return (
			<div className="app-container container-fluid">
				<div className="app-row row no-gutters">
					<div className="col-12 col-sm-5 col-lg-3">
						<Legend />
					</div>
					<div className="col-12 col-sm-7 col-lg-9">
						<div id="map" />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		marker: state.marker,
		map: state.map,
	};
};

export default connect(
	mapStateToProps,
	{ generateMarkers, setMap },
)(Map);
