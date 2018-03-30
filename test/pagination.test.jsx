import React from 'react';
import { assert } from 'chai';
import { shallow, render } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Pagination from '../src/components/blog/Pagination';

describe('Pagination', () => {
  it('Shows View More Entries if a single entry is loaded', () => {
    const wrapper = shallow(
      <Pagination
        pageOrUrlKey="everything-is-more-complex-than-we-think-it-is"
        totalPages={5}
      />,
    );

    assert.equal(wrapper.find('.label').text(), 'View More Entries');
  });

  it('Shows the previous button correctly', () => {
    let wrapper = shallow(
      <Pagination
        pageOrUrlKey="3"
        totalPages={4}
      />,
    );

    assert.equal(wrapper.find('.previous').length, 1);

    wrapper = shallow(
      <Pagination
        pageOrUrlKey="1"
        totalPages={2}
      />,
    );

    assert.equal(wrapper.find('.previous').length, 0);
  });

  it('Shows the next button correctly', () => {
    let wrapper = shallow(
      <Pagination
        pageOrUrlKey="1"
        totalPages={2}
      />,
    );

    assert.equal(wrapper.find('.next').length, 1);

    wrapper = shallow(
      <Pagination
        pageOrUrlKey="7"
        totalPages={7}
      />,
    );

    assert.equal(wrapper.find('.next').length, 0);
  });

  it('Shows page links correctly', () => {
    const testCases = [
      {
        pageOrUrlKey: '1',
        totalPages: 2,
        expectedPageLinks: 2,
      },
      {
        pageOrUrlKey: '1',
        totalPages: 7,
        expectedPageLinks: 3,
      },
      {
        pageOrUrlKey: '4',
        totalPages: 7,
        expectedPageLinks: 5,
      },
      {
        pageOrUrlKey: '6',
        totalPages: 7,
        expectedPageLinks: 4,
      },
      {
        pageOrUrlKey: '7',
        totalPages: 7,
        expectedPageLinks: 3,
      },
    ];

    testCases.forEach((testCase) => {
      const wrapper = shallow(
        <Pagination
          pageOrUrlKey={testCase.pageOrUrlKey}
          totalPages={testCase.totalPages}
        />,
      );

      assert.equal(wrapper.find('.pageLink').length, testCase.expectedPageLinks);
    });
  });

  it('Highlights the link of the current page', () => {
    const context = {};

    let page = '3';
    let wrapper = render(
      <StaticRouter location={`/blog/${page}`} context={context}>
        <Pagination
          pageOrUrlKey={page}
          totalPages={5}
        />
      </StaticRouter>,
    );

    assert.equal(wrapper.find('.active').text(), page);

    page = '1';
    wrapper = render(
      <StaticRouter location="/blog" context={context}>
        <Pagination
          pageOrUrlKey={page}
          totalPages={5}
        />
      </StaticRouter>,
    );

    assert.equal(wrapper.find('.active').text(), page);
  });
});
