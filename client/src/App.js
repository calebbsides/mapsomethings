import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Add styles
import './scss/main.scss';

// Add Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './map/map';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Map />
			</Provider>
		);
	}
}

export default App;
