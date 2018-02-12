import React from 'react';
import './style.scss';

const Footer = () => (
	<footer>
		<button className='btn btn-outline-danger reset'>reset fields</button>
		<button className='btn btn-outline-primary next'>FINDING FALCONE</button>
		<button className='btn btn-outline-success'>
			<a href='https://github.com/runesam' rel='noopener noreferrer' target='_blank' content='about the developer'>
				<i className="fa fa-connectdevelop" />
			</a>
		</button>
	</footer>

);

export default Footer;
