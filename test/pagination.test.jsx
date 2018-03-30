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

    expect(wrapper.find('.label').text()).toEqual('View More Entries');
  });

  it('Shows the previous button correctly', () => {
    let wrapper = shallow(
      <Pagination
        pageOrUrlKey="3"
        totalPages={4}
      />,
    );

    expect(wrapper.find('.previous').length).toEqual(1);

    wrapper = shallow(
      <Pagination
        pageOrUrlKey="1"
        totalPages={2}
      />,
    );

    expect(wrapper.find('.previous').length).toEqual(0);
  });

  it('Shows the next button correctly', () => {
    let wrapper = shallow(
      <Pagination
        pageOrUrlKey="1"
        totalPages={2}
      />,
    );

    expect(wrapper.find('.next').length).toEqual(1);

    wrapper = shallow(
      <Pagination
        pageOrUrlKey="7"
        totalPages={7}
      />,
    );

    expect(wrapper.find('.next').length).toEqual(0);
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

      expect(wrapper.find('.pageLink').length).toEqual(testCase.expectedPageLinks);
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

    expect(wrapper.find('.active').text()).toEqual(page);

    page = '1';
    wrapper = render(
      <StaticRouter location="/blog" context={context}>
        <Pagination
          pageOrUrlKey={page}
          totalPages={5}
        />
      </StaticRouter>,
    );

    expect(wrapper.find('.active').text()).toEqual(page);
  });
});
