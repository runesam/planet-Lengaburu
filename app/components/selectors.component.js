import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import general from './../utils/general';

const Selectors = ({
       handleSelectPlanet,
       handleSelectVehicle,
       planets,
       vehicles,
       currentSelection,
   }) => (
	<div>
		<br />
		<div className='col-12'>
			<Select
				closeOnSelect
				disabled={false}
				onChange={handleSelectPlanet}
				options={planets}
				placeholder='Select planets you want to search in'
				removeSelected
				simpleValue={false}
				valueKey='name'
				labelKey='key'
				value={currentSelection.planet}
				onFocus={general.scrollDown}
			/>
		</div>
		<br />
		{currentSelection.planet && (
			<div className='col-12'>
				<Select
					closeOnSelect
					disabled={false}
					onChange={handleSelectVehicle}
					options={vehicles}
					placeholder='Select vehicle you want to search in'
					removeSelected
					simpleValue={false}
					valueKey='name'
					labelKey='key'
					value={currentSelection.vehicle}
					onFocus={general.scrollDown}
				/>
				<br />
			</div>
		)}
	</div>
);

Selectors.defaultProps = {
	handleSelectPlanet: PropTypes.func,
	handleSelectVehicle: PropTypes.func,
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
};

Selectors.propTypes = {
	handleSelectPlanet: PropTypes.func,
	handleSelectVehicle: PropTypes.func,
	currentSelection: PropTypes.object,
	planets: PropTypes.array,
	vehicles: PropTypes.array,
};

export default Selectors;
