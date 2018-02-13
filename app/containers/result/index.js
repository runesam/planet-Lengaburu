import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './index.scss';

import Loader from './../../components/common/loader';
import general from './../../utils/general';

import donlon from './../../assets/images/donlon.png';
import enchai from './../../assets/images/enchai.png';
import jebing from './../../assets/images/jebing.png';
import lerbin from './../../assets/images/lerbin.png';
import pingasor from './../../assets/images/pingasor.png';
import sapir from './../../assets/images/sapir.png';
import spacePod from './../../assets/images/space_pod.png';
import spaceRocket from './../../assets/images/space_rocket.png';
import spaceShip from './../../assets/images/space_ship.png';
import spaceShuttle from './../../assets/images/space_shuttle.png';

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

class Result extends PureComponent {
	constructor(props) {
		super(props);
		this.startAgain = this.startAgain.bind(this);
	}

	componentWillMount() {
		if (!this.props.result) {
			this.props.history.push('/');
		}
		this.totalTimes = this.props.selectedPlanets
			.reduce((a, i) => (i.planet.distance / i.vehicle.speed) + a, 0);
	}

	startAgain() {
		this.props.resetFields();
		this.props.history.push('/');
	}

	render() {
		if (!this.props.result) {
			return <Loader />;
		}
		const { status, planet_name } = this.props.result;
		const content = {
			h4: status === 'success' ? `👏💫⭐ ${status.toUpperCase()} ️⭐️💫👏` : `💥😡㊗️ ${status.toUpperCase()} ️㊗️️😡💥`,
			h5: status === 'success' ? 'congratulations on Finding Falcone. King Chan is mighty pleased' : 'oh ** We couldn\'t find Falcone. King Chan is very mad',
			time: status === 'success' ? `🕔 Taken: ${this.totalTimes}` : `🕔 Wasted: ${this.totalTimes}`,
			planet: status === 'success' ? images[general.toCamelCase(planet_name)] : null,

		};
		return (
			<div className='resultContainer' style={{ color: 'white' }}>
				{!this.props.result && <Redirect to='/' />}
				<h4>{content.h4}</h4>
				<h5>{content.h5}</h5>
				<p>{content.time}</p>
				<p>{`Planet Found: ${planet_name || 'No Where'}`}</p>
				{content.planet && <img
					src={content.planet}
					alt={planet_name}
				/>}
				<br />
				<br />
				<br />
				<button onClick={this.startAgain} className='btn btn-primary'>
					Start Again
				</button>
			</div>
		);
	}
}

Result.defaultProps = {
	result: PropTypes.object,
	history: PropTypes.object,
	selectedPlanets: PropTypes.array,
	resetFields: PropTypes.func,
};

Result.propTypes = {
	result: PropTypes.object,
	history: PropTypes.object,
	selectedPlanets: PropTypes.array,
	resetFields: PropTypes.func,
};

export default Result;
