import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import general from './../utils/general';

import donlon from './../assets/images/donlon.png';
import enchai from './../assets/images/enchai.png';
import jebing from './../assets/images/jebing.png';
import lerbin from './../assets/images/lerbin.png';
import pingasor from './../assets/images/pingasor.png';
import sapir from './../assets/images/sapir.png';
import spacePod from './../assets/images/space_pod.png';
import spaceRocket from './../assets/images/space_rocket.png';
import spaceShip from './../assets/images/space_ship.png';
import spaceShuttle from './../assets/images/space_shuttle.png';

const images = {
	donlon,
	enchai,
	jebing,
	lerbin,
	pingasor,
	sapir,
	spacePod,
	spaceRocket,
	spaceShip,
	spaceShuttle,
};

class SelectedPlanet extends PureComponent {
	constructor(props) {
		super(props);
		this.handleRemove = this.handleRemove.bind(this);
	}
	handleRemove() {
		this.props.removeSelected({
			planet: this.props.planet,
			vehicle: this.props.vehicle,
		});
	}
	render() {
		const { planet, vehicle } = this.props;
		return (
			<div className='col-12 selected-planet'>
				<div className='col-5'>
					<p>{planet.name}</p>
					<img src={images[general.toCamelCase(planet.name)]} alt={planet.name} />
				</div>
				<div className='col-5'>
					<p>{vehicle.name}</p>
					<img src={images[general.toCamelCase(vehicle.name)]} alt={vehicle.name} />
				</div>
				<div className='col-2'>
					<span>Time</span>
					<span>{planet.distance / vehicle.speed}</span>
					<button className='btn btn-danger' onClick={this.handleRemove}>
						<i className='fa fa-times' />
					</button>
				</div>
			</div>
		);
	}
}

SelectedPlanet.defaultProps = {
	planet: PropTypes.object,
	vehicle: PropTypes.object,
	removeSelected: PropTypes.func,
};

SelectedPlanet.propTypes = {
	planet: PropTypes.object,
	vehicle: PropTypes.object,
	removeSelected: PropTypes.func,
};

export default SelectedPlanet;
