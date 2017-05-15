import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TopStories from '../../../views/TopStories/index.jsx';

function selectDate(storiesWrapper) {
  storiesWrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : 'date'}});
}

function selectRelevance(storiesWrapper) {
  storiesWrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : 'relevance'}});
}

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
  const expected = Object.assign({}, query_sample, {
    sort: 'date'
  });
  let wrapper = shallow(<TopStories stories={stories} query={query_sample} onSortChange={onSortChangeSpy} />);

  describe('When I select Date', () => {
    beforeEach(() => {
      selectDate(wrapper);
    });

    it('calls onSortChange with Date', () => {
      assert.ok(onSortChangeSpy.calledWith(expected));
    });
  });

  describe('When I select Relevance', () => {
    beforeEach(() => {
      selectDate(wrapper);
      selectRelevance(wrapper);
    });

    it('calls onSortChange with Relevance', () => {
      assert.ok(onSortChangeSpy.calledWith(expected));
    });
  });
});
