import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	addHemisphere,
	removeHemisphere,
	deleteMarkers,
	generateMarkers,
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

	getNumHemisphere(key) {
		if (this.props.marker.markers) {
			return this.props.marker.markers.filter(marker => marker.hemisphere === key).length;
		}
	}

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
								onChange={this.filterMarkers}
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
		const { map } = this.props.map;
		const { numMarkers } = this.props.map;

		for (let i = 0; i < markers.length; i++) {
			const { marker } = markers[i];
			marker.setMap(null);
		}

		this.props.deleteMarkers();
		this.props.generateMarkers(map, numMarkers);
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
	{ addHemisphere, removeHemisphere, deleteMarkers, generateMarkers },
)(Legend);
