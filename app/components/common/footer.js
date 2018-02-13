import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Footer = ({
    resetFields,
	selectedPlanets,
    findFalcone,
    result,
}) => (
	<footer>
		<div className='action-buttons'>
			<button
				className='btn btn-outline-danger reset'
				onClick={resetFields}
				disabled={result}
			>
				reset fields
			</button>
			<button
				className='btn btn-outline-primary next'
				disabled={selectedPlanets.length < 4 || result}
				onClick={findFalcone}
			>
				FINDING FALCONE
			</button>
		</div>
		<div className='float-left author'>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Duis aliquam erat in ante malesuada, facilisis semper nulla semper.
		</div>
		<button className='btn btn-outline-success'>
			<a href='https://github.com/runesam' rel='noopener noreferrer' target='_blank' content='about the developer'>
				<i className="fa fa-connectdevelop" />
			</a>
		</button>
	</footer>

);

Footer.defaultProps = {
	resetFields: PropTypes.func,
	findFalcone: PropTypes.func,
	selectedPlanets: PropTypes.array,
	result: PropTypes.object,
};

Footer.propTypes = {
	resetFields: PropTypes.func,
	findFalcone: PropTypes.func,
	selectedPlanets: PropTypes.array,
	result: PropTypes.object,
};

export default Footer;
