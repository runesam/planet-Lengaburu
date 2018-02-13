/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'node-fetch';

import general from './utils/general';

import App from './index';

configure({ adapter: new Adapter() });

// mocking planets and vehicles; we won't use them in all tests
// we will user them after we make sure that the app fetches the data correctly
// so the tests goes faster instead of waiting for fetched data every time

const mockPlanets = [
	{ name: 'Enchai', distance: 200, key: 'Enchai (Distance: 200)' },
	{ name: 'Jebing', distance: 300, key: 'Jebing (Distance: 300)' },
	{ name: 'Sapir', distance: 400, key: 'Sapir (Distance: 400)' },
	{ name: 'Lerbin', distance: 500, key: 'Lerbin (Distance: 500)' },
	{
		name: 'Pingasor',
		distance: 600,
		key: 'Pingasor (Distance: 600)',
	}];
const mockVehicles = [
	{
		name: 'Space pod',
		total_no: 2,
		max_distance: 200,
		speed: 2,
		key: 'Space pod (Max Distance: 200) (2)',
	},
	{
		name: 'Space rocket',
		total_no: 1,
		max_distance: 300,
		speed: 4,
		key: 'Space rocket (Max Distance: 300) (1)',
	},
	{
		name: 'Space shuttle',
		total_no: 0,
		max_distance: 400,
		speed: 5,
		key: 'Space shuttle (Max Distance: 400) (0)',
	},
	{
		name: 'Space ship',
		total_no: 2,
		max_distance: 600,
		speed: 10,
		key: 'Space ship (Max Distance: 600) (2)',
	}];

describe('App', () => {
	const wrapper = mount(<App />);
	it('has a div as first child', () => {
		expect(wrapper.children().type()).to.equal('div');
	});
	it('constructs the correct items', () => {
		const expected = {
			planets: [],
			vehicles: [],
			selectedPlanets: [],
			currentSelection: {},
			result: null,
			promise: true,
		};
		expect(wrapper.state()).to.deep.equal(expected);
	});

	describe('App Methods', () => {
		wrapper.instance().getPlanets(fetch);
		const expected = {};
		fetch('https://findfalcone.herokuapp.com/planets')
			.then(planetsPromise => planetsPromise.json())
			.then((planets) => { expected.planets = general.adjustPlanetsName(planets); });
		fetch('https://findfalcone.herokuapp.com/vehicles')
			.then(vehiclesPromise => vehiclesPromise.json())
			.then((vehicles) => { expected.vehicles = general.adjustVehiclesName(vehicles); });
		wrapper.instance().getPlanets(fetch);

		describe('get planets method', () => {
			it('gets the planets', (done) => {
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (!newState.promise) {
						clearInterval(checker);
						expect(newState.planets).to.deep.equal(expected.planets);
						done();
					}
				});
			});

			it('gets the vehicles', (done) => {
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (!newState.promise) {
						clearInterval(checker);
						expect(newState.vehicles).to.deep.equal(expected.vehicles);
						done();
					}
				});
			});
		});

		describe('update current selection', () => {
			it('updates the current selection state', (done) => {
				const expectedCurrentSelection = {
					planet: expected.planets[0],
					vehicle: expected.vehicles[2],
				};
				wrapper.instance().updateCurrentSelection('planet', expected.planets[0]);
				wrapper.instance().updateCurrentSelection('vehicle', expected.vehicles[2]);
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (newState.currentSelection.planet && newState.currentSelection.vehicle) {
						clearInterval(checker);
						expect(newState.currentSelection).to.deep.equal(expectedCurrentSelection);
						done();
					}
				});
			});
		});

		describe('add planet', () => {
			let mockCurrentSelection;
			it('method executed', (done) => {
				mockCurrentSelection = {
					planet: expected.planets[0],
					vehicle: expected.vehicles[2],
				};
				wrapper.instance().addPlanet(mockCurrentSelection);
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (newState.selectedPlanets.length) {
						clearInterval(checker);
						done();
					}
				});
			});
			it('updates the selected planets state', (done) => {
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (newState.selectedPlanets.length) {
						clearInterval(checker);
						expect(newState.selectedPlanets).to.deep.equal([mockCurrentSelection]);
						done();
					}
				});
			});
			it('updates the vehicles state', (done) => {
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (newState.selectedPlanets.length) {
						clearInterval(checker);
						expect(newState.vehicles).to.not.equal(expected.vehicles);
						done();
					}
				});
			});
			it('updates the planets state', (done) => {
				const checker = setInterval(() => {
					const newState = wrapper.state();
					if (newState.selectedPlanets.length) {
						clearInterval(checker);
						expect(newState.planets).to.not.equal(expected.planets);
						done();
					}
				});
			});
		});

		// gonna run tests from here synchronously using new instance of App and the mocked data
		describe('remove planet', () => {
			const mockedWrapper = mount(<App />);
			const mockCurrentSelection1 = {
				planet: mockPlanets[0],
				vehicle: mockVehicles[0],
			};
			const mockCurrentSelection2 = {
				planet: mockPlanets[1],
				vehicle: mockVehicles[1],
			};
			mockedWrapper.setState({
				planets: mockPlanets,
				vehicles: mockVehicles,
				currentSelection: mockCurrentSelection1,
			});
			// add planet one
			mockedWrapper.instance().addPlanet();
			// we need to set new current selection
			mockedWrapper.setState({
				currentSelection: mockCurrentSelection2,
			});
			// planet two
			mockedWrapper.instance().addPlanet();
			it('should work if we have already selected planet(s)', () => {
				expect(mockedWrapper.state().selectedPlanets.length).to.equal(2);
			});
			it('remove planet from selected planets State', () => {
				mockedWrapper.instance().removePlanet(mockCurrentSelection2);
				const mockCurrentSelection2Index = mockedWrapper.state().selectedPlanets
					.findIndex(item => item.planet.name === mockCurrentSelection2.planet.name);
				const mockCurrentSelection1Index = mockedWrapper.state().selectedPlanets
					.findIndex(item => item.planet.name === mockCurrentSelection1.planet.name);
				expect(mockCurrentSelection2Index).to.equal(-1);
				expect(mockCurrentSelection1Index).to.equal(0);
			});
		});
	});
});
