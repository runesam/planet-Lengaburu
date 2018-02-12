import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';

import './index.scss';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Home from './containers/home/index';

import general from './utils/general';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.getPlanets = this.getPlanets.bind(this);
		this.addPlanet = this.addPlanet.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
		this.state = {
			planets: [],
			vehicles: [],
			selectedPlanets: [],
			currentSelection: {},
		};
	}

	getPlanets() {
		general.getData('planets').then(planets => this.setState({ planets }, () => general.getData('vehicles').then(vehicles => this.setState({ vehicles }))));
	}

	updateSelection(of, item) {
		this.setState({
			currentSelection: Object.assign({}, this.state.currentSelection, { [of]: item }),
		});
	}

	addPlanet() {
		Object.keys(this.state.currentSelection).forEach((of) => {
			const temp = this.state[`${of}s`];
			const itemIndex = temp.findIndex(i => i.name === this.state.currentSelection[of].name);
			temp.splice(itemIndex, 1);
			this.setState({
				[`${of}s`]: temp,
			});
		});
		this.setState({
			selectedPlanets: [...this.state.selectedPlanets, this.state.currentSelection],
			currentSelection: {},
		});
	}

	render() {
		const {
			planets,
			vehicles,
			selectedPlanets,
			currentSelection,
		} = this.state;
		return (
			<div className='appContainer'>
				<Router>
					<div>
						<ToastContainer
							ref={(c) => {
								this.toaster = c;
							}}
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
											addPlanet={this.addPlanet}
											planets={planets}
											vehicles={vehicles}
											currentSelection={currentSelection}
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
			</div>
		);
	}
}

export default App;
