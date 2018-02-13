import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Header = ({ selectedPlanets }) => {
	const totalTimes = selectedPlanets.reduce((a, i) => (i.planet.distance / i.vehicle.speed) + a, 0);
	return (
		<header>
			<Link to='/' href='/'>
				<div className='home fa fa-home' />
			</Link>
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
