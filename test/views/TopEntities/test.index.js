import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { Tabs } from 'watson-react-components';
import TopEntities from '../../../views/TopEntities/index.jsx';

describe('<TopEntities />', () => {
  let entities_partially_empty_sample = {
    'companies': [],
    'people': [
      {
        'key': 'Madeleine Albright',
        'matching_results': 3
      },
      {
        'key': 'Abu Dhabi',
        'matching_results': 1
      }
    ],
    'topics': [
      {
        'key': 'Israel',
        'matching_results': 4
      },
      {
        'key': 'Abu Dhabi',
        'matching_results': 3
      },
      {
        'key': 'Arabic language',
        'matching_results': 3
      },
      {
        'key': 'Asia',
        'matching_results': 3
      },
      {
        'key': 'Far East',
        'matching_results': 3
      },
      {
        'key': 'Madeleine Albright',
        'matching_results': 3
      },
      {
        'key': 'Middle East',
        'matching_results': 3
      },
      {
        'key': 'Near East',
        'matching_results': 3
      },
      {
        'key': 'Orientalism',
        'matching_results': 3
      },
      {
        'key': 'United Arab Emirates',
        'matching_results': 3
      }
    ]
  };

  describe('When the TopEntities widget has content for some tabs', () => {
    let wrapper;
    let topics;
    let companies;
    let people;

    beforeEach(() => {
      wrapper = shallow(<TopEntities entities={entities_partially_empty_sample} />);
      topics = wrapper.find(Tabs).nodes[0].props.children[0].props;
      companies = wrapper.find(Tabs).nodes[0].props.children[1].props;
      people = wrapper.find(Tabs).nodes[0].props.children[2].props;
    });

    it('Shows the Cloud component for a tab with results', () => {
      let topics_cloud_content = topics.children.props.data;
      let people_cloud_content = people.children.props.data;
      assert.equal(topics_cloud_content.length, 10);
      assert.equal(people_cloud_content.length, 2);
    });

    it('Shows the NoContent component for a tab with no results', () => {
      assert.equal(companies.children.props.message, 'No Companies found.');
    });
  });
});
