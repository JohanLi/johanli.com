require('babel-register')();

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Footer from '../client/components/Footer';

describe('Footer', () => {
  const wrapper = shallow(<Footer />);

  it('Contains up-to-date copyright', () => {
    const date = new Date();

    expect(wrapper.find('.details').text()).to.contain(`2016 - ${date.getFullYear()}`);
  });

  it('Contains two links', () => {
    expect(wrapper.find('.links a')).to.have.length(2);
  });
});
