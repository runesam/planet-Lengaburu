import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

	componentDidMount() {
		this.props.getPlanets();
	}

	handleSelectPlanet(item) {
		const { vehicle } = this.props.currentSelection;
		if (vehicle && item.distance > vehicle.max_distance) {
			return this.props.toast('error', `${vehicle.name} won't make it to ${item.name}`);
		}
		this.props.updateSelection('planet', item);
	}

	handleSelectVehicle(item) {
		if (item && item.total_no === 0) {
			return this.props.toast('error', `No ${item.name} left to select`);
		}
		const { planet } = this.props.currentSelection;
		if (item.max_distance < planet.distance) {
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

	renderSelections() {
		return (
			<Selectors
				handleSelectPlanet={this.handleSelectPlanet}
				handleSelectVehicle={this.handleSelectVehicle}
				planets={this.props.planets}
				vehicles={this.props.vehicles}
				currentSelection={this.props.currentSelection}
			/>
		);
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

	render() {
		if (!this.props.planets.length) {
			return <Loader />;
		}
		return (
			<div className='homeContainer'>
				<div className='step-title'>
					<p>Select planets you want to search in</p>
				</div>
				<div className='selected-planets'>
					{this.props.selectedPlanets.length > 0 && this.renderSelectedPlanets()}
				</div>
				<div className='select-planets'>
					{this.props.planets.length && this.renderSelections()}
				</div>
				<br />
				<button
					className='col-8 btn btn-outline-success'
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
				</button>
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
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

Home.propTypes = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	addPlanet: PropTypes.func,
	removePlanet: PropTypes.func,
	toast: PropTypes.func,
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

export default Home;
