import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import Footer from '../client/components/Footer';

describe('Footer', () => {
  const wrapper = shallow(<Footer />);

  it('Contains up-to-date copyright', () => {
    const date = new Date();

    assert.include(wrapper.find('.details').text(), `2016 - ${date.getFullYear()}`);
  });

  it('Contains two links', () => {
    assert.equal(wrapper.find('.links a').length, 2);
  });
});
