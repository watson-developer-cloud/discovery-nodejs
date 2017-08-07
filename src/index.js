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
        primaryCategory: 'watson-demos',
      },
      pageInfo: {
        pageID: 'discovery-news-demo',
      }
    },
  };

  if (window.digitalData) {
    digitalData = Object.assign({}, window.digitalData, { digitalData });
  }

  // eslint-disable-next-line no-native-reassign
  window.digitalData = digitalData;
  // eslint-disable-next-line no-native-reassign
  window._analytics = {
    googleAddServices: false,
    coremetrics: false,
    optimizely: false,
    addRoll: false,
    intercom: false,
    fullStory: false,
  };

  document.head.appendChild(bluemixAnalyticsScript);
}

ReactDOM.render(<Layout />, document.getElementById('root'));
