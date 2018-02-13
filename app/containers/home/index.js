import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Selectors from './../../components/selectors.component';
import SelectedPlanet from './../../components/selectedPlanet.component';
import Loader from './../../components/common/loader';

import './index.scss';

class Home extends PureComponent {
	constructor(props) {
		super(props);
		this.handleSelectPlanet = this.handleSelectPlanet.bind(this);
		this.handleSelectVehicle = this.handleSelectVehicle.bind(this);
		this.removeSelected = this.removeSelected.bind(this);
		this.addPlanet = this.addPlanet.bind(this);
	}

	componentWillMount() {
		this.props.resetFields();
	}

	componentDidMount() {
		this.props.getPlanets();
	}

	handleSelectPlanet(item) {
		const { vehicle } = this.props.currentSelection;
		if (vehicle && item && item.distance > vehicle.max_distance) {
			return this.props.toast('error', `${vehicle.name} won't make it to ${item.name}`);
		}
		this.props.updateSelection('planet', item);
	}

	handleSelectVehicle(item) {
		if (item && item.total_no === 0) {
			return this.props.toast('error', `No ${item.name} left to select`);
		}
		const { planet } = this.props.currentSelection;
		if (item && item.max_distance < planet.distance) {
			return this.props.toast('error', `${item.name} won't make it to ${planet.name}`);
		}
		this.props.updateSelection('vehicle', item);
	}

	removeSelected(item) {
		this.props.removePlanet(item);
	}

	addPlanet() {
		this.props.addPlanet();
	}

	renderSelectors() {
		if (this.props.selectedPlanets.length < 4) {
			return (
				<Selectors
					handleSelectPlanet={this.handleSelectPlanet}
					handleSelectVehicle={this.handleSelectVehicle}
					selectedPlanets={this.props.selectedPlanets}
					planets={this.props.planets}
					vehicles={this.props.vehicles}
					currentSelection={this.props.currentSelection}
				/>
			);
		}
	}

	renderSelectedPlanets() {
		return this.props.selectedPlanets.map(item => (
			<SelectedPlanet
				key={JSON.stringify(item)}
				planet={item.planet}
				vehicle={item.vehicle}
				removeSelected={this.removeSelected}
			/>
		));
	}

	renderAddPlanetButton() {
		return (
			<div className='action-buttons'>
				{this.props.selectedPlanets.length < 4 &&
				<button
					className='col-8 col-md-5 btn btn-outline-success'
					onClick={this.addPlanet}
					disabled={
						!Object.hasOwnProperty.call(this.props.currentSelection, 'planet')
						||
						!this.props.currentSelection.planet
						||
						!Object.hasOwnProperty.call(this.props.currentSelection, 'vehicle')
						||
						!this.props.currentSelection.vehicle
					}
				>
					Add Planet
				</button>}
				<button
					className='d-none d-md-block col-md-5 btn btn-outline-primary'
					disabled={this.props.selectedPlanets.length < 4 || this.props.result}
					onClick={this.props.findFalcone}
				>
					FINDING FALCONE
				</button>
			</div>
		);
	}

	render() {
		if (this.props.promise) {
			return <Loader />;
		}
		return (
			<div className='homeContainer'>
				{this.props.result && <Redirect to='/result' />}
				<div className='step-title'>
					<p>Select planets you want to search in</p>
				</div>
				<div className='selected-planets'>
					{this.props.selectedPlanets.length > 0 && this.renderSelectedPlanets()}
				</div>
				<div className='select-planets'>
					{this.props.planets.length && this.renderSelectors()}
				</div>
				{this.renderAddPlanetButton()}
				<br />
			</div>
		);
	}
}

Home.defaultProps = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	addPlanet: PropTypes.func,
	removePlanet: PropTypes.func,
	toast: PropTypes.func,
	resetFields: PropTypes.func,
	findFalcone: PropTypes.func,
	currentSelection: PropTypes.object,
	result: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
	promise: PropTypes.bool,
};

Home.propTypes = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	addPlanet: PropTypes.func,
	removePlanet: PropTypes.func,
	toast: PropTypes.func,
	resetFields: PropTypes.func,
	findFalcone: PropTypes.func,
	currentSelection: PropTypes.object,
	result: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
	promise: PropTypes.bool,
};

export default Home;
