import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TopStories from '../../TopStories';

describe('<TopStories />', () => {
  const stories = [];
  const querySample = {
    date: {
      from: '20170301',
      to: '20170501',
    },
    text: 'Sample Company',
  };
  const onSortChangeSpy = sinon.spy();
  const wrapper = shallow(
    <TopStories
      stories={stories}
      query={querySample}
      onSortChange={onSortChangeSpy}
    />,
  );

  function select(selectValue) {
    wrapper.find('.sort-option').nodes[0]
      .props.children[1].props.children.props
      .onChange({ target: { value: selectValue } });
  }

  describe('When I select Date', () => {
    beforeEach(() => {
      select('date');
    });

    it('calls onSortChange with Date', () => {
      const expected = Object.assign({}, querySample, {
        sort: 'date',
      });
      assert.ok(onSortChangeSpy.calledWith(expected));
    });

    describe('and then when I select Relevance', () => {
      beforeEach(() => {
        select('relevance');
      });

      it('calls onSortChange with Relevance', () => {
        const expected = Object.assign({}, querySample, {
          sort: 'relevance',
        });
        assert.ok(onSortChangeSpy.calledWith(expected));
      });
    });
  });
});
