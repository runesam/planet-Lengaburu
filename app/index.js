import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';

import './index.scss';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Home from './containers/home/index';

import general from './utils/general';
// import calculator from './containers/calculator/';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.getPlanets = this.getPlanets.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
		this.state = {
			planets: [],
			vehicles: [],
			selectedPlanets: [],
			selectedVehicles: [],
		};
	}
	getPlanets() {
		console.log(123);
		general.getData('planets').then(planets => this.setState({ planets }));
	}
	updateSelection(of, items) {
		if (items.length > 4) {
			this.toaster.warning(
				'You can select only 4 planets',
				'Selection Warning',
				{
					timeOut: 3000,
					extendedTimeOut: 1000,
				},
			);
		}
		switch (of) {
			case 'planets':
				this.setState({
					selectedPlanets: general.updateArray(items),
				});
				break;
			case 'vehicles':
				this.setState({ selectedVehicles: items });
				break;
			default:
				return false;
		}
	}
	render() {
		const { planets, selectedPlanets } = this.state;
		return (
			<Router>
				<div>
					<ToastContainer
						ref={(c) => { this.toaster = c; }}
						className="toast-top-right"
					/>
					<Header />
					<div className='container'>
						<Switch>
							<Route
								exact
								path='/'
								render={routeProps => (
									<Home
										{...routeProps}
										updateSelection={this.updateSelection}
										getPlanets={this.getPlanets}
										planets={planets}
										selectedPlanets={selectedPlanets}
									/>
								)}
							/>
							{/* <Route exact path='/calculator' component={calculator} /> */}
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
