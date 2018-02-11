/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './index';

configure({ adapter: new Adapter() });


describe('App', () => {
    it('has a div as first child', () => {
        const wrapper = mount(<App />);
        expect(wrapper.children().type()).to.equal('div');
    });
});
