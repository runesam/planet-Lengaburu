import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import PropTypes from "prop-types";

const Header = ({ selectedPlanets }) => {
	const totalTimes = selectedPlanets.reduce((a, i) => (i.planet.distance / i.vehicle.speed) + a, 0);
	console.log(totalTimes);
	return (
		<header>
			<div className='home fa fa-home' />
			<div className="title">
				<span>finding</span>
				<strong>falcone</strong>
			</div>
			<div className='right'>
				<div className='time fa fa-clock-o' />
				<span>{totalTimes}</span>

			</div>
			<nav style={{ display: 'none' }}>
				<NavLink exact to='/' activeClassName='active'>Home</NavLink>
				{' | '}
				<NavLink to='/calculator' activeClassName='active'>Interest Calculator</NavLink>
				{' | '}
				<NavLink to='/login' activeClassName='active'>Login</NavLink>
			</nav>
		</header>

	);
};

Header.defaultProps = {
	selectedPlanets: PropTypes.array,
};

Header.propTypes = {
	selectedPlanets: PropTypes.array,
};

export default Header;
