import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../src/components/Footer';

describe('Footer', () => {
  const wrapper = shallow(<Footer />);

  it('Shows up-to-date copyright', () => {
    const currentYear = new Date().getFullYear();

    expect(wrapper.find('.details').text()).toContain(`2016 - ${currentYear}`);
  });

  it('Contains two links', () => {
    expect(wrapper.find('.links a').length).toEqual(2);
  });
});
