import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';

import './index.scss';
import Header from './components/common/header';
import Footer from './components/common/footer';

import Home from './containers/home/index';
import Result from './containers/result/index';

import general from './utils/general';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.getPlanets = this.getPlanets.bind(this);
		this.findFalcone = this.findFalcone.bind(this);
		this.addPlanet = this.addPlanet.bind(this);
		this.removePlanet = this.removePlanet.bind(this);
		this.updateCurrentSelection = this.updateCurrentSelection.bind(this);
		this.toast = this.toast.bind(this);
		this.resetFields = this.resetFields.bind(this);
		this.state = {
			planets: [],
			vehicles: [],
			selectedPlanets: [],
			currentSelection: {},
			result: null,
			// result: { planet_name: 'Jebing', status: 'success' },
			promise: true,
		};
	}

	getPlanets() {
		general.getData('planets').then(planets => this.setState({
			planets: planets.map(planet => Object.assign(planet, {
				key: `${planet.name} (Distance: ${planet.distance})`,
			})),
		}, () => general.getData('vehicles').then(vehicles => this.setState({
			vehicles: vehicles.map(vehicle => Object.assign(vehicle, {
				key: `${vehicle.name} (Max Distance: ${vehicle.max_distance}) (${vehicle.total_no})`,
			})),
			promise: false,
		}, () => {
			this.vehicles = [...this.state.vehicles];
			this.planets = [...this.state.planets];
		}))));
	}

	updateCurrentSelection(of, item) {
		this.setState({
			currentSelection: Object.assign({}, this.state.currentSelection, { [of]: item }),
		});
	}

	addPlanet() {
		Object.keys(this.state.currentSelection).forEach((of) => {
			const temp = this.state[`${of}s`];
			const itemIndex = temp.findIndex(i => i.name === this.state.currentSelection[of].name);
			if (of === 'planet') {
				temp.splice(itemIndex, 1);
			} else {
				temp[itemIndex].total_no -= 1;
				temp[itemIndex].key = `${temp[itemIndex].name} (Max Distance: ${temp[itemIndex].max_distance}) (${temp[itemIndex].total_no})`;
			}
			this.setState({
				[`${of}s`]: temp,
			});
		});
		this.setState({
			selectedPlanets: [...this.state.selectedPlanets, this.state.currentSelection],
			currentSelection: {},
		});
	}

	removePlanet({ planet, vehicle }) {
		const selectedPlanets = [...this.state.selectedPlanets];
		const planetIndex = selectedPlanets.findIndex(i => i.planet.name === planet.name);
		const vehicleIndex = this.state.vehicles.findIndex(i => i.name === vehicle.name);
		selectedPlanets.splice(planetIndex, 1);
		const planets = [...this.state.planets, planet];
		const vehicles = [...this.state.vehicles];
		vehicles[vehicleIndex].total_no += 1;
		vehicles[vehicleIndex].key = `${vehicles[vehicleIndex].name} (Max Distance: ${vehicles[vehicleIndex].max_distance}) (${vehicles[vehicleIndex].total_no})`;

		this.setState({
			selectedPlanets,
			planets,
			vehicles,
		});
	}

	toast(status, message) {
		this.toaster[status](message, '', {
			closeButton: true,
		});
	}

	resetFields() {
		this.setState({
			vehicles: this.vehicles || [],
			planets: this.planets || [],
			selectedPlanets: [],
			currentSelection: {},
			result: null,
		});
	}

	findFalcone() {
		this.setState({
			promise: true,
		}, () => {
			const planetNames = this.state.selectedPlanets.map(item => item.planet.name);
			const vehicleNames = this.state.selectedPlanets.map(item => item.vehicle.name);
			general.postData('token').then(({ token }) => {
				general.postData('find', {
					token,
					planet_names: planetNames,
					vehicle_names: vehicleNames,
				}).then((result) => {
					if (Object.hasOwnProperty.call(result, 'status')) {
						return this.setState({
							result,
							promise: false,
						});
					}
					this.toast('error', result.error);
					return this.setState({ promise: false });
				});
			});
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
						<Header selectedPlanets={selectedPlanets} />
						<div className='container'>
							<Switch>
								<Route
									exact
									path='/'
									render={routeProps => (
										<Home
											{...routeProps}
											updateSelection={this.updateCurrentSelection}
											getPlanets={this.getPlanets}
											addPlanet={this.addPlanet}
											removePlanet={this.removePlanet}
											toast={this.toast}
											resetFields={this.resetFields}
											findFalcone={this.findFalcone}
											planets={planets}
											vehicles={vehicles}
											currentSelection={currentSelection}
											selectedPlanets={selectedPlanets}
											result={this.state.result}
											promise={this.state.promise}
										/>
									)}
								/>
								<Route
									exact
									path='/result'
									render={routeProps => (
										<Result
											{...routeProps}
											result={this.state.result}
											selectedPlanets={selectedPlanets}
											resetFields={this.resetFields}
										/>
									)}
								/>
							</Switch>
						</div>
						<Footer
							resetFields={this.resetFields}
							findFalcone={this.findFalcone}
							selectedPlanets={this.state.selectedPlanets}
							result={this.state.result}
						/>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
