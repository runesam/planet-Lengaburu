import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';

import App from './app/index';

if (module.hot) {
	const root = document.getElementById('app');
	if (root) {
		ReactDOM.render(<AppContainer><App /></AppContainer>, root);
	}
}
