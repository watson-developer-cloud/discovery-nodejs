import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import Collapsed from '../../Query/Collapsed';

describe('<Collapsed />', () => {
  describe('When Collapsed bar is loaded', () => {
    function onQueryChange() {}

    const querySample = {
      date: {
        from: '20170301',
        to: '20170501',
      },
      text: 'Sample Company',
    };

    const queryEmptySample = {
      date: {
        from: '20170301',
        to: '20170501',
      },
      text: '',
    };

    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Collapsed
          onQueryChange={onQueryChange}
          query={queryEmptySample}
        />,
      );
    });

    describe('When input text is empty', () => {
      it('Disables the timeframe bar', () => {
        assert.equal(wrapper.state().query.enabled, false);
      });

      describe('Then when the input text is not empty', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Collapsed
              onQueryChange={onQueryChange}
              query={querySample}
            />,
          );
        });

        it('Does not disable the timeframe bar', () => {
          assert.equal(wrapper.state().query.enabled, true);
        });
      });
    });
  });
});
