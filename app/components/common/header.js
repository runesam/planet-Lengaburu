import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const Header = () => (
	<header>
		<div className='home fa fa-home' />
		<div className="title">
			<span>finding</span>
			<strong>falcone</strong>
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

export default Header;
