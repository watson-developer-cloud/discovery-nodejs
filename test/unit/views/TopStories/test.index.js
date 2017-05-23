import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TopStories from '../../../../views/TopStories/index.jsx';

describe('<TopStories/>', () => {
  let stories = [];
  let query_sample = {
    date: {
      'from': '20170301',
      'to': '20170501'
    },
    'text': 'Sample Company'
  };
  const onSortChangeSpy = sinon.spy();
  let wrapper = shallow(<TopStories stories={stories} query={query_sample} onSortChange={onSortChangeSpy} />);

  function select(selectValue) {
    wrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : selectValue}});
  }

  describe('When I select Date', () => {
    beforeEach(() => {
      select('date');
    });

    it('calls onSortChange with Date', () => {
      const expected = Object.assign({}, query_sample, {
        sort: 'date'
      });
      assert.ok(onSortChangeSpy.calledWith(expected));
    });

    describe('and then when I select Relevance', () => {
      beforeEach(() => {
        select('relevance');
      });

      it('calls onSortChange with Relevance', () => {
        const expected = Object.assign({}, query_sample, {
          sort: 'relevance'
        });
        assert.ok(onSortChangeSpy.calledWith(expected));
      });
    });
  });
});
