import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Selectors from './../../components/selectors.component';

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
		this.props.updateSelection('planet', item);
	}

	handleSelectVehicle(item) {
		this.props.updateSelection('vehicle', item);
	}

	removeSelected(e) {
		console.log(e);
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

	render() {
		return (
			<div className='homeContainer'>
				<div className='step-title'>
					<span>Select planets you want to search in</span>
				</div>
				<div className='selected-planets'>
					<div>{JSON.stringify(this.props.selectedPlanets)}</div>
				</div>
				<div className='select-planets'>
					{this.props.planets.length && this.renderSelections()}
				</div>
				<button className='btn btn-outline-success' onClick={this.addPlanet}>Add Planet</button>
			</div>
		);
	}
}

Home.defaultProps = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	addPlanet: PropTypes.func,
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

Home.propTypes = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	addPlanet: PropTypes.func,
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

export default Home;
