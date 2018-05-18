/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import 'watson-react-components/dist/css/watson-react-components.css';
import Layout from './layout';
import './style.css';

function loadAnalytics() {
  const idaScript = document.createElement('script');
  idaScript.src = '//www.ibm.com/common/stats/ida_stats.js';
  document.head.appendChild(idaScript);
}

if (process.env.REACT_APP_BLUEMIX_ANALYTICS) {
  // eslint-disable-next-line no-native-reassign, no-underscore-dangle
  window._analytics = Object.assign({}, window._analytics);
  window.addEventListener('load', loadAnalytics);
}

ReactDOM.render(<Layout />, document.getElementById('root'));
