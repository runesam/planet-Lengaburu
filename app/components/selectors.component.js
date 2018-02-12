import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const Selectors = ({
       handleSelectPlanet,
       handleSelectVehicle,
       planets,
       vehicles,
       currentSelection,
   }) => (
	<div className='single-planet'>
		<Select
			closeOnSelect
			disabled={false}
			onChange={handleSelectPlanet}
			options={planets}
			placeholder='Select planets you want to search in'
			removeSelected
			simpleValue={false}
			valueKey='name'
			labelKey='name'
			value={currentSelection.planet}
		/>
		{currentSelection.planet && (
			<Select
				closeOnSelect
				disabled={false}
				onChange={handleSelectVehicle}
				options={vehicles}
				placeholder='Select vehicle you want to search in'
				removeSelected
				simpleValue={false}
				valueKey='name'
				labelKey='name'
				value={currentSelection.vehicle}
			/>
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