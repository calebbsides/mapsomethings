import React, { Component } from 'react';
import propTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../redux/actions/item-actions';

import AddItemForm from './add-item-form';

class ShoppingList extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	handleDelete = id => {
		this.props.deleteItem(id);
	};

	renderItems = () => {
		const { items } = this.props.item;
		const { isLoading } = this.props.item;

		if (isLoading) {
			console.log('Loading...');
		} else {
			if (items) {
				return items.map((item, i) => {
					return (
						<div key={i}>
							<button
								className="col-6 btn"
								onClick={this.handleDelete.bind(this, item._id)}>
								{item.name}
							</button>
						</div>
					);
				});
			}
		}
	};

	render() {
		return (
			<div className="shopping-list container">
				<div className="row justify-content-center align-items-center">
					<div className="col-6 text-center">
						<div className="item-list">{this.renderItems()}</div>
						<AddItemForm />
					</div>
				</div>
			</div>
		);
	}
}

ShoppingList.propTypes = {
	deleteItem: propTypes.func.isRequired,
	getItems: propTypes.func.isRequired,
	item: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	item: state.item,
});

export default connect(
	mapStateToProps,
	actions,
)(ShoppingList);
