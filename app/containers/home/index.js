import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './index.scss';

class Home extends PureComponent {
	constructor(props) {
		super(props);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.removeSelected = this.removeSelected.bind(this);
	}
	componentDidMount() {
		this.props.getPlanets();
	}
	handleSelectChange(items) {
		this.props.updateSelection('planets', items);
	}
	removeSelected(e) {
		console.log(e);
	}
	render() {
		return (
			<div className='homeContainer'>
				<div className='step-title'>
					<span>Select planets you want to search in</span>
				</div>
				<div className='step-view'>
					<div>items goes here</div>
				</div>
				<div className='step-action'>
					{this.props.planets.length && <Select
						closeOnSelect={this.props.selectedPlanets.length === 3}
						disabled={false}
						multi
						onChange={this.handleSelectChange}
						options={this.props.planets}
						placeholder='Select planets you want to search in'
						removeSelected
						simpleValue={false}
						valueKey='name'
						labelKey='name'
						value={this.props.selectedPlanets}
					/>}
				</div>
			</div>
		);
	}
}

Home.defaultProps = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	planets: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

Home.propTypes = {
	getPlanets: PropTypes.func,
	updateSelection: PropTypes.func,
	planets: PropTypes.array,
	selectedPlanets: PropTypes.array,
};

export default Home;
