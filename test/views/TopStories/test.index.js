import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TopStories from '../../../views/TopStories/index.jsx';

describe('<TopStories/>', () => {

  let stories = [];

  let query_sample = {
    date: {
      'from': '20170301',
      'to': '20170501'
    },
    'text': 'Sample Company'
  };

  describe('When I select Date', () => {
    const onSortChangeSpy = sinon.spy();
    it('calls onSortChange with Date', () => {
      const expected = Object.assign({}, query_sample, {
        sort: 'date'
      });
      let wrapper = shallow(<TopStories stories={stories} query={query_sample} onSortChange={onSortChangeSpy} />);
      wrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : 'date'}});
      assert.ok(onSortChangeSpy.calledWith(expected));
    });
  });

  describe('When I select Relevance', () => {
    const onSortChangeSpy = sinon.spy();
    it('calls onSortChange with Relevance', () => {
      const expected = Object.assign({}, query_sample, {
        sort: 'relevance'
      });
      let wrapper = shallow(<TopStories stories={stories} query={query_sample} onSortChange={onSortChangeSpy} />);
      wrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : 'date'}});
      wrapper.find('.sort-option').nodes[0].props.children[1].props.children.props.onChange({target: { value : 'relevance'}});
      assert.ok(onSortChangeSpy.calledWith(expected));
    });
  });

  //let firstMention = wrapper.find(Accordion).nodes[0].props.header.props.children[0].props.children;

});
