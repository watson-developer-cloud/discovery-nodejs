import React from 'react';
import Demo from './demo.jsx';
import { Header, Jumbotron, Footer } from 'watson-react-components';

export default function Layout(props) {
  return (
    <div>
      <Header
        mainBreadcrumbs="Discovery"
        mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
        subBreadcrumbs="Discovery Demo"
        subBreadcrumbsUrl="https://discovery-news-demo.mybluemix.net"
      />
      <Jumbotron
        serviceName="Discovery"
        repository="https://github.com/watson-developer-cloud/discovery-nodejs"
        documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
        apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
        startInBluemix="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
        version="GA"
        description="Add a cognitive search and content analytics engine to applications to identify patterns, trends and actionable insights that drive better decision-making."
      />
      <Demo />
      <div style={{ marginTop: '0rem' }}>
        <Footer />
      </div>
    </div>
  );
}
