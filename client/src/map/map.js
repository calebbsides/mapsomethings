import React, { Component } from 'react';
import { connect } from 'react-redux';

import Legend from '../legend/legend';

import './scss/map.scss';

import { setMarkers } from '../redux/actions/marker-actions';
import { initMap } from '../redux/actions/map-actions';

class Map extends Component {
	componentDidMount() {
		const googleAPIScript = document.createElement('script');
		googleAPIScript.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOPhBla_Sx3cTRhbfdr_GPWgyvGsJUFwk&callback=initMap';
		googleAPIScript.async = true;
		document.body.appendChild(googleAPIScript);

		const { map, numMarkers } = this.props.map;

		this.props.initMap().then(() => {
			this.props.setMarkers(map, numMarkers);
		});
	}

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
	{ setMarkers, initMap },
)(Map);
