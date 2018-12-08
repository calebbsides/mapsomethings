import React, { Component } from 'react';
import propTypes from 'prop-types';

import * as actions from '../redux/actions/item-actions';

// Redux
import { connect } from 'react-redux';

class AddItemForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemToAdd: '',
		};
	}

	handleAddItem = e => {
		e.preventDefault();

		let newItem = {
			name: this.state.itemToAdd,
		};

		this.props.addItem(newItem);

		this.setState({
			itemToAdd: '',
		});
	};

	handleInputChange = e => {
		let name = e.target.name;
		this.setState({
			[name]: e.target.value,
		});
	};

	render() {
		return (
			<div className="add-item-form">
				<form onSubmit={this.handleAddItem}>
					<input
						name="itemToAdd"
						type="text"
						onChange={this.handleInputChange}
						value={this.state.itemToAdd}
					/>
					<input className="btn-outline-info" type="submit" value="Add Item" />
				</form>
			</div>
		);
	}
}

AddItemForm.propTypes = {
	addItem: propTypes.func.isRequired,
	item: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	item: state.item,
});

export default connect(
	mapStateToProps,
	actions,
)(AddItemForm);
