import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import Collapsed from '../../../../views/Query/Collapsed.jsx';

describe('<Collapsed />', () => {
  describe('When Collapsed bar is loaded', () => {
    function onQueryChange() {}

    let query_sample = {
      date: {
        'from': '20170301',
        'to': '20170501'
      },
      'text': 'Sample Company'
    };

    let query_empty_sample = {
      date: {
        'from': '20170301',
        'to': '20170501'
      },
      'text': ''
    };

    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Collapsed onQueryChange={onQueryChange} query={query_empty_sample} />);
    });

    describe('When input text is empty', () => {
      it('Disables the timeframe bar', () => {
        assert.equal(wrapper.unrendered.props.query.enabled, false);
      });

      describe('Then when the input text is not empty', () => {
        beforeEach(() => {
          wrapper = shallow(<Collapsed onQueryChange={onQueryChange} query={query_sample} />);
        });

        it('Does not disable the timeframe bar', () => {
          assert.equal(wrapper.unrendered.props.query.enabled, true);
        });
      });
    });
  });
});
