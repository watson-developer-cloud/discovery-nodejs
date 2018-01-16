/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import 'watson-react-components/dist/css/watson-react-components.css';
import Layout from './layout';
import './style.css';

if (process.env.REACT_APP_BLUEMIX_ANALYTICS) {
  const bluemixAnalyticsScript = document.createElement('script');
  bluemixAnalyticsScript.type = 'text/javascript';
  bluemixAnalyticsScript.src = process.env.REACT_APP_BLUEMIX_ANALYTICS;

  let digitalData = {
    page: {
      category: {
        primaryCategory: 'watson-demos discovery-news-demo',
      },
      pageInfo: {
        pageID: 'discovery-news-demo-homepage',
        productTitle: 'discovery-news-demo',
      },
    },
  };

  if (window.digitalData) {
    digitalData = Object.assign({}, window.digitalData, { digitalData });
  }

  // eslint-disable-next-line no-native-reassign
  window.digitalData = digitalData;
  // eslint-disable-next-line no-native-reassign, no-underscore-dangle
  window._analytics = {
    googleAddServices: false,
    coremetrics: false,
    optimizely: false,
    addRoll: false,
    intercom: false,
    fullStory: false,
  };
  if (process.env.REACT_APP_SEGMENT_KEY) {
    const analyticsKey = { segment_key: process.env.REACT_APP_SEGMENT_KEY };
    // eslint-disable-next-line no-native-reassign, no-underscore-dangle
    window._analytics = Object.assign({}, window._analytics, analyticsKey);
  }

  document.head.appendChild(bluemixAnalyticsScript);
}

ReactDOM.render(<Layout />, document.getElementById('root'));
