import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	addHemisphere,
	removeHemisphere,
	setMarkers,
	deleteMarkers,
} from '../redux/actions/marker-actions';

import './scss/legend.scss';

const keys = {
	Northwest: 0,
	Northeast: 0,
	Southwest: 0,
	Southeast: 0,
};

class Legend extends Component {
	componentDidUpdate() {
		this.filterMarkers();
	}

	handleKeyCheckbox = e => {
		const { markers } = this.props.marker;
		const { map } = this.props.map;

		let hemisphere = e.target.value;
		let isChecked = e.target.checked;
		let filteredMarkers = markers.filter(marker => marker.hemisphere === hemisphere);

		let value = isChecked ? map : null;

		for (let marker of filteredMarkers) {
			marker.marker.setMap(value);
		}
	};

	filterMarkers = () => {
		const { hemispheres } = this.props.marker;
		const { markers } = this.props.marker;
		const { map } = this.props.map;

		for (let hemisphere of hemispheres) {
			let isChecked = document.querySelector(`input[name='${hemisphere}']`).checked;
			let filteredMarkers = markers.filter(marker => marker.hemisphere === hemisphere);

			if (isChecked) {
				for (let i = 0; i < filteredMarkers.length; i++) {
					const { marker } = filteredMarkers[i];
					marker.setMap(map);
				}
			} else {
				for (let i = 0; i < filteredMarkers.length; i++) {
					const { marker } = filteredMarkers[i];
					marker.setMap(null);
				}
			}
		}
	};

	// Returns the number of markers in that hemisphere
	getNumHemisphere(key) {
		const { markers } = this.props.marker;

		if (markers) {
			return markers.filter(marker => marker.hemisphere === key).length;
		}
	}

	// Function to set the values of our keys object based on number of markers in that hemisphere
	buildKey() {
		for (var key in keys) {
			if (keys.hasOwnProperty(key)) {
				keys[key] = this.getNumHemisphere(key);
			}
		}
	}

	renderedKeys = () => {
		this.buildKey();

		const renderedKeys = [];

		for (var key in keys) {
			if (keys.hasOwnProperty(key)) {
				renderedKeys.push(
					<div key={key} className={'row key ' + key}>
						<div className="col-2">
							<input
								type="checkbox"
								name={key}
								value={key}
								onChange={this.handleKeyCheckbox}
								defaultChecked
							/>
						</div>
						<div className="col-5 text-center">
							<p>{key}</p>
						</div>
						<div className="col-5 text-center">
							<p>{keys[key]}</p>
						</div>
					</div>,
				);
			}
		}

		return renderedKeys;
	};

	refreshMap = () => {
		const { markers } = this.props.marker;
		const { map, numMarkers } = this.props.map;

		// Remove markers from the UI
		for (let i = 0; i < markers.length; i++) {
			const { marker } = markers[i];
			marker.setMap(null);
		}

		// Remove markers from the store
		this.props.deleteMarkers();

		// Set new markers
		this.props.setMarkers(map, numMarkers);
	};

	render() {
		return (
			<div className="legend">
				<div>
					<div className="row key">
						<div className="col-5 offset-2 text-center">
							<h6>Hemisphere</h6>
						</div>
						<div className="col-5 text-center">
							<h6>Count</h6>
						</div>
					</div>
					{this.renderedKeys()}
					<div className="row justify-content-center">
						<div className="col-6 text-center">
							<div className="refresh-btn-container">
								<button
									className="btn btn-outline-dark refresh-btn"
									onClick={this.refreshMap}>
									Refresh
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="icon-credit">
					Icons made by{' '}
					<a href="https://www.flaticon.com/authors/simpleicon" title="SimpleIcon">
						SimpleIcon
					</a>{' '}
					from{' '}
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>{' '}
					is licensed by{' '}
					<a
						href="http://creativecommons.org/licenses/by/3.0/"
						title="Creative Commons BY 3.0"
						target="_blank"
						rel="noopener noreferrer">
						CC 3.0 BY
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		marker: state.marker,
	};
};

export default connect(
	mapStateToProps,
	{ addHemisphere, removeHemisphere, deleteMarkers, setMarkers },
)(Legend);
