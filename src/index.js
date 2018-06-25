/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import 'watson-react-components/dist/css/watson-react-components.css';
import Layout from './layout';
import './style.css';

function loadAnalytics() {
  const analyticsScript = document.createElement('script');
  analyticsScript.src = 'https://cdn.rawgit.com/watson-developer-cloud/watson-developer-cloud.github.io/master/analytics.js';
  document.head.appendChild(analyticsScript);
}

if (process.env.REACT_APP_BLUEMIX_ANALYTICS) {
  // eslint-disable-next-line no-native-reassign, no-underscore-dangle
  window.addEventListener('load', loadAnalytics);
}

ReactDOM.render(<Layout />, document.getElementById('root'));
